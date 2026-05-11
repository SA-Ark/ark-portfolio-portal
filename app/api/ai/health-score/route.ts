import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const LLM_URL = process.env.LLM_PROXY_URL || "http://localhost:3200";

export async function POST(request: Request) {
  try {
    const { client } = await request.json();
    if (!client) {
      return NextResponse.json({ error: "Client data required" }, { status: 400 });
    }

    const clientContext = `Client: ${client.name}
Industry: ${client.industry}
Tier: ${client.tier}
Current Status: ${client.status}
ARR: $${client.arr?.toLocaleString() || "unknown"}
Last Contact: ${client.lastContact || "unknown"}
Health Metrics:
- Response Time Trend: ${client.health?.responseTimeTrend || "N/A"}%
- Meeting Frequency: ${client.health?.meetingFrequency || "N/A"}%
- Invoice Payment Speed: ${client.health?.invoicePaymentSpeed || "N/A"}%
- Message Sentiment: ${client.health?.messageSentiment || "N/A"}%`;

    try {
      const res = await fetch(`${LLM_URL}/v1/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "not-needed",
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 256,
          messages: [
            {
              role: "user",
              content: `You are a client health scoring engine. Given the client data, return ONLY a JSON object with:
- "score": number 1-100
- "label": "Thriving" | "Stable" | "Needs Attention" | "At Risk"
- "reason": one sentence explaining the score

${clientContext}`,
            },
          ],
        }),
      });

      if (!res.ok) throw new Error(`LLM ${res.status}`);

      const data = await res.json();
      const text = data.content?.[0]?.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return NextResponse.json({
          score: Math.max(1, Math.min(100, result.score)),
          label: result.label,
          reason: result.reason,
          generated: true,
        });
      }
      throw new Error("Parse failed");
    } catch {
      // Fallback: compute score from health metrics
      const h = client.health;
      if (h) {
        const avg = Math.round(
          (h.responseTimeTrend + h.meetingFrequency + h.invoicePaymentSpeed + h.messageSentiment) / 4
        );
        const label = avg >= 80 ? "Thriving" : avg >= 50 ? "Stable" : "At Risk";
        return NextResponse.json({
          score: avg,
          label,
          reason: "Score computed from health metric averages (AI unavailable).",
          generated: false,
        });
      }
      return NextResponse.json({
        score: client.healthScore || 50,
        label: "Unknown",
        reason: "Unable to analyze — using default score.",
        generated: false,
      });
    }
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
