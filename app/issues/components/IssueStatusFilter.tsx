'use client'
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';

const IssueStatusFilter = () => {
  const router = useRouter();

  const statuses: {label: string, value?: Status}[] = [
    {label: 'All'},
    {label: 'Open', value: 'OPEN'},
    {label: 'In Progress', value: 'IN_PROGRESS'},
    {label: 'Closed', value: 'CLOSED'}
  ]
  return (
    <Select.Root onValueChange={(val) => {
      const q = `?filteredBy=${val}`;
      router.push(`/issues${q}`);
      router.refresh();
    }}>
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
