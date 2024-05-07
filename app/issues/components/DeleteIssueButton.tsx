import { AiFillDelete } from 'react-icons/ai';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red'>
            <Flex gapX={'1'} align={'center'}>
              <AiFillDelete />
              <span>Delete</span>
            </Flex>
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth='450px'>
          <AlertDialog.Title>Revoke access</AlertDialog.Title>
          <AlertDialog.Description size='2'>
            Are you sure to delete this issue?
          </AlertDialog.Description>

          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel>
              <Button variant='soft' color='gray'>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant='solid' color='red'>
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
