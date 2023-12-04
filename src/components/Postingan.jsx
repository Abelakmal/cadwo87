import { Box, Flex, Image, Text } from '@chakra-ui/react';

import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import Respone from './Respone';

const Postingan = ({ twit, token, getTwit }) => {

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
      if (selisihTime < 1) {
        return 'a few seconds ago';
      }
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
        return `${(selisihTime / day).toFixed(0)} day`;
      }
    }
  };
  return (
    <Box>
      {twit?.map((item, index) => {
        return (
          <Box key={index} borderBottom={'solid 1px rgb(41,45,47)'}>
            <ChakraLink as={ReactRouterLink} to={`/${item.user?.id}/status/${item?.id}`} style={{ textDecoration: 'none' }}>
              <Box display={'flex'} _hover={{ bgColor: 'rgb(41,45,47)', opacity: '0.8' }} p={'6px'} cursor={'pointer'}>
                <ChakraLink as={ReactRouterLink} to={`/${item.user?.id}`} style={{ textDecoration: 'none' }}>
                  <Image src={item.user?.image || '/no_profile.png'} borderRadius={'100%'} h={'80px'} mx={'30px'} border={'solid 1px'} />
                </ChakraLink>
                <Box width={'100%'}>
                  <Flex alignItems={'center'}>
                    <Box>
                    <Text fontSize={'25px'} fontFamily={'monospace'} fontWeight={'bold'}>
                      {item.user?.name || item.user?.username}
                    </Text>
                    <Text>{`@${item.user?.username}`}</Text>
                    </Box>
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
            <Respone item={item} token={token} getTwit={getTwit} id={item?.id} />
          </Box>
        );
      })}
      <Text></Text>
    </Box>
  );
};

export default Postingan;
