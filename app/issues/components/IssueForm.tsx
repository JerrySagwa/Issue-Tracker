'use client';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { z } from 'zod';

type NewIssueForm = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<NewIssueForm> = async (data) => {
    try {
      setIsSubmitting(true);
      // Seperate of Concerns ? little value in this case
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('Invalid input of title or description!');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && (
        <Callout.Root color='red' className='mb-3'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='max-w-xl space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder='Title'
          {...register('title')}
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        )}
        <Button disabled={isSubmitting}>
          {issue ? 'Submit Edited Issue' : 'Submit New Issue'}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </>
  );
};

export default IssueForm;
