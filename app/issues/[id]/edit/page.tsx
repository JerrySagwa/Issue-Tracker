import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import IssueForm from '../../components/IssueForm'

type Props = {
  params: {
    id: string
  }
}

const EditIssuePage = async ({params: {id}}: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (!issue) notFound();

  return (
    <div>
      <IssueForm issue={issue}/>
    </div>
  )
}

export default EditIssuePage
