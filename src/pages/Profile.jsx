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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import useGetTwitById from '../hooks/useGetTwitById';

const Profile = () => {
  const { id } = useParams();
  const [userById, setUserById] = useState({});
  const token = JSON.parse(localStorage.getItem('token'));
  const [newMesssage, setNewMessage] = useState({});
  const Navigate = useNavigate();
  const [idTwit, setIdTwit] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [dataTwitById, setDataTwitById] = useState([]);
  useEffect(() => {
    if (!token) {
      Navigate('/');
    }
    getData();
  }, [newMesssage, idTwit]);

  const getData = async () => {
    const { data } = await axios.get(`http://localhost:3000/user/${id}`);
    setUserById(data);
    getTwitByIdUser(data.id);
  };

  const handleClickId = (id, message) => {
    console.log(message);
    onOpen();
    setIdTwit({ id, message });
  };

  const getTwitByIdUser = async (id) => {
    const twitUser = await useGetTwit();
    let data = [];
    //  data.push(twitUser.find((item)=> item.user.id === id))
    twitUser.forEach((item) => {
      if (item.user.id === id) {
        data.push(item);
      }
    });
    setDataTwitById(data);
  };

  const handleChange = (value) => {
    console.log(idTwit);
    setNewMessage({ value, id: idTwit.id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newMesssage);
    const twitById = await useGetTwitById(newMesssage.id);
    console.log(twitById.content);
    // console.log(newMesssage);
    await axios.patch(`http://localhost:3000/twit/${newMesssage.id}`, {
      content: {
        ...twitById.content,
        message: newMesssage.value,
      },
    });
    getData();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/twit/${id}`);
    getData();
    alert('sukses delete');
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
                  {userById.username}
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
              <Button colorScheme="white" border={'solid 1px'} _hover={{ bgColor: 'grey' }} m={'12px'}>
                Edit
              </Button>
            </Box>
            <Heading borderBottom={'solid 1px'} p={'10px'}>
              My Tweet
            </Heading>
            <Box>
              <Box>
                {dataTwitById.map((item) => {
                  return (
                    <Box borderBottom={'solid 1px'} key={item.id}>
                      <Text p={'22px'}>{item.content.message}</Text>
                      <Flex justifyContent={'space-evenly'}>
                        <Flex alignItems={'center'} _hover={{ backgroundColor: 'gray' }} p={'5px'} borderRadius={'100%'}>
                          <FontAwesomeIcon icon={faComment} /> <Text pl={'4px'}>{item.content.respone.comment.length}</Text>
                        </Flex>
                        <Flex alignItems={'center'} _hover={{ backgroundColor: 'gray' }} p={'5px'} borderRadius={'100%'}>
                          <FontAwesomeIcon icon={faHeart} /> <Text pl={'4px'}>{item.content.respone.like.length}</Text>
                        </Flex>
                        <Flex alignItems={'center'} _hover={{ backgroundColor: 'gray' }} p={'5px'} borderRadius={'100%'}>
                          <FontAwesomeIcon icon={faShareFromSquare} /> <Text pl={'4px'}>{item.content.respone.share.length}</Text>
                        </Flex>
                        <Flex alignItems={'center'} borderRadius={'100%'}>
                          {item.user.id === token.id ? (
                            <Menu>
                              <MenuButton _hover={{ backgroundColor: 'gray' }} p={'5px'} borderRadius={'100%'}>
                                {' '}
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                              </MenuButton>
                              <MenuList>
                                <MenuItem color={'black'} fontFamily={'monospace'} _hover={{ backgroundColor: 'gray' }} onClick={() => handleClickId(item.id, item.content.message)}>
                                  edit
                                </MenuItem>
                                <MenuItem color={'black'} fontFamily={'monospace'} _hover={{ backgroundColor: 'gray' }} onClick={() => handleDelete(item.id)}>
                                  delete
                                </MenuItem>
                              </MenuList>
                              <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                  <form onSubmit={handleSubmit}>
                                    <ModalHeader>Create your account</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                      <FormControl>
                                        <FormLabel>Edit Twit</FormLabel>
                                        <Textarea ref={initialRef} placeholder="Edit Message" name="message" resize={'none'} onChange={(e) => handleChange(e.target.value)} />
                                      </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button colorScheme="blue" mr={3} type="submit" onClick={onClose}>
                                        Save
                                      </Button>
                                      <Button onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                  </form>
                                </ModalContent>
                              </Modal>
                            </Menu>
                          ) : null}
                        </Flex>
                      </Flex>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Profile;
