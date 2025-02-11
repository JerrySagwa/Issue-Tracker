import { Flex, Heading, Text, Card } from '@radix-ui/themes';
import React from 'react';
import IssueStatusBadge from './IssueStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Issue } from '@prisma/client';

const IssueDetail = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gapX={'3'} my={'2'}>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full' mt={'4'}>
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetail;
