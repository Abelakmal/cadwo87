import axios from 'axios'
import React from 'react'

const useGetTwitById = async(id) => {
  const {data} = await axios.get(`http://localhost:3000/twit/${id}`)
  return data
}

export default useGetTwitById