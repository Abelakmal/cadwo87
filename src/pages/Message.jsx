import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/Navbar'
import Test from '../components/test'

const Message = () => {
  return (
    <Flex>
        <Navbar />
        <Box>
            <Test />
        </Box>
    </Flex>
  )
}

export default Message