import React from 'react'
import axios from 'axios'

const useGetChat = async () => {
  const {data} = await axios.get('http://localhost:3000/chat')
  return data
}

export default useGetChat