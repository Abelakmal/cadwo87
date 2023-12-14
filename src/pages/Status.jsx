import { Box, Button, Flex, Heading, Image, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import useGetTwitById from '../hooks/useGetTwitById';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Respone from '../components/Respone';
import useGetTwit from '../hooks/useGetTwit';
import Follow from '../components/Follow';
import useGetUserById from '../hooks/useGetUserById';
import InputTwet from '../components/InputTwet';
import useGetUserComment from '../hooks/useGetUserComment';
import axios from 'axios';
import Postingan from '../components/Postingan';

const Status = () => {
  const { twitId } = useParams();
  const [dataTwitById, setDataTwitById] = useState([]);
  const [dataUserById, setDataUserById] = useState({});
  const token = JSON.parse(localStorage.getItem('token'));
  console.log();

  useEffect(() => {
    getTwitByIdUser();
    getUserById();
  }, []);

  const getTwitByIdUser = async () => {
    const twitUser = await useGetTwitById(twitId);
    setDataTwitById(twitUser);
  };

  const getUserById = async () => {
    const userByid = await useGetUserById(token.id);
    setDataUserById(userByid);
  };

  const handleTglPost = (tgl) => {
    const tglPost = tgl?.slice(0, 10).split('-');
    const jamPost = tgl?.slice(11, 19).split(':');
    if (jamPost && tglPost) {
      let month = '';
      const checkMonth = tglPost[1][0] === 0 ? tglPost[1][1] : tglPost[1];
      switch (checkMonth) {
        case '1':
          month = 'Jar';
          break;
        case '2':
          month = 'Feb';
          break;
        case '3':
          month = 'Mar';
          break;
        case '4':
          month = 'Apr';
          break;
        case '5':
          month = 'Mei';
          break;
        case '6':
          month = 'Jun';
          break;
        case '7':
          month = 'Jul';
          break;
        case '8':
          month = 'Agu';
          break;
        case '9':
          month = 'Okt';
          break;
        case '10':
          month = 'Sep';
          break;
        case '11':
          month = 'Nov';
          break;
        case '12':
          month = 'Des';
          break;
      }
      return `${jamPost[0]}.${jamPost[1]} WIB ${tglPost[2][0] === '0' ? tglPost[2][1] : tglPost[2]} ${month} ${tglPost[0]}`;
    }

    return 'Invalid';
  };

  const handleInputComment = async (id, username, image, dateNow, newTwit) => {
    await axios.patch(`http://localhost:3000/twit/${twitId}`, {
      content: {
        ...dataTwitById.content,
        respone: {
          ...dataTwitById.content.respone,
          comment: [
            ...dataTwitById.content.respone.comment,
            {
              id: dataTwitById.content.respone.comment.length + 1,
              user: {
                id,
                username,
                image,
              },
              content: {
                tglDitambahkan: dateNow,
                image: '',
                message: newTwit,
              },
            },
          ],
        },
      },
    });
  };

  console.log(dataTwitById.content?.respone?.comment);

  return (
    <Flex>
      <Navbar />
      <Box p={'7'} width={'60vw'}>
        <ChakraLink as={ReactRouterLink} to={'/'} style={{ textDecoration: 'none' }}>
          <Box display={'flex'} alignItems={'center'} fontSize={'25px'} fontWeight={'bold'} mb={'9'}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <Text ml={'19px'}>Postingan</Text>
          </Box>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to={`/${dataTwitById.user?.id}`}>
          <Flex>
            <Image src={dataTwitById.user?.image || '/no_profile.png'} borderRadius={'100%'} w={'80px'} />
            <Box ml={'5'} mt={'2'}>
              {
                <Heading color={'white'} fontSize={'20'}>
                  {dataTwitById.user?.username}
                </Heading>
              }
              <Text opacity={'0.6'} style={{ textDecoration: 'none' }}>
                @{dataTwitById.user?.username}
              </Text>
            </Box>
          </Flex>
        </ChakraLink>
        <Box mt={'4'}>
          <Text fontSize={'20'} fontFamily={'cursive'}>
            {dataTwitById.content?.message}
          </Text>
          <Image src={dataTwitById.content?.image || ''} />
          <Text mt={5} fontWeight={'bold'} opacity={0.6}>
            {handleTglPost(dataTwitById.content?.tglDitambahkan)}
          </Text>
          <Box borderY={'solid 1px'} mt={2} w={'100%'}>
            {dataTwitById && <Respone item={dataTwitById} getTwit={getTwitByIdUser} token={token} />}
          </Box>
        </Box>
        <Text ml={40} display={'flex'}>
          {' '}
          membalas <Text color={'blue'}>@{dataTwitById.user?.username}</Text>
        </Text>
        <InputTwet token={token} placeHolder={'Postingan Balasan Anda'} button={'balas'} handleInput={handleInputComment} getTwit={getTwitByIdUser} />

        {dataTwitById.content?.respone && <Postingan twit={dataTwitById.content?.respone?.comment} getTwit={getTwitByIdUser} />}
      </Box>
      <Follow />
    </Flex>
  );
};

export default Status;
