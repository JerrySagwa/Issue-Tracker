import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const emailUsers = await prisma.emailUser.findMany({
    orderBy: {
      name: 'asc',
    },
    select: {
      name: true,
      email: true
    }
  });

  return NextResponse.json(emailUsers);
}
