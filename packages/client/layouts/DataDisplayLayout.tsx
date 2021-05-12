import { Box, Flex } from '@chakra-ui/react';

import React from 'react';

export const DataDisplayLayout = ({ children, ...props }) => (
  <Box {...props} m='1' borderRadius='10px' height='100px' bg='#1a202c'>
    <Flex
      flexDir='row'
      justifyContent='flex-start'
      alignItems='center'
      m='3'
      h='100%'
      maxH='100%'
    >
      {children}
    </Flex>
  </Box>
);
