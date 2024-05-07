import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '../../../validationSchema';
import prisma from '@/prisma/client';
import delay from 'delay'

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

export async function DELETE(req: NextRequest, {params: {id}}: {params: {id: string}}) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  // await delay(3000);

  if (!issue) {
    return NextResponse.json({message: 'issue does not exist!'}, {status: 404});
  }

  const deletedIssue = await prisma.issue.delete({
    where: {
      id: parseInt(id)
    }
  })  

  return NextResponse.json({deletedIssue}, {status: 200});
}
