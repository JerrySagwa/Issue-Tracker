import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import Email from 'next-auth/providers/email';
import { log } from 'console';

export const authOptions = NextAuth({
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
          placeholder: 'placeholder@placeholder.com'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) return null;

        const user = await prisma.emailUser.findUnique({
          where: {
            email: credentials.email
          }
        })

        console.log(user);

        if (!user || user.password !== credentials.password) return null;
        const {password, ...userWithoutPassword} = user;
        return userWithoutPassword;
      }
    }) 
  ],
  session: {
    strategy: 'jwt',
  },
});
export { authOptions as GET, authOptions as POST };
