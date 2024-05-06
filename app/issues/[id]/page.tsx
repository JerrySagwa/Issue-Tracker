import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetail from '../../components/IssueDetail';
import EditIssueButton from './EditIssueButton';

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
    <Grid columns={{ initial: '1', md: '2' }} gap={'5'}>
      <Box>
        <IssueDetail issue={issue}/>
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id}/>        
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
