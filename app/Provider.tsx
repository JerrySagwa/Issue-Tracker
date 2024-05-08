'use client';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { SessionProvider as ReactSessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

type User = {
  name: string;
  email: string;
};

export function SessionProvider({ children }: PropsWithChildren) {
  return <ReactSessionProvider>{children}</ReactSessionProvider>;
}

export function QueryProvider({ children }: PropsWithChildren) {
  const qc = new QueryClient();
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
