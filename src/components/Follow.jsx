import { Box, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useGetUser from '../hooks/useGetUser';

const Follow = () => {
  const [dataUser, setDataUser] = useState([])
  useEffect(() => {
    getData()
  },[])
  const getData = async () => {
    const getAllUser = await useGetUser();
    setDataUser(getAllUser)
  }

  console.log(dataUser);

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
