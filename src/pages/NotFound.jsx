import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import Navbar1 from '../components/Navbar';

const NotFound = () => {
  return (
    <Box display={'flex'}>
      <Navbar1 />
      <Box height={'100vh'} w={'100vw'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={'30px'} fontWeight={'bold'}>
          404 NotFound {':)'}
        </Text>
      </Box>
    </Box>
  );
};

export default NotFound;
