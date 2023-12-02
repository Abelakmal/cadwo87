import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import useGetTwit from '../hooks/useGetTwit';
import useGetTwitById from '../hooks/useGetTwitById';

const Status = () => {
  const { twitId } = useParams();
  const [dataTwitById, setDataTwitById] = useState([]);
  console.log();

  useEffect(() => {
    getTwitByIdUser();
  }, []);

  const getTwitByIdUser = async () => {
    const twitUser = await useGetTwitById(twitId);
    setDataTwitById(twitUser);
  };

  return (
    <Flex>
      <Navbar />
      <Box>
        <Flex>
          <Image src={dataTwitById.user?.image || '/no_profile.png'} borderRadius={'100%'} w={'80px'} />
          <Box>
            {<Heading color={'white'}>{dataTwitById.user?.username}</Heading>}
            <Text>@{dataTwitById.user?.username}</Text>
          </Box>
        </Flex>
        <Box>
            <Text>{dataTwitById.content?.message}</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Status;
