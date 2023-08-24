import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { type AuthOptions } from 'next-auth';
import { authOptions } from './options';

type NextAuthType = (
  ...args: [AuthOptions] | [NextApiRequest, NextApiResponse, AuthOptions]
) => Promise<Response> | Promise<void | NextApiResponse>;

const handler = NextAuth(authOptions) as NextAuthType;

export { handler as GET, handler as POST };
