import { Box, Flex, Heading, Img, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import useGetChat from '../hooks/useGetChat';

const Message = () => {
  const [dataChat, setDataChat] = useState([])
  const token = JSON.parse(localStorage.getItem('token'))
  useEffect(() =>{
    getData()
  },[])
  const getData = async() => {
    const getChatUser = await useGetChat() 
    console.log(getChatUser);
    // setDataChat(getChatUser)
  }
  return (
    <Flex>
      <Navbar />
      <Box p={12} w={'100%'}>
        <Heading borderBottom={'solid'} w={'100%'}>My Friend</Heading>
        <Box display={'grid'} gap={'12px'} mt={'40px'}>
          <Flex  border={'solid 1px'} borderRadius={'50px'} _hover={{opacity: '0.8'}} cursor={'pointer'}>
            <Img src="/no_profile.png " border={'solid 2px'} borderRadius={'100%'} h={20} mr={'12px'} />
            <Box>
              <Text>Darnot</Text>
              <Text opacity={'0.7'}>real nih asli?</Text>
            </Box>
          </Flex>
          <Flex  border={'solid 1px'} borderRadius={'50px'} _hover={{opacity: '0.8'}} cursor={'pointer'}>
            <Img src="/no_profile.png" border={'solid 2px'} borderRadius={'100%'} h={20} mr={'12px'} />
            <Box>
              <Text>Heppi</Text>
              <p>hari apa sekarang?</p>
            </Box>
          </Flex>
          <Flex  border={'solid 1px'} borderRadius={'50px'} _hover={{opacity: '0.8'}} cursor={'pointer'}>
            <Img src="/no_profile.png" border={'solid 2px'} borderRadius={'100%'} h={20} mr={'12px'} />
            <Box>
              <Text>Abel</Text>
              <p>asli gak sih</p>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Message;
