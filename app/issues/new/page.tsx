'use client';
import { Button, TextField, Callout, Text } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {createIssueSchema} from '../../validationSchema'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import ErrorMessage from '../../components/ErrorMessage'

type NewIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: {errors}} = useForm<NewIssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const router = useRouter();

  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<NewIssueForm> = async (data) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('Invalid input of title or description!');
    }
  };
  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-3'>
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      )}
      <form className='max-w-xl space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder='Title' {...register('title')}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        {errors.description && <ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
