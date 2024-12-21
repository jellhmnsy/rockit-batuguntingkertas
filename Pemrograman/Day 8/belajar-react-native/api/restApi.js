import axios from 'axios';

const api = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const fetchPosts = async () => {
  try {
    const response = await api.get('/users');
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch users: ' + error.message);
  }
};

export default api;