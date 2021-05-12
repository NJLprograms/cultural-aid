import { Box, Text } from '@chakra-ui/layout';
import { CloseButton, Fade, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

import { ImageAnalysisService } from '@cultural-aid/core/services';
import type { StorageFile } from '@cultural-aid/types/storage';

export const FileInput = ({ ...props }) => {
  const [file, setFile] = useState<StorageFile>(null);

  const handleFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { files } = event.target;
    setFile(processFileBlob(files) || file);
  };

  const onDragAndDropFile = (event: React.DragEvent<HTMLDivElement>): void => {
    const { files } = event.dataTransfer;
    setFile(processFileBlob(files) || file);
  };

  return (
    <>
      <Box
        className='file-input'
        maxHeight='100%'
        maxWidth='100%'
        position='relative'
        onDrop={onDragAndDropFile}
        {...props}
      >
        {file ? (
          <Box m='3' borderRadius='10px' bg='#1a202c'>
            <Fade in>
              <Text
                bgGradient='var(--secondary-gradient)'
                bgClip='text'
                fontSize={['xl', '2xl']}
                fontWeight='extrabold'
                textShadow='2px 2px 1px rgba(0,0,0,0.1)'
                display='flex'
                justifyContent='center'
                overflow='wrap'
                textOverflow='ellipsis'
                textAlign={['center', 'left']}
              >
                {file.name}
              </Text>
            </Fade>
          </Box>
        ) : (
          <Box height='100px'></Box>
        )}

        <Box margin={1} className='image-box' border='5px dashed black'>
          {file && (
            <Fade in>
              <CloseButton
                onClick={() => {
                  setFile(null);
                }}
                position='absolute'
                top={[-2, -5]}
                right={[-2, -5]}
                zIndex={2}
                size='lg'
                borderRadius='100px'
                bgGradient='var(--secondary-gradient)'
                _hover={{
                  bgGradient: 'var(--theme-color)',
                }}
              />
            </Fade>
          )}
          <Input
            className='file'
            id='file'
            type='file'
            accept='.jpg, .jpeg, .png'
            onChange={handleFileInput}
          />
          <label htmlFor='file'></label>
          {file ? (
            <img src={file.src} />
          ) : (
            <>
              <Text width='50%' color='#12161f' textAlign='center'>
                Click to take an image or drag your image here
              </Text>
            </>
          )}
        </Box>

        {file && (
          <Fade in>
            <button
              className='button'
              style={{ marginTop: '5px', width: '100%' }}
              onClick={() => ImageAnalysisService.AnalyzeImageFile(file)}
            >
              Analyze
            </button>
          </Fade>
        )}
      </Box>
    </>
  );
};

const processFileBlob = (files: FileList): StorageFile => {
  const fileBlob: StorageFile = files[0];
  try {
    fileBlob['src'] = URL.createObjectURL(fileBlob);
    return fileBlob;
  } catch (error) {
    console.error(error);
    return null;
  }
};
