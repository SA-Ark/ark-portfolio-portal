"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@arkdev.io");
  const [password, setPassword] = useState("demo123");
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign in to NovaBridge</CardTitle>
          <CardDescription>Demo user: demo@arkdev.io / demo123</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); void signIn("credentials", { email, password, callbackUrl: "/" }); }}>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <Button variant="gradient" className="w-full" type="submit">Sign in</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
