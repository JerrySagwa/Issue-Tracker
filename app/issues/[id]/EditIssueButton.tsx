import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { BiPencil } from 'react-icons/bi';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color='violet'>
      <BiPencil />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
