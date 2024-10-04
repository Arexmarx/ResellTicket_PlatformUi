import axios from 'axios'
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';


const BASE_API = "http://localhost:8090"
const REFRESH_TOKEN_API = BASE_API + "/api/users/refresh-token"
const AUTH_TOKENS_KEY = 'authTokens'

let authTokens = localStorage.getItem(AUTH_TOKENS_KEY) ? JSON.parse(localStorage.getItem(AUTH_TOKENS_KEY)) : null;

const AxiosInstance = axios.create({
    baseURL: BASE_API,
    headers: {
        Authorization: `Bearer ${authTokens?.access_token}`
    }
})

AxiosInstance.interceptors.request.use(async req => {
    console.log('interceptor')

    if (!authTokens) {
        authTokens = localStorage.getItem(AUTH_TOKENS_KEY) ? JSON.parse(localStorage.getItem(AUTH_TOKENS_KEY)) : null;
        req.headers.Authorization = `Bearer ${authTokens?.access_token}`
    }

    const user = jwtDecode(authTokens?.access_token || '{}');
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req; // if access token is not expired, the request will continue

    const response = await axios.post(REFRESH_TOKEN_API, {}, {
        params: {
            refreshToken: authTokens.refresh_token
        }
    });
    //console.log(response);

    localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(response.data.object));
    req.headers.Authorization = `Bearer ${response.data.object.access_token}`;

    return req
},

    function (error) {
        return Promise.reject(error);
    }
);

export default AxiosInstance;