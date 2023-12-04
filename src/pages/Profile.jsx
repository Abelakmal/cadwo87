import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Navbar1 from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useGetTwit from '../hooks/useGetTwit';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import useGetTwitById from '../hooks/useGetTwitById';
import InputEditProfile from '../components/InputEditProfile';
import Postingan from '../components/Postingan';

const Profile = () => {
  const { id } = useParams();
  const [userById, setUserById] = useState({});
  const token = JSON.parse(localStorage.getItem('token'));
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);

  
  const [dataTwitById, setDataTwitById] = useState([]);
  useEffect(() => {
    if (!token) {
      Navigate('/');
    }
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(`http://localhost:3000/user/${id}`);
    setUserById(data);
    getTwitByIdUser(data.id);
  };


  const getTwitByIdUser = async (id) => {
    const twitUser = await useGetTwit();
    let data = [];
    twitUser.forEach((item) => {
      if (item.user.id === id) {
        data.push(item);
      }
    });
    setDataTwitById(data);
  };



  const showEditProfile = (open) => {
    open();
  };

  return (
    <>
      {token && (
        <Box display={'flex'}>
          <Navbar1 />
          <Box w={'100%'}>
            <Box borderBottom={'solid 1px white'} h={'max-content'} w={'100%'} display={'flex'} justifyContent={'space-between'} alignItems={'end'}>
              <Box m={'12px'}>
                <Image src={userById.image || '/no_profile.png'} borderRadius={'100%'} w={'100px'} />
                <Text textTransform={'capitalize'} fontWeight={'bold'} fontSize={'20px'}>
                  {userById.name || userById.username}
                </Text>
                <Text opacity={'0.5'}>@{userById.username}</Text>
                <Flex m={'12px'}>
                  <Text display={'flex'} fontWeight={'bold'}>
                    0{' '}
                    <Text fontWeight={'normal'} opacity={'0.5'} pl={'4px'}>
                      {' '}
                      Pengikut
                    </Text>
                  </Text>
                  <Text display={'flex'} fontWeight={'bold'} ml={'12px'}>
                    0{' '}
                    <Text fontWeight={'normal'} opacity={'0.5'} pl={'4px'}>
                      {' '}
                      Mengikuti
                    </Text>
                  </Text>
                </Flex>
              </Box>
              <Button colorScheme="white" border={'solid 1px'} _hover={{ bgColor: 'grey' }} m={'12px'} onClick={() => setShow(!show)}>
                Edit
              </Button>
              {show && <InputEditProfile showEditProfile={showEditProfile} id={userById.id} dataUser={userById} getData={getData} twit={dataTwitById}/>}
            </Box>
            <Heading borderBottom={'solid 1px'} p={'10px'}>
              My Tweet
            </Heading>
            <Box>
              <Postingan getTwit={getData} token={token} twit={dataTwitById}/>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Profile;
