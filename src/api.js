import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

let getAccessToken = () => "";

export function setAccessTokenGetter(fn) {
  getAccessToken = fn;
}

let refreshAccessToken = async () => {};

export function setRefreshAccessToken(fn) {
  refreshAccessToken = fn;
}

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      await refreshAccessToken();
      const newAccessToken = getAccessToken();
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (err) {
      return Promise.reject(err);
    }
  },
);

export default api;
