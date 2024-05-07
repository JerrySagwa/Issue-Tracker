import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetail from '../components/IssueDetail';
import EditIssueButton from '../components/EditIssueButton';
import DeleteIssueButton from '../components/DeleteIssueButton';

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
    <Grid columns={{ initial: '1', md: '4' }} gap={'5'}>
      <Box className='lg:col-span-3'>
        <IssueDetail issue={issue} />
      </Box>
      <div className='self-center justify-self-center'>
        <Flex direction={'column'} gapY={'3'} className='max-w-[10rem]'>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </div>
    </Grid>
  );
};

export default IssueDetailPage;
