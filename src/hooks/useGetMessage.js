import React from 'react'
import axios from 'axios'

const useGetMessage = async () => {
  const {data} = await axios.get('http://localhost:3000/message')
  return data
}

export default useGetMessage