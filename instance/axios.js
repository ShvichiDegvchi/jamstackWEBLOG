import Axios from 'axios';

const api = Axios.create({
  baseURL: `https://${process.env.SERVICE_ID}.microcms.io/api/v1/`,
  headers: {
    'X-API-KEY': process.env.API_KEY
  },
  retry: {
    retries: 3
  },
});

export default api;
