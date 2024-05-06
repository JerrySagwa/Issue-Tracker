import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    id: string
  }
}

const IssueDetailPage = async ({params: {id}}: Props) => {

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <div>{issue.title}</div>
      <div>{issue.status}</div>
      <div>{issue.description}</div>
      <div>{issue.createdAt.toDateString()}</div>
    </div>
  )
}

export default IssueDetailPage
