import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

import { FileInput } from './FileInput';
import React from 'react';
import { Spinner } from '@chakra-ui/spinner';
import { analysisSelector } from '@cultural-aid/core/redux/selectors/analysisSelector';
import { useSelector } from 'react-redux';

export const Dashboard = () => {
  const { value: analysis, loading } = useSelector(analysisSelector);
  return (
    <>
      {!loading && (
        <>
          <Flex
            width='100%'
            height='100%'
            justifyContent='center'
            alignItems='center'
            flexDir='column'
            flex='1'
          >
            {!analysis && <FileInput width={['100%', '50%']} />}
            {analysis && <p>hi</p>}
          </Flex>
        </>
      )}
      {loading && (
        <>
          <Flex width='100%' height='100%' p={6} flexDir='column' flex='1'>
            <SkeletonCircle mt='6' size='10' />
            <SkeletonText mt='4' mb='4' w='100%' noOfLines={4} spacing='4' />
            <SkeletonText
              mt='4'
              mb='4'
              w='100%'
              noOfLines={4}
              spacing='4'
              opacity='0'
            />
            <SkeletonText mt='4' mb='4' w='100%' noOfLines={4} spacing='4' />
          </Flex>
        </>
      )}
    </>
  );
};
