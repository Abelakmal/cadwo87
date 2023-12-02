import {
  Box,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import useGetUser from '../hooks/useGetUser';
import useGetTwit from '../hooks/useGetTwit';
import Navbar1 from './Navbar';
import Postingan from './Postingan';
import InputTwet from './InputTwet';

const Content = () => {
  const Navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('token'));

  const [imgPro, setImgPro] = useState('');
  const [twit, setTwit] = useState([]);

  useEffect(() => {
    if (!token) {
      Navigate('/login');
    }
    getImage();
    getTwit();
  }, []);

  const getTwit = async () => {
    const dataTwet = await useGetTwit();
    setTwit(dataTwet);
  };

  const getTimePosting = (time) => {
    if (time) {
      const timePost = new Date(time);
      const dateNow = new Date();
      const minute = 60;
      const hours = minute * 60;
      const day = hours * 24;
      const week = day * 7;
      const month = week * 4;
      const years = month * 12;

      const selisihTime = (dateNow - timePost) / 1000;

      if (selisihTime < minute) {
        return `${selisihTime.toFixed(0)} seconds`;
      }
      if (selisihTime < hours) {
        return `${(selisihTime / minute).toFixed(0)} minute`;
      }
      if (selisihTime < day) {
        return `${(selisihTime / hours).toFixed(0)} hours`;
      }
      if (selisihTime < week) {
        return `${selisihTime / day} day`;
      }
    }
  };

  const getImage = async () => {
    const dataUSer = await useGetUser();
    const data = dataUSer.find((item) => item.username === token?.username);
    setImgPro(data?.image);
  };

  return (
    <>
      {token && (
        <Flex>
          <Navbar1 />
          <Box display={'flex'} width={'80vw'}>
            <Box width={'80%'}>
              <InputTwet imgPro={imgPro} token={token} getTwit={getTwit} />
              <Postingan twit={twit} getTimePosting={getTimePosting} token={token} getTwit={getTwit} />
            </Box>

            <Box position={'sticky'} h={'100vh'} top={'0'} borderLeft={'solid 1px'} display={'flex'} justifyContent={'center'} pt={'12px'} w={'20%'}>
              <Box>
                <Text>Who to Follow</Text>
                <Image src="/no_profile.png" borderRadius={'100%'} h={'40px'} />
                <Image src="/no_profile.png" borderRadius={'100%'} h={'40px'} />
                <Image src="/no_profile.png" borderRadius={'100%'} h={'40px'} />
              </Box>
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Content;
