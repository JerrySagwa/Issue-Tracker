import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';

type Props = {
  params: {
    id: string;
  };
};

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gapX={'3'} my={'2'}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </div>
  );
};

export default IssueDetailPage;
