import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { patchIssueSchema } from '../../../validationSchema';
import { authOptions } from '../../auth/[...nextauth]/route';
import { log } from 'console';

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);
  // if (!session)
  //   // unauthorized
  //   return NextResponse.json({}, { status: 401 });

  const body = await req.json();

  const {title, description, assignedToUserEmail} = body;

  const user = prisma.emailUser.findUnique({
    where: {
      email: assignedToUserEmail  
    }
  })

  if (!user) {
    return NextResponse.json('user not found', {status: 404});
  }

  const result = patchIssueSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(result.error.errors, { status: 400 });
  }

  const updatedIssue = await prisma.issue.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      description,
      assignedToUserEmail
    },
  });

  return NextResponse.json({ updatedIssue });
}

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session)
    // unauthorized
    return NextResponse.json({}, { status: 401 });
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  // await delay(3000);

  if (!issue) {
    return NextResponse.json(
      { message: 'issue does not exist!' },
      { status: 404 }
    );
  }

  const deletedIssue = await prisma.issue.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({ deletedIssue }, { status: 200 });
}
