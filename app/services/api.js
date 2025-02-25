import axios from "axios";
import { parseCookies } from "nookies";

const { token } =  parseCookies();

export const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})

api.interceptors.request.use(config => {
    // console.log('---- Interceptor log -----')
    // console.log(config);
})

if ( token ) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}