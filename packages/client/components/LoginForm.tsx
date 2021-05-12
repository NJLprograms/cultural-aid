import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { FirebaseService, UserService } from '@cultural-aid/core/services';
import React, { useState } from 'react';

import GoogleButton from 'react-google-button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { userSelector } from '@cultural-aid/core/redux/selectors/userSelector';

export const LoginForm = () => {
  const { loading } = useSelector(userSelector);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Flex
      flexDir='column'
      justifyContent='center'
      alignItems='center'
      height='100%'
    >
      <GoogleButton
        onClick={() => FirebaseService.Authentication.GoogleSignIn()}
        disabled={loading}
      />
      <Text mt='5'>Or</Text>
      <Divider colorScheme='black' mb='3' />
      <Box
        as='form'
        w={['80%', '60%']}
        // @ts-ignore
        onSubmit={(event: React.FormEvent<HTMLDivElement>) => {
          event.preventDefault();
          UserService.Login({
            email,
            password,
          });
        }}
      >
        <FormControl>
          <FormLabel htmlFor='email'>Email Address</FormLabel>
          <Input
            id='email'
            type='email'
            autoComplete='off'
            required
            color='black'
            bg='white'
            boxShadow='0 0 0 1px #63b3ed'
            onChange={({ target }) => setEmail(target.value)}
            disabled={loading}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <InputGroup>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              required
              mb={3}
              color='black'
              bg='white'
              boxShadow='0 0 0 1px #63b3ed'
              onChange={({ target }) => setPassword(target.value)}
              disabled={loading}
            />
            <InputRightElement mr={1} ml={1}>
              <Button size='sm' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Flex flexDir='column'>
          <Link href='/register'>Don't have an account?</Link>
          <Link href='/forgot'>Forgot Your Password?</Link>
        </Flex>
        <Button
          type='submit'
          w='100%'
          mt={3}
          bgGradient='var(--theme-color)'
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Log In'}
        </Button>
      </Box>
    </Flex>
  );
};
