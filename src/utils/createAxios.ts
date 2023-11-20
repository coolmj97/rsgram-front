import axios from 'axios';

const createAxios = () => {
  return axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
  });
};

export default createAxios;
