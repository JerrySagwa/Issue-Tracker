import { AiOutlineStepForward } from 'react-icons/ai';
import { AiOutlineStepBackward } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Box, Button, Flex, Text } from '@radix-ui/themes';
import React from 'react';

type Props = {
  itemCount: number;
  pageSize: number;
  currentPage: number;
};

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const totalPage = Math.ceil(itemCount / pageSize);
  if (totalPage === 0) return null;
  return (
    <Flex align={'center'} gap={'2'}>
      <Button color='gray' variant='soft' disabled={currentPage === 1}>
        <AiOutlineStepBackward />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === 1}>
        <AiOutlineArrowLeft />
      </Button>
      <Text>
        Page {currentPage} of {totalPage}
      </Text>
      <Button color='gray' variant='soft' disabled={currentPage === totalPage}>
        <AiOutlineArrowRight />
      </Button>
      <Button color='gray' variant='soft' disabled={currentPage === totalPage}>
        <AiOutlineStepForward />
      </Button>
    </Flex>
  );
};

export default Pagination;
