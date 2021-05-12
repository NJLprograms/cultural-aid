import { Box, Fade, Flex, Spinner, Text } from '@chakra-ui/react';

import { AnalysisResults } from './AnalysisResults';
import { FileInput } from './FileInput';
import React from 'react';
import { analysisSelector } from '@cultural-aid/core/redux/selectors/analysisSelector';
import { useSelector } from 'react-redux';

export const Dashboard = () => {
  const { value: analysis, loading, loadingMessage } = useSelector(
    analysisSelector
  );

  return (
    <>
      {!loading && (
        <>
          {!analysis && (
            <Flex
              width='100%'
              height='100%'
              justifyContent='center'
              alignItems='center'
              flexDir='column'
              flex='1'
            >
              <FileInput width={['100%', '50%']} />
            </Flex>
          )}

          {analysis && <AnalysisResults analysis={analysis} />}
        </>
      )}
      {loading && (
        <Flex
          width='100%'
          height='100%'
          justifyContent='center'
          alignItems='center'
          p={6}
          flexDir='column'
          flex='1'
        >
          <Fade in>
            <Box m='1' p='6' borderRadius='10px' bg='#1a202c'>
              <Text>{loadingMessage}</Text>
            </Box>
          </Fade>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            height='100px'
            width='100px'
          />
        </Flex>
      )}
    </>
  );
};
