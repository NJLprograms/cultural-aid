import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/react';

import React from 'react';
import { WebEntity } from '@cultural-aid/types';

type WebEntitiesProps = {
  webEntities: WebEntity[];
};

export const WebEntities = ({ webEntities }: WebEntitiesProps) => {
  return (
    <Flex flexDir='column' overflow='scroll'>
      {webEntities
        .filter(({ description }) => !!description)
        .map(({ entityId, score, description }: WebEntity) => (
          <Box
            key={entityId}
            m='1'
            borderRadius='10px'
            height='100px'
            bg='#1a202c'
          >
            <Flex height='100%'>
              <Flex justifyContent='center' alignItems='center' m={3}>
                <Text>{description}</Text>
              </Flex>

              <Flex
                justifyContent='center'
                alignItems='center'
                marginLeft='auto'
                mr='3'
              >
                <CircularProgress value={score * 100} color={scoreColor(score)}>
                  <CircularProgressLabel>
                    {Number(score * 100).toFixed(0)}%
                  </CircularProgressLabel>
                </CircularProgress>
              </Flex>
            </Flex>
          </Box>
        ))}
    </Flex>
  );
};

const scoreColor = (score: number): string => {
  if (score > 0.8) return 'green.400';

  if (score > 0.4) return 'yellow';

  return 'red';
};
