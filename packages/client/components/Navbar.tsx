import { Box, Flex } from '@chakra-ui/layout';
import { Button, Fade } from '@chakra-ui/react';

import React from 'react';
import { UserService } from '@cultural-aid/core/services';
import { useSelector } from 'react-redux';
import { userSelector } from '@cultural-aid/core/redux/selectors/userSelector';

export const NavBar = () => {
  const { value: user } = useSelector(userSelector);
  return (
    <>
      <Box className='navbar'>
        <Flex justifyContent='flex-end'>
          {user && (
            <Fade in>
              <Button onClick={() => UserService.Logout()}>Logout</Button>
            </Fade>
          )}
        </Flex>
      </Box>
    </>
  );
};
