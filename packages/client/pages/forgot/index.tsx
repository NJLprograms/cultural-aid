import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Spinner,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import Router from 'next/router';
import { UserService } from '@cultural-aid/core/services';
import { resetProcessSelector } from '@cultural-aid/core/redux/selectors/process';
import { useSelector } from 'react-redux';

const ForgotPasswordPage = () => {
  const { loading, success } = useSelector(resetProcessSelector);

  const [email, setEmail] = useState<string>('');

  return (
    <>
      <Flex height='100%' justifyContent='center' alignItems='center'>
        {!success && (
          <Box
            as='form'
            w={['80%', '60%']}
            // @ts-ignore
            onSubmit={(event) => {
              event.preventDefault();
              UserService.SendResetPasswordEmail(email);
            }}
          >
            <FormControl>
              <FormLabel htmlFor='email'>Email Address</FormLabel>
              <Input
                id='email'
                type='email'
                autoComplete='off'
                required
                mb={6}
                color='black'
                bg='white'
                boxShadow='0 0 0 1px #63b3ed'
                onChange={({ target }) => setEmail(target.value)}
              />
            </FormControl>

            <Flex flexDir='column'>
              <Link href='/'>Already have an account?</Link>
              <Link href='/register'>Don't have an account?</Link>
            </Flex>

            <Button
              type='submit'
              w='100%'
              mt={3}
              bgGradient='var(--theme-color)'
            >
              {loading ? <Spinner /> : 'Send Reset Password Email'}
            </Button>
          </Box>
        )}
        {success && (
          <Flex flexDir='column' width={['80%', '60%']}>
            <Heading mb={3}>
              {email
                ? `Email has been sent to ${email}.`
                : 'Email has already been sent!'}
            </Heading>
            <Heading>Make sure to check in your spam inbox in case!</Heading>
            <Button
              onClick={() => Router.push('/')}
              bgGradient='var(--theme-color)'
            >
              Back to login page
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default ForgotPasswordPage;
