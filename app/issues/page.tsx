import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import Link from '../components/Link';
import IssueAction from './IssueAction';
import IssueStatusBadge from './components/IssueStatusBadge';
import IssueStatusFilter from './components/IssueStatusFilter';

const IssuesPage = async ({searchParams: {filteredBy}}: {searchParams: {filteredBy: string}}) => {
  const issues = await prisma.issue.findMany();

  const filterIssues =
    filteredBy === 'ALL'
      ? issues
      : issues.filter((issue) => issue.status === filteredBy);

  return (
    <div>
      <div className='flex justify-between'>
        <IssueStatusFilter/>
        <IssueAction />
      </div>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filterIssues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>
                  <span className='capitalize'>{issue.title}</span>
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = 'force-dynamic'; // opt out static rendering
export default IssuesPage;
