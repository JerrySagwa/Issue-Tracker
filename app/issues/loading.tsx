import { Table } from '@radix-ui/themes';
import React from 'react';
import IssueStatusBadge from './components/IssueStatusBadge';
import IssueAction from './IssueAction';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3];
  return (
    <div>
      <IssueAction />
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
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.RowHeaderCell>
                <Skeleton />
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesPage;
