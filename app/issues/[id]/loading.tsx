import { Card, Flex } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import LoadingFormSkeleton from '../components/LoadingFormSkeleton'

const LoadingIssueDetailPage = () => {
  return (
    <div className='max-w-xl'>
      <LoadingFormSkeleton />
    </div>
  );
};

export default LoadingIssueDetailPage;
