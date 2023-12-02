import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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
import { faComment, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import useGetTwitById from '../hooks/useGetTwitById';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

const Postingan = ({ twit, getTimePosting, token, getTwit }) => {
  const linkRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jumlahInput, setJumlahInput] = useState(0);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [idTwit, setIdTwit] = useState({});
  const [newMesssage, setNewMessage] = useState({});

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/twit/${id}`);
    getTwit();
    alert('sukses delete');
  };

  const handleClickId = (id, message) => {
    onOpen();
    setIdTwit({ id, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const twitById = await useGetTwitById(newMesssage.id);
    await axios.patch(`http://localhost:3000/twit/${newMesssage.id}`, {
      content: {
        ...twitById.content,
        message: newMesssage.value,
        status: true,
      },
    });
    getTwit();
  };

  const handleChange = (value) => {
    console.log(idTwit);
    setJumlahInput(value.length);
    setNewMessage({ value, id: idTwit.id });
  };

  const handleLike = async (id) => {
    let getTwitId = await useGetTwitById(id);
    const findIdLike = getTwitId.content.respone.like.find((item) => item.id === token.id);
    console.log(findIdLike);
    if (!findIdLike) {
      await axios.patch(`http://localhost:3000/twit/${id}`, {
        content: {
          ...getTwitId.content,
          respone: {
            ...getTwitId.content.respone,
            like: [...getTwitId.content.respone.like, { id: token.id, color: 'red' }],
          },
        },
      });
    } else {
      const data = await newData(id);
      let removeLike = data.content.respone?.like;
      removeLike = removeLike.filter((item) => item.id != token.id);
      console.log(removeLike);
      await axios.patch(`http://localhost:3000/twit/${id}`, {
        content: {
          ...getTwitId.content,
          respone: {
            ...getTwitId.content.respone,
            like: removeLike,
          },
        },
      });
    }
    getTwit();
  };

  async function newData(id) {
    const newData = await useGetTwitById(id);
    return newData;
  }

  const check = (like) => {
    let findId = like.find((item) => item.id === token.id);
    if (like.length > 0 && findId) {
      return 'red';
    }
  };

  const handleShare = async (idTwit, idUser) => {
    const getTwitId = await useGetTwitById(idTwit);
    console.log(idTwit);
    const findIdShare = getTwitId.content.respone.share.find((item) => item === idUser);
    if (!findIdShare) {
      await axios.patch(`http://localhost:3000/twit/${idTwit}`, {
        content: {
          ...getTwitId.content,
          respone: {
            ...getTwitId.content.respone,
            share: [...getTwitId.content.respone.share, idUser],
          },
        },
      });
    }
    
    getTwit()
    navigator.clipboard.writeText(linkRef.current.value);
    alert('sukses salin link');
  };

  return (
    <Box>
      {twit.map((item, index) => {
        // console.log(item.content.respone.like.length > 0 ? item.content.respone.like[index].color : '');
        return (
          <Box key={index} borderBottom={'solid 1px rgb(41,45,47)'}>
            <ChakraLink as={ReactRouterLink} to={`/${item.user.id}/status/${item.id}`} style={{ textDecoration: 'none' }}>
              <Box display={'flex'} _hover={{ bgColor: 'rgb(41,45,47)', opacity: '0.8' }} p={'6px'} cursor={'pointer'}>
                <ChakraLink as={ReactRouterLink} to={`/${item.user.id}`} style={{ textDecoration: 'none' }}>
                  <Image src={item.user?.image || '/no_profile.png'} borderRadius={'100%'} h={'80px'} mx={'30px'} border={'solid 1px'} />
                </ChakraLink>
                <Box width={'100%'}>
                  <Flex alignItems={'center'}>
                    <Text fontSize={'25px'} fontFamily={'monospace'} fontWeight={'bold'}>
                      @{item.user?.username}
                    </Text>
                    <Text ml={'9px'} fontFamily={'monospace'}>
                      about {getTimePosting(item.content?.tglDitambahkan)}
                      {`${item.content?.status ? '(edit)' : ''}`}
                    </Text>
                  </Flex>
                  <Text my={'20px'} fontFamily={'sans-serif'}>
                    {item.content?.message}
                  </Text>
                </Box>
              </Box>
            </ChakraLink>
            <Flex justifyContent={'space-evenly'}>
              <Button alignItems={'center'} _hover={{ backgroundColor: 'gray' }} bgColor={'black'} textColor={'white'} p={'5px'} borderRadius={'100%'}>
                <FontAwesomeIcon icon={faComment} /> <Text pl={'4px'}>{item.content.respone.comment.length}</Text>
              </Button>
              <Button alignItems={'center'} _hover={{ backgroundColor: 'gray' }} bgColor={'black'} textColor={'white'} p={'5px'} borderRadius={'100%'} onClick={() => handleLike(item.id)}>
                <FontAwesomeIcon icon={faHeart} style={{ color: check(item.content.respone.like) }} /> <Text pl={'4px'}>{item.content.respone.like.length}</Text>
              </Button>
              <Button alignItems={'center'} _hover={{ backgroundColor: 'gray' }} bgColor={'black'} textColor={'white'} p={'5px'} borderRadius={'100%'} onClick={() => handleShare(item.id, item.user.id)}>
                <Input type="text" readOnly value={`localhost:5173/${item.user.id}/status/${item.id}`} ref={linkRef} display={'none'} />
                <FontAwesomeIcon icon={faShareFromSquare} /> <Text pl={'4px'}>{item.content.respone.share.length}</Text>
              </Button>
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
                              <Textarea ref={initialRef} placeholder="Edit Message" name="message" maxLength={150} resize={'none'} onChange={(e) => handleChange(e.target.value)} />
                            </FormControl>
                            <Text>{jumlahInput}/150</Text>
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
      <Text></Text>
    </Box>
  );
};

export default Postingan;
