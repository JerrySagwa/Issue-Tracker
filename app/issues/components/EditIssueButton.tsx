import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { BiPencil } from 'react-icons/bi';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color='violet'>
      <Link href={`/issues/${issueId}/edit`}>
        <Flex gapX={'1'} align={'center'}>
          <BiPencil className='inline-block' />
          <span>Edit</span>
        </Flex>
      </Link>
    </Button>
  );
};

export default EditIssueButton;
