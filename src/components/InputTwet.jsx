import { Box, Button, Flex, FormControl, Image, Text, Textarea } from '@chakra-ui/react';
import { faFaceSmile, faImage } from '@fortawesome/free-regular-svg-icons';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const InputTwet = ({ imgPro, token, getTwit }) => {
  const [jumlahInput, setJumlahInput] = useState(0);
  const [newTwit, setNewTwit] = useState();


  const getUserById = async (id) => {
    const { data } = await axios.get(`http://localhost:3000/user/${id}`);
    return data;
  };

  const handleChangeInput = (e) => {
    setNewTwit(e);
    setJumlahInput(e.length);
  };

  const handleSubmitInput = async (e) => {
    e.preventDefault();

    const dataUserById = await getUserById(token?.id);
    const date = new Date();
    const seconds = date.getSeconds().toString();
    const minutes = date.getMinutes().toString();
    const hours = date.getHours().toString();
    const day = date.getDate().toString();
    const month = date.getMonth().toString();
    const dateNow = `${date.getFullYear()}-${month.length !== 2 ? '0' : ''}${date.getMonth() + 1}-${day.length !== 2 ? '0' : ''}${date.getDate()}T${hours.length !== 2 ? '0' : ''}${date.getHours()}:${
      minutes.length !== 2 ? '0' : ''
    }${minutes}:${seconds.length !== 2 ? '0' : ''}${date.getSeconds()}`;

    await axios.post('http://localhost:3000/twit', {
      user: {
        id: dataUserById.id,
        username: dataUserById.username,
        image: dataUserById.image
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
    getTwit();
  };


  return (
    <Box p={'12px'} borderBottom={'solid 1px'}>
      <form onSubmit={handleSubmitInput}>
        <FormControl>
          <Box display={'flex'} p={'18px'}>
            <Image src={imgPro || '/no_profile.png'} borderRadius={'100%'} h={'80px'} mx={'30px'} />
            <Flex flexDirection={'column'} alignItems={'end'} width={'100%'}>
              <Textarea placeholder="What's happening ?" border={'solid 1px'} disabled={token ? false : true} maxLength={150} name="message" resize={'none'} onChange={(e) => handleChangeInput(e.target.value)}></Textarea>
              <Text textColor={'white'}>{jumlahInput}/150</Text>
            </Flex>
          </Box>
        </FormControl>
        <Flex justifyContent={'space-between'}>
          <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} gap={'12px'}>
            <Button borderRadius={'100%'} textColor={'blue'} bgColor={'black'}>
              <FontAwesomeIcon icon={faImage} />
            </Button>
            <Button borderRadius={'100%'} textColor={'blue'} bgColor={'black'}>
              <FontAwesomeIcon icon={faMicrophone} />
            </Button>
            <Button borderRadius={'100%'} textColor={'blue'} bgColor={'black'}>
              <FontAwesomeIcon icon={faFaceSmile} />
            </Button>
          </Box>
          <Button type="submit" m={'12px'} colorScheme="blue" color={'white'}>
            Share
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default InputTwet;
