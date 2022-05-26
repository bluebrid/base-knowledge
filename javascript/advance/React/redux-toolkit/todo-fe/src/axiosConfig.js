import axios from 'axios';
const BASE_URL = window.BASE_URL || 'http://localhost:8080';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.defaults.baseURL = BASE_URL;
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.common['Accept'] = 'application/json';

export default instance;
