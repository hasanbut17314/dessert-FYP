import axios from 'axios';
import { baseURL } from './utils';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 12000,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const tokenService = {
    getAccessToken: () => {
        return localStorage.getItem('accessToken');
    },
    getRefreshToken: () => {
        return localStorage.getItem('refreshToken');
    },
    setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    },
    clearTokens: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
};

const skipAuthUrls = [
    '/user/login',
    '/user/register',
    'user/verify-email',
];
api.interceptors.request.use(
    (config) => {
        if (skipAuthUrls.some(url => config.url.includes(url))) {
            return config;
        }

        if (config.withAuth !== false) {
            const token = tokenService.getAccessToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
                .catch(err => Promise.reject(err));
        }

        if (error.response?.data?.message === 'Unauthorized request' || error.response?.data?.message === 'Invalid Access Token') {

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = tokenService.getRefreshToken();

                if (!refreshToken) {
                    tokenService.clearTokens();
                    window.location.href = '/login';
                    throw new Error('No refresh token available');
                }

                const response = await axios.post(
                    `${api.defaults.baseURL}/user/recreateAccessToken`,
                    { refreshToken },
                    {
                        withCredentials: true,
                        withAuth: true
                    }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                tokenService.setTokens(accessToken, newRefreshToken);

                api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                processQueue(null, accessToken);

                return api(originalRequest);
            } catch (err) {
                tokenService.clearTokens();

                processQueue(err, null);
                window.location.href = '/login';

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

const apiRequest = ({
    method = 'get',
    url,
    data = null,
    params = null,
    withAuth = true,
    headers = {},
    signal = null,
    ...rest
}) => {
    return api({
        method,
        url,
        data,
        params,
        withAuth,
        headers,
        signal,
        ...rest
    });
};

const apiService = {
    get: (url, options = {}) =>
        apiRequest({ method: 'get', url, ...options }),

    post: (url, data, options = {}) =>
        apiRequest({ method: 'post', url, data, ...options }),

    put: (url, data, options = {}) =>
        apiRequest({ method: 'put', url, data, ...options }),

    patch: (url, data, options = {}) =>
        apiRequest({ method: 'patch', url, data, ...options }),

    delete: (url, options = {}) =>
        apiRequest({ method: 'delete', url, ...options }),

    upload: (url, formData, onUploadProgress, options = {}) => {
        const { method = 'post', ...restOptions } = options;

        return apiRequest({
            method,
            url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress,
            ...restOptions
        });
    }
};

export { apiService, tokenService };