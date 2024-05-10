'use client'
import { AiOutlineStepForward } from 'react-icons/ai';
import { AiOutlineStepBackward } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params}`);
  }

  const totalPage = Math.ceil(itemCount / pageSize);
  if (totalPage === 0) return null;
  return (
    <Flex align={'center'} gap={'2'}>
      <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(1)}>
        <AiOutlineStepBackward />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
        <AiOutlineArrowLeft />
      </Button>
      <Text>
        Page {currentPage} of {totalPage}
      </Text>
      <Button color='gray' variant='soft' disabled={currentPage === totalPage} onClick={() => changePage(currentPage + 1)}>
        <AiOutlineArrowRight />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === totalPage} onClick={() => changePage(totalPage)}>
        <AiOutlineStepForward />
      </Button>
    </Flex>
  );
};

export default Pagination;
