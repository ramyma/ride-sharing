import React from 'react';
import { useColorMode } from '@xstyled/emotion';
import Flex from './primitives/Flex';
import logo from '../assets/logo.png';
import Box from './primitives/Box';

export default function Header() {
  const [colorMode, setColorMode] = useColorMode();

  function toggleColorMode() {
    if (colorMode === 'dark') {
      setColorMode('default');
    } else {
      setColorMode('dark');
    }
  }

  return (
    <Flex
      as="header"
      height={48}
      grid
      alignItems="center"
      justifyContent="space-between"
      py={2}
    >
      <img height="60%" src={logo} alt="logo" />
      <Box
        backgroundColor="inverseBackground"
        borderRadius="50%"
        clickable
        height={40}
        width={40}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
