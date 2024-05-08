import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import React from 'react';

const IssueStatusFilter = () => {
  const statuses: {label: string, value?: Status}[] = [
    {label: 'All'},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Closed', value: 'CLOSED'}
  ]
  return (
    <Select.Root>
      <Select.Trigger placeholder='Filtering by Status...'/>
      <Select.Content position='popper'>
      {
        statuses.map(status => (
          <Select.Item value={status.value || 'ALL'}>{status.label}</Select.Item>
        ))
      }
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
