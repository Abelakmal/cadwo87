import { Box, Button, Card, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useGetUser from '../hooks/useGetUser';
import { useFormik } from 'formik';

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const Navigate = useNavigate();

  const tokenUser = localStorage.getItem('token');

  useEffect(() => {
    if (tokenUser) {
      Navigate('/');
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      user: '',
      password: '',
    },
    onSubmit: async(values, { resetForm }) => {
      const userData = await useGetUser();
      let isCan = false;
      userData.forEach((item) => {
        if (values.user === item.username || (values.user === item.email && values.password === item.password)) {
          localStorage.setItem('token',JSON.stringify({id : item.id, username: item.username}));
          Navigate('/');
          isCan = true;
        }
      });
      if (!isCan) {
        alert('wrong credential');
        resetForm();
      }
    },
  });

  return (
    <>
      {tokenUser ? (
        <div></div>
      ) : (
        <Flex justifyContent={'center'} alignItems={'center'} h={'100vh'} w={'100vw'}>
          <Card boxShadow={'2xl'} p={'80px'} width={'max-content'}>
            <Heading my={'12px'}>Sign in</Heading>
            <Text my={'12px'}>
              Not have account ?{' '}
              <ChakraLink as={ReactRouterLink} to={'/register'} color={'orange'}>
                Register now
              </ChakraLink>
            </Text>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Username / Email</FormLabel>
                <Input type="text" border={'solid'} name="user" value={formik.values.user} onChange={formik.handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel mt={'20px'}>Password</FormLabel>
                <InputGroup size="md" mb={'30px'}>
                  <Input pr="4.5rem" type={show ? 'text' : 'password'} name="password" value={formik.values.password} onChange={formik.handleChange} border={'solid'} placeholder="Enter password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button type="submit" w={'100%'} colorScheme="orange">
                Login
              </Button>
            </form>
          </Card>
        </Flex>
      )}
    </>
  );
};

export default Login;
