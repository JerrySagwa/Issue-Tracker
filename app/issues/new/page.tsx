import React from 'react';
import { Button, TextField, TextArea } from '@radix-ui/themes';

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-4'>
      <TextField.Root placeholder='Title'>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextArea placeholder='Description' />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
