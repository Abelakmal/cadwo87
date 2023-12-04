import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';

const Follow = () => {
  return (
    <Box position={'sticky'} h={'100vh'} top={'0'} borderLeft={'solid 1px'} display={'flex'} justifyContent={'center'} pt={'12px'} w={'20%'}>
      <Box>
        <Text>Who to Follow</Text>
        <Image src="/no_profile.png" borderRadius={'100%'} h={'40px'} />
        <Image src="/no_profile.png" borderRadius={'100%'} h={'40px'} />
        <Image src="/no_profile.png" borderRadius={'100%'} h={'40px'} />
      </Box>
    </Box>
  );
};

export default Follow;
