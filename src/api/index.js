import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace this with your backend server URL
});

export default api;