import { Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const InputEditProfile = ({ showEditProfile, id, dataUser, getData ,twit}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  console.log(twit);

  useEffect(() => {
    showEditProfile(onOpen);
  }, []);

  const isImgUrl = (value) => {
    if (!value) {
      return true;
    }
    const allowwedFormats = ['jpeg', 'jpg', 'png'];
    // https://png.pngtree.com/png-vector/20230531/ourlarge/pngtree-cute-ghost-drawing-on-white-background-vector-png-image_6788597.png

    const fileExtension = value.split('.').pop().toLowerCase();
    return allowwedFormats.includes(fileExtension);
  };

  const validationSchema = Yup.object().shape({
    image: Yup.string().test('isImageUrl', 'only Support jpeg,jpg,png', isImgUrl).url('Invalid url'),
  });

  const formik = useFormik({
    initialValues: {
      image: dataUser?.image,
      name: dataUser?.name,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await axios.patch(`http://localhost:3000/user/${id}`, {
        ...dataUser,
        image: values.image,
        name: values.name,
      });
      twit.forEach( async(item) =>{
          await axios.patch(`http://localhost:3000/twit/${item.id}`,{
              ...item,
              user: {
                  ...item.user,
                  image: values.image,
                  name: values.name
              }, 
              respone: {
                ...item.respone,
                comment: [
                      
                ]
              }
            })
      })
      const temp = JSON.parse(localStorage.getItem('token'))
      localStorage.setItem('token',JSON.stringify({...temp,name : values.name}))
      resetForm();
      getData();
    },
  });

  return (
    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Your Account</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody pb={6}>
            <FormControl isInvalid={Boolean(formik.errors.image && formik.touched.image)}>
              <FormLabel>Image</FormLabel>
              <Input ref={initialRef} placeholder="Masukan Link Image" onBlur={formik.handleBlur} name="image" value={formik.values.image} type="link" onChange={formik.handleChange} />
              <FormHelperText color={'red'} mb={'2px'}>
                {formik.errors.image}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={initialRef} name="name" value={formik.values.name} placeholder="Name" type="text" onChange={formik.handleChange} />
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
  );
};

export default InputEditProfile;
