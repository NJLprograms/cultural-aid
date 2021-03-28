import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Router from 'next/router';
import { UserService } from '@cultural-aid/core/services';
import { useSelector } from 'react-redux';
import { userSelector } from '@cultural-aid/core/redux/selectors/userSelector';

export const SignUpForm = () => {
  const { loading, value: user } = useSelector(userSelector);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (user) Router.replace('/');
  }, [user]);

  return (
    <Flex height='100%' justifyContent='center' alignItems='center'>
      <Box
        as='form'
        w={['80%', '60%']}
        // @ts-ignore
        onSubmit={(event) => {
          event.preventDefault();
          UserService.SignUp({
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
              <Button
                type='submit'
                size='sm'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Flex flexDir='column'>
          <Link href='/'>Already have an account?</Link>
          <Link href='/forgot'>Forgot Your Password?</Link>
        </Flex>

        <Button
          type='submit'
          w='100%'
          mt={3}
          bgGradient='var(--theme-color)'
          disabled={loading}
        >
          {loading ? <Spinner /> : 'Sign Up'}
        </Button>
      </Box>
    </Flex>
  );
};
