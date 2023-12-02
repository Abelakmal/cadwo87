import axios from 'axios'
import React from 'react'

const useTest = async () => { 
    const {data} = await axios.get('http://localhost:3000/user')
    return data
}

export default useTest