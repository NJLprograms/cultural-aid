import { Flex, Text } from '@chakra-ui/react';

import { DataDisplayLayout } from 'layouts/DataDisplayLayout';
import { WebLabel } from '@cultural-aid/types';

type BestGuessProps = {
  guesses: Array<WebLabel>;
};

export const BestGuess = ({ guesses }: BestGuessProps) => {
  return (
    <DataDisplayLayout>
      {guesses.map(({ label, languageCode }: WebLabel) => (
        <Flex key={label} flexDir='column'>
          <Text p={1}>Language: {languageCode}</Text>
          <Text
            p={1}
            borderRadius='10px'
            bgGradient='var(--secondary-gradient)'
          >
            {label}
          </Text>
        </Flex>
      ))}
    </DataDisplayLayout>
  );
};
