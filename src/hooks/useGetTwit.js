import axios from 'axios';
import React from 'react'

const useGetTwit = async () => {
    const { data } = await axios.get('http://localhost:3000/twit?_sort=id&_order=desc');

    return data
}

export default useGetTwit