import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function setAuthorization(value) {
  api.defaults.headers.common.Authorization = `Bearer ${value}`;
}

export default api;
