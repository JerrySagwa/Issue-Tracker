import { Card } from '@radix-ui/themes'
import React from 'react'
import IssueStatusBadge from './issues/components/IssueStatusBadge'
import { Status } from '@prisma/client'
import prisma from '@/prisma/client'

const IssueSummary = async () => {
  
  const open = await prisma.issue.count({
    where: {
      status: 'OPEN'
    }
  })
  
  const in_progress = await prisma.issue.count({
    where: {
      status: 'IN_PROGRESS'
    }
  })

  const closed = await prisma.issue.count({
    where: {
      status: 'CLOSED'
    }
  })
  
  const issueSummaries: {label: string, value: Status, count: number}[] = [
    {label: 'open', value: 'OPEN', count: open},
    {label: 'in_progress', value: 'IN_PROGRESS', count: in_progress},
    {label: 'closed', value: 'CLOSED', count: closed}    
  ]

  return (
    <div className='flex justify-start gap-x-4 mb-4'>
        {issueSummaries.map(summary => (
          <Card key={summary.label} className='flex flex-col justify-center gap-y-4 hover:scale-110 transition transform'>
            <div>
              <IssueStatusBadge status={summary.value}/>
            </div>
            <div className='font-bold pl-2'>{summary.count}</div>
          </Card>
        ))}   
    </div>
  )
}

export default IssueSummary
