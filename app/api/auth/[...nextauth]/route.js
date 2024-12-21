import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@email.em" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            username: true,
            password: true,
            image: true,
          },
        });

        if (!user) {
          return null;
        }

        // Add await here
        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!matchPassword) {
          return null;
        }

        return user; // Return the full user object
      },
    }),
  ],
  callbacks: {
    // Add these callback functions
    async jwt({ token, user, session, trigger }) {
      if (trigger == "update" && session?.username) {
        token.username = session.username;
        //update user in database after
      }
      if (user) {
        // passing username and id and any other param to token
        token.username = user.username;
        token.id = user.id;
        // if i use any other param i should do this
        // token.adress = user.adress
      }
      return token;
    },
    async session({ session, token }) {
      // passing username and id and any other param to token
      if (session.user) {
        session.user.username = token.username;
        session.user.id = token.id;
        // if i use any other param i should do this
        // session.user.adress = token.adress
        session.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
