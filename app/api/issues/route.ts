import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod'
import prisma from '@/prisma/client'

const IssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255)
})

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = IssueSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({error: result.error.errors}, {status: 400});
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  });

  return NextResponse.json({issue: newIssue}, {status: 201});
}