import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetail from '../components/IssueDetail';
import EditIssueButton from '../components/EditIssueButton';
import DeleteIssueButton from '../components/DeleteIssueButton';
import { authConfig } from '../../api/auth/auth';
import { getServerSession } from 'next-auth';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

type Props = {
  params: {
    id: string;
  };
};

const fetchIssue = cache(
  async (issueId: number) =>
    await prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authConfig);

  const issue = await fetchIssue(parseInt(id));

  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{ initial: '1', md: '4' }} gap={'5'}>
      <Box className='lg:col-span-3'>
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <div className='self-center justify-self-center w-[60%]'>
          <Flex direction={'column'} gapY={'3'}>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </div>
      )}
    </Grid>
  );
};

export default IssueDetailPage;

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const issue = await fetchIssue(parseInt(id));

  return {
    title: 'Issue Tracker - Detail',
    description: `Details of issue ${issue?.title}`,
  };
}
