import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.18.19:3333',
});

export default api;