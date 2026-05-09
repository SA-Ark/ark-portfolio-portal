import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Demo credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (email === "demo@arkdev.io" && password === "demo123") {
          return { id: "demo-user", name: "Maya Chen", email: "demo@arkdev.io", role: "Admin" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? "portfolio-demo-auth-secret-change-me"
});
