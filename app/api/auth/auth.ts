import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLR_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000,
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'placeholder@placeholder.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const user = await prisma.emailUser.findUnique({
          where: {
            email: credentials.email,
          },
        });

        console.log(user);

        if (!user || user.password !== credentials.password) return null;
        const { password, ...userWithoutPassword } = user;

        console.log(userWithoutPassword);
        return userWithoutPassword;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    session: ({ session, token, user }) => {
      if (user) {
        session.user!.email = token.email;
        session.user!.name = token.name;
        session.user!.image = token.picture;
      }
      return session;
    },
  },
};
