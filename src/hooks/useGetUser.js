import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useGetUser = async () => {
  const { data } = await axios.get('http://localhost:3000/user');

  return data;
};

export default useGetUser;
