import { PipelineFunnelChart, RetentionDonutChart, RevenueLineChart, UtilizationBarChart } from "@/components/charts/charts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MotionSection } from "@/components/ui/motion";

export default function AnalyticsPage() {
  return (
    <>
      <MotionSection className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-white">Analytics dashboard</h1>
        <p className="max-w-3xl text-lg leading-8 text-zinc-400">Practice intelligence for revenue, retention, pipeline conversion, and team utilization.</p>
      </MotionSection>
      <MotionSection className="grid gap-8 xl:grid-cols-2">
        <Card className="xl:col-span-2"><CardHeader><CardTitle>Revenue by month</CardTitle><CardDescription>Revenue and pipeline growth over 12 months.</CardDescription></CardHeader><CardContent><RevenueLineChart /></CardContent></Card>
        <Card><CardHeader><CardTitle>Client retention</CardTitle><CardDescription>Retained, expansion, and churn-risk distribution.</CardDescription></CardHeader><CardContent><RetentionDonutChart /></CardContent></Card>
        <Card><CardHeader><CardTitle>Pipeline funnel</CardTitle><CardDescription>Qualified opportunities to closed expansion.</CardDescription></CardHeader><CardContent><PipelineFunnelChart /></CardContent></Card>
        <Card className="xl:col-span-2"><CardHeader><CardTitle>Utilization</CardTitle><CardDescription>Delivery team utilization by month.</CardDescription></CardHeader><CardContent><UtilizationBarChart /></CardContent></Card>
      </MotionSection>
    </>
  );
}
