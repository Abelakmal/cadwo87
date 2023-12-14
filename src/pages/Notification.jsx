import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/Navbar'

const Notification = () => {
  return (
    <Flex >
        <Navbar />
        <Box>
            <Text>Notification</Text>
        </Box>
    </Flex>
  )
}

export default Notification