import { BiPencil } from 'react-icons/bi';
import prisma from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import IssueStatusBadge from '../../components/IssueStatusBadge';
import Link from 'next/link';

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
    <Grid columns={{ initial: '1', md: '2' }}>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gapX={'3'} my={'2'}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt={'4'}>
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button color='violet'>
          <BiPencil />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
