import { AiFillDelete } from 'react-icons/ai';
import { Button, Flex } from '@radix-ui/themes';
import React from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color='red' className='cursor-pointer'>
      <Flex gapX={'1'} align={'center'}>
        <AiFillDelete />
        <span>Delete</span>
      </Flex>
    </Button>
  );
};

export default DeleteIssueButton;
