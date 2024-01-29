import axios from 'axios';
const URL = 'https://camera-shop.accelerator.htmlacademy.pro';
const TIMEOUT = 5000;

export const createApi = () => {
  const api = axios.create({
    baseURL: URL,
    timeout: TIMEOUT
  });

  return api;
};
