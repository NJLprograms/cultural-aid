import { Container, Flex } from '@chakra-ui/react';

import { GlassCard } from 'components/GlassCard';
import { NavBar } from 'components/Navbar';
import React from 'react';

export const MainLayout = ({ children }) => (
  <Container
    height='100%'
    maxW={['container.xl', 'container.md']}
    display='flex'
    flexDir='column'
  >
    <NavBar />
    <Flex justifyContent='center' alignItems='center' flexDir='column' flex='1'>
      <GlassCard height='100%'>{children}</GlassCard>
    </Flex>
  </Container>
);
