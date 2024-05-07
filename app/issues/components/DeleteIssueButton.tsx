'use client';
import { AiFillDelete } from 'react-icons/ai';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Spinner from '../../components/Spinner'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color='red' disabled={isDeleting}>
            <Flex gapX={'1'} align={'center'}>
              <AiFillDelete />
              <span>Delete</span>
              {isDeleting && <Spinner/>}
            </Flex>
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth='450px'>
          <AlertDialog.Title>Delete Confirmation</AlertDialog.Title>
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
              <Button
                variant='solid'
                color='red'
                onClick={async () => {
                  try {
                    setIsDeleting(true);
                    await axios.delete(`/api/issues/${issueId}`);
                    router.push('/issues');
                    router.refresh();
                  } catch (_) {
                    setHasError(true);
                  } finally {
                    setIsDeleting(false);
                  }
                }}
              >
                Confirm
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={hasError}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted.
          </AlertDialog.Description>
          <Flex gap='3' mt='4' justify='end'>
            <AlertDialog.Cancel>
              <Button
                variant='soft'
                color='gray'
                onClick={() => setHasError(false)}
                mt={'3'}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
