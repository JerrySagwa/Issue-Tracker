'use client';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type NewIssueForm = {
  title: string;
  description: string;
};

const NewIssuePage = () => {
  const { register, control, handleSubmit } = useForm<NewIssueForm>();
  const router = useRouter();

  const onSubmit: SubmitHandler<NewIssueForm> = async (data) => {
    const response = await axios.post('/api/issues', data);
    console.log(response);
    router.push('/issues');
  };
  return (
    <form className='max-w-xl space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root placeholder='Title' {...register('title')}>
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <Controller
        name='description'
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder='Description' {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
