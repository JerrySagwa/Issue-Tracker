'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';

const IssueStatusFilter = () => {
  const router = useRouter();

  const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const searchParams = useSearchParams();
  const urlsp = new URLSearchParams(searchParams);
  const filterFunction = (val: string) => {
    urlsp.set('filteredBy', val.toString());
    router.push(`?${urlsp}`);
    router.refresh();
  };

  return (
    <Select.Root onValueChange={filterFunction}>
      <Select.Trigger placeholder='Filtering by Status...' />
      <Select.Content position='popper'>
        {statuses.map((status) => (
          <Select.Item value={status.value || 'ALL'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
