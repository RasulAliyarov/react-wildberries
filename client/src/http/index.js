import axios from "axios"

export const API_URL = 'https://react-wildberries.onrender.com/api';

const _api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

_api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token") ?? localStorage.getItem("admintoken") }`;
    return config;
})

_api.interceptors.response.use((config) => { return config }, async error => {
    const originlRequest = error.config;
    if (error.response.status === 401) {
        try{

            await axios.get(`${API_URL}/refresh`, { withCredentials: true }).then(resp=>{
                localStorage.setItem('token', resp.data.accessToken);
                return _api.request(originlRequest)
            })
        }
        catch(e){
            console.log("Не авторизован")
        }
    }
})

export default _api