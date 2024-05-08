'use client';
import { Issue } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

type User = {
  name: string;
  email: string;
};

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/emailusers').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;
  if (isLoading) return <Skeleton />;
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data } = await axios.get<User[]>('/api/emailusers');

  //     setUsers(data);
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <Select.Root
      onValueChange={(value) =>
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserEmail: value === 'Unassigned' ? null : value,
        })
      }
    >
      <Select.Trigger placeholder='Assign' />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value='Unassigned'><span className='text-red-500 font-bold'>Unassigned</span></Select.Item>
          {users?.map((user) => (
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
