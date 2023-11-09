import axios from "axios";
import {Cookies} from "react-cookie";
import {MAIN_SECRET_NAME} from "../Constants/token/index";
import CryptoJS from "crypto-js"

const instance = axios.create({
    baseURL: `https://0001.uz/`,
});

instance.interceptors.request.use(
    async (config: any) => {
        const cookies = new Cookies();
        if (config.url.includes('/signup')) {
            const {key, secret} = config.data
            config.headers['key'] = key;
            config.headers['secret'] = secret;
            cookies.set('key', key);
            cookies.set('secret', secret);
        } else {
            const bodySide = config?.data ? JSON.stringify(config.data) : "";
            const method = config.method.toUpperCase();
            const url = config.url;
            const cookieSecret = cookies.get(MAIN_SECRET_NAME);
            const signStr = method + url + bodySide + cookieSecret;
            const sign = CryptoJS.MD5(signStr).toString();

            config.meta = config.meta || {};
            config.meta.requestStartedAt = new Date().getTime();
            config.headers = {
                "Content-Type": "application/json",
                Key: cookies.get('key'),
                sign,
                ...config.headers,
                timeout: 10000,

            };
        }
        return config;
    },
    (error) => Promise.reject(error.response)
);

instance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error) => {
        const cookie = new Cookies();

        if (error.response?.status === 401) {
            console.log("logged out");
            try {
                cookie.remove(MAIN_SECRET_NAME);
                window.location.href = '/login';
            } catch (e) {
                console.log(e);
            }
        }
        return Promise.reject(error.response);
    }
);

export default instance;