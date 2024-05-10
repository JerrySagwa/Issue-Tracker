import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import Pagination from '../components/Pagination';
import IssueAction from './IssueAction';
import IssueStatusFilter from './components/IssueStatusFilter';
import IssueTable from './components/IssueTable';
import { Metadata } from 'next';

const IssuesPage = async ({
  searchParams: { filteredBy, page },
}: {
  searchParams: {
    filteredBy: Status | 'ALL' | undefined;
    page: string | undefined;
  };
}) => {
  if (filteredBy === 'ALL') filteredBy = undefined;

  const where = {
    status: filteredBy,
  };

  let issues = await prisma.issue.findMany({
    where,
  });

  const pageSize = 10;
  const pageNumber = page === undefined ? 1 : parseInt(page);
  const itemCount = issues.length;
  issues = issues.splice((pageNumber - 1) * pageSize, pageSize);
  // console.log(`ps: ${pageSize}, pn: ${pageNumber}, ic: ${itemCount}`);

  return (
    <div className='flex flex-col gap-y-3'>
      <div className='flex justify-between'>
        <IssueStatusFilter />
        <IssueAction />
      </div>
      <IssueTable issues={issues} />
      <div className='flex justify-center'>
        <Pagination
          currentPage={pageNumber}
          pageSize={pageSize}
          itemCount={itemCount}
        />
      </div>
    </div>
  );
};
export const dynamic = 'force-dynamic'; // opt out static rendering
export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "List of All the issues"
}