const REFRESH_TOKEN_KEY = "memory-palace-refresh-token";

export const getStoredRefreshToken = () =>
  window.localStorage.getItem(REFRESH_TOKEN_KEY);

export const setStoredRefreshToken = (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearStoredRefreshToken = () => {
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};
