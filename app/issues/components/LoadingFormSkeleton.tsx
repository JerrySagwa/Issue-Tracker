import { Card, Flex } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingFormSkeleton = () => {
  return (
    <>
      <Skeleton />
      <Flex gapX={'3'} my={'2'}>
        <Skeleton width={'5rem'} />
        <Skeleton width={'8rem'} />
      </Flex>
      <Card className='prose' mt={'4'}>
        <Skeleton count={3} />
      </Card>
    </>
  );
};

export default LoadingFormSkeleton;
