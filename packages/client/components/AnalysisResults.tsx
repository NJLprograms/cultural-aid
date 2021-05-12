import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { BestGuess } from './BestGuess';
import type { ImageAnalysisResults } from '@cultural-aid/types';
import { MatchingImages } from './MatchingImages';
import React from 'react';
import { WebEntities } from './WebEntities';

type AnalysisResultsProps = {
  analysis: ImageAnalysisResults;
};

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => {
  return (
    <>
      <Tabs isFitted variant='enclosed'>
        <TabList
          height='auto'
          overflowX='scroll'
          overflowY='hidden'
          textOverflow='ellipsis'
          pb='2'
        >
          {Object.keys(analysis)
            .filter((key: string) => key !== 'pagesWithMatchingImages')
            .map((key: string) => (
              <Tab key={key} as='div' id={key} cursor='pointer' color='white'>
                <Text textTransform='capitalize'>
                  {key.split(/(?=[A-Z])/).join(' ')}
                </Text>
              </Tab>
            ))}
        </TabList>

        <TabPanels overflow='scroll'>
          <TabPanel>
            <WebEntities webEntities={analysis.webEntities} />
          </TabPanel>

          <TabPanel>
            <MatchingImages matches={analysis.fullMatchingImages} />
          </TabPanel>

          <TabPanel>
            <MatchingImages matches={analysis.partialMatchingImages} />
          </TabPanel>

          <TabPanel>
            <MatchingImages matches={analysis.visuallySimilarImages} />
          </TabPanel>

          <TabPanel>
            <BestGuess guesses={analysis.bestGuessLabels} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
