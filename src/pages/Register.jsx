import { Button, Card, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import  { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useGetUser from '../hooks/useGetUser';

const Register = () => {

  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errorRegis, setErrorRegis] = useState("")
  const handleClick = () => setShow(!show);

  const tokenUser = localStorage.getItem('token');

  useEffect(() => {
    if (tokenUser) {
      Navigate('/');
    }
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    email: Yup.string().email('Please enter a valid email').required('This field is required'),
    password: Yup.string()
      .required('This field is required')
      .min(8, 'Pasword must be 8 or more characters')
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, 'Password ahould contain at least one uppercase and lowercase character')
      .matches(/\d/, 'Password should contain at least one number'),
    confrimPassword: Yup.string().when('password', (password, field) => {
      if (password) {
        return field.required('The passwords do not match').oneOf([Yup.ref('password')], 'The passwords do not match');
      }
    }),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confrimPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const userData = await useGetUser();
      let existUsername = userData.find((item) => item.username === values.username);
      let existEmail = userData.find((item) => item.email === values.email);
      console.log(existUsername);
      console.log(existEmail);
      if(existEmail || existEmail){
        setErrorRegis('Email / Username sudah ada')
      }else{
      await axios.post('http://localhost:3000/user', {
        id: values.username,
        username: values.username,
        email: values.email,
        password: values.password,
        image: '',
      });
      localStorage.setItem('token', JSON.stringify({ id: values.username, username: values.username }));
      Navigate('/');
      alert('sukses');
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
          <Card boxShadow={'2xl'} p={'60px'} width={'max-content'}>
            <Heading my={'12px'}>Welcome To SOSMED</Heading>
            <Text my={'12px'}>
              Already have a account ?{' '}
              <ChakraLink as={ReactRouterLink} to={'/login'} color={'orange'}>
                Login
              </ChakraLink>
            </Text>
            <form onSubmit={formik.handleSubmit}>
              <Text color={'red'}>{errorRegis}</Text>
              <FormControl isInvalid={Boolean(formik.errors.username && formik.touched.username)}>
                <FormLabel>Username</FormLabel>
                <Input type="text" name="username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} border={'solid'} />
                <FormHelperText color={'red'} mb={'2px'}>
                  {formik.errors.username}
                </FormHelperText>
              </FormControl>
              <FormControl isInvalid={Boolean(formik.errors.email && formik.touched.email)}>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} border={'solid'} />
                <FormErrorMessage color={'red'} mb={'2px'}>
                  {formik.errors.email}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(formik.errors.password && formik.touched.password)}>
                <FormLabel mt={'20px'}>Password</FormLabel>
                <InputGroup size="md">
                  <Input pr="4.5rem" type={show ? 'text' : 'password'} name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} border={'solid'} placeholder="Enter password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage color={'red'} mb={'30px'}>
                  {formik.errors.password}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(formik.errors.confrimPassword && formik.touched.confrimPassword)}>
                <FormLabel mt={'20px'}>Confrim Password</FormLabel>
                <InputGroup size="md">
                  <Input pr="4.5rem" type={show ? 'text' : 'password'} name="confrimPassword" onBlur={formik.handleBlur} value={formik.values.confrimPassword} onChange={formik.handleChange} border={'solid'} placeholder="Enter password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage color={'red'} mb={'30px'}>
                  {formik.errors.confrimPassword}
                </FormErrorMessage>
              </FormControl>

              <Button type="submit" w={'100%'} colorScheme="orange">
                Register
              </Button>
            </form>
          </Card>
        </Flex>
      )}
    </>
  );
};

export default Register;
