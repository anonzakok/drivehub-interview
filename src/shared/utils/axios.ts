import axios from 'axios';

export default axios.create({
  baseURL: 'https://cdn.contentful.com',
  timeout: 40000,
  headers: {
    'Content-Type': 'application/json;utf-8',
  },
});
