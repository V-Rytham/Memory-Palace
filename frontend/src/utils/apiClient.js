import axios from "axios";
import {
  clearStoredRefreshToken,
  getStoredRefreshToken,
} from "./refreshToken";

const authApiBaseUrl =
  import.meta.env.VITE_GATEWAY_API_URL ||
  import.meta.env.VITE_AUTH_API_URL ||
  "http://localhost:8003/api";
const palaceApiBaseUrl =
  import.meta.env.VITE_GATEWAY_API_URL ||
  import.meta.env.VITE_PALACE_API_URL ||
  "http://localhost:8003/api";

const authApi = axios.create({
  baseURL: authApiBaseUrl,
  withCredentials: true,
});

const palaceApi = axios.create({
  baseURL: palaceApiBaseUrl,
  withCredentials: true,
});

let refreshRequest = null;

const refreshAccessToken = async () => {
  const refreshToken = getStoredRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  if (!refreshRequest) {
    refreshRequest = authApi
      .post(
        "/auth/refresh",
        { refreshToken },
        { skipAuthRefresh: true }
      )
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
};

const attachRefreshInterceptor = (client, shouldRefresh) => {
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        !error.response ||
        error.response.status !== 401 ||
        originalRequest?._retry ||
        originalRequest?.skipAuthRefresh ||
        !shouldRefresh(originalRequest)
      ) {
        throw error;
      }

      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return client(originalRequest);
      } catch (refreshError) {
        clearStoredRefreshToken();
        throw refreshError;
      }
    }
  );
};

attachRefreshInterceptor(authApi, (request) => request?.requiresAuth === true);
attachRefreshInterceptor(palaceApi, () => true);

export { authApi, palaceApi };
