import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '../../../validationSchema';
import prisma from '@/prisma/client';

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await req.json();

  const result = await issueSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error.errors, { status: 400 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({ updatedIssue });
}
