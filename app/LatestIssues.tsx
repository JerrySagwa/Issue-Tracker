import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import React from 'react';
import Link from './components/Link';
import IssueStatusBadge from './issues/components/IssueStatusBadge';

const LatestIssues = async () => {
  const lastests = await prisma.issue.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    take: 5,
    include: {
      assignedToUser: true
    }
  });
  return (
    <>
      <Table.Root variant='surface'>
        <Table.Body>
          {lastests.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <div className=' flex justify-between items-center'>
                    <div className='flex flex-col '>
                      <Link href={`/issues/${issue.id}`}>
                        <span className='capitalize'>{issue.title}</span>{' '}
                      </Link>
                      <div>
                        <IssueStatusBadge status={issue.status} />
                      </div>
                    </div>
                    <div className='mr-10'>{issue.assignedToUserEmail ? issue.assignedToUser!.name : 'Unassigned'}</div>
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LatestIssues;
