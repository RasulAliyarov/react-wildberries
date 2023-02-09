import axios from "axios"

export const API_URL = 'http://localhost:8080/api';

const _api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

_api.interceptors.request.use((config)=>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
})

export default _api