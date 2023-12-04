import axios from 'axios'


const useGetUserComment = async () => {
  const {data} = await axios.get('http://localhost:3000/comment')
  return data;
}

export default useGetUserComment