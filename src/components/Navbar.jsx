import { Box, Button, Flex, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faHouse } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import useGetUser from '../hooks/useGetUser';

const Navbar = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const [imgPro, setImgPro] = useState('');
  const Navigate = useNavigate();
  useEffect(() => {
    if(!token){
        Navigate('/login')
    }
    getImage();
  }, [token]);

  const getImage = async () => {
    const dataUSer = await useGetUser();
    if (token) {
      const data = dataUSer.find((item) => item?.username === token?.username);
      setImgPro(data?.image);
    } else {
      setImgPro('/no_profile.png');
    }
  };
  return (
    <Box borderRight={'solid 1px'} position={'sticky'} h={'100vh'} top={'0'} w={'max-content'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} p={'60px'} borderEnd={'solid 1px'}>
      <ChakraLink as={ReactRouterLink} to={'/'} style={{ textDecoration: 'none' }}>
        <Heading display={'flex'}>
          <Text fontWeight={'thin'} fontSize={'30px'}>
            SOS
          </Text>
          <Text color={'orange'}>MED.</Text>
        </Heading>
      </ChakraLink>
      <Box fontSize={'28px'} h={'40%'} display={'flex'} flexDirection={'column'} gap={'6'} justifyContent={'space-evenly'} fontFamily={'monospace'}>
        <ChakraLink as={ReactRouterLink} to="/" display={'flex'} alignItems={'center'} style={{ textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faHouse} />
          <Text ml={'14px'}> Home</Text>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/notification" display={'flex'} alignItems={'center'} style={{ textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faBullhorn} /> <Text ml={'14px'}>Notification</Text>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to="/message" display={'flex'} alignItems={'center'} style={{ textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faMessage} /> <Text ml={'14px'}>Message</Text>
        </ChakraLink>
        <ChakraLink as={ReactRouterLink} to={`/${token?.id}`} display={'flex'} alignItems={'center'} style={{ textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faUser} /> <Text ml={'14px'}>Profile</Text>
        </ChakraLink>
      </Box>
      <Box>
        <Menu isLazy>
          <Box _hover={{ bgColor: 'grey', borderRadius: '20px' }} p={'4px'}>
            <MenuButton>
              <Flex alignItems={'center'}>
                <Image src={imgPro || '/no_profile.png'} alt="" width={'50px'} borderRadius={'100%'} onClick={() => setShow(!show)} cursor={'pointer'} />
                <Box>
                  <Text>{token?.name ||token?.username}</Text>
                  <Text>@{token?.username}</Text>
                </Box>
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem width={'max-content'}>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    localStorage.removeItem('token');
                    alert('berhasil logout');
                    Navigate('/login');
                  }}
                >
                  Logout
                </Button>
              </MenuItem>
            </MenuList>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
