import { Box, Flex, Image, Text } from '@chakra-ui/react';

import { DataDisplayLayout } from 'layouts/DataDisplayLayout';
import Link from 'next/link';
import React from 'react';
import { WebImage } from '@cultural-aid/types';

type MatchingImagesProps = {
  matches: Array<WebImage>;
};

export const MatchingImages = ({ matches }: MatchingImagesProps) => {
  return (
    <>
      {matches.map(({ url }: WebImage) => (
        <DataDisplayLayout key={url}>
          <Link href={url}>
            <Image src={url} height='70%' maxH='100%' maxW='100%' />
          </Link>
          <Flex
            p='3'
            flexDir='row'
            height='100%'
            width='100%'
            alignItems='center'
            overflow='hidden'
            flexWrap='wrap'
          >
            <Link href={`https://${new URL(url).hostname}`} passHref>
              <Box
                p='1'
                borderRadius='10px'
                bgGradient='var(--secondary-gradient)'
              >
                {new URL(url).hostname}
              </Box>
            </Link>
          </Flex>
        </DataDisplayLayout>
      ))}
    </>
  );
};
