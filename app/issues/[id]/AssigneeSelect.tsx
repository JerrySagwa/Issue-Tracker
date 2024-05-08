'use client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

type User = {
  name: string;
  email: string;
};

const AssigneeSelect = () => {
  const {isLoading, data: users, error} = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/emailusers').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  
  if (error) return null;
  if (isLoading) return <Skeleton/>
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>('/api/emailusers');

  //     setUsers(data);
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.email} value={user.email}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
