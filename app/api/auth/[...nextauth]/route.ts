import NextAuth from 'next-auth';
import { authConfig } from '../auth';

export const authOptions = NextAuth(authConfig);
export { authOptions as GET, authOptions as POST };
