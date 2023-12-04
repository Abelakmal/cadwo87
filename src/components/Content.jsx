import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import useGetUser from '../hooks/useGetUser';
import useGetTwit from '../hooks/useGetTwit';
import Navbar1 from './Navbar';
import Postingan from './Postingan';
import InputTwet from './InputTwet';
import Follow from './Follow';
import axios from 'axios';

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


  const getImage = async () => {
    const dataUSer = await useGetUser();
    const data = dataUSer.find((item) => item.username === token?.username);
    setImgPro(data?.image);
  };

  const handleInpuTwit = async (id, username, image, dateNow, newTwit,name) => {
    await axios.post('http://localhost:3000/twit', {
      user: {
        id,
        username,
        name,
        image,
      },
      content: {
        tglDitambahkan: dateNow,
        image: '',
        message: newTwit,
        respone: {
          like: [],
          share: [],
          comment: [],
        },
      },
    });
  };

  return (
    <>
      {token && (
        <Flex>
          <Navbar1 />
          <Box display={'flex'} width={'80vw'}>
            <Box width={'80%'}>
              <InputTwet imgPro={imgPro} token={token} getTwit={getTwit} handleInput={handleInpuTwit} placeHolder={"What's happening ?"} button={"share"}/>
              <Postingan twit={twit} token={token} getTwit={getTwit}  />
            </Box>

            <Follow />
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Content;
