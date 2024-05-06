import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { issueSchema } from '../../validationSchema';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = issueSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({ issue: newIssue }, { status: 201 });
}
