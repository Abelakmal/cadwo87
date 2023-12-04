import axios from 'axios'
import React from 'react'

const useGetUserById = async(id) => {
  const {data} = await axios.get(`http://localhost:3000/user/${id}`)
  return data
}

export default useGetUserById