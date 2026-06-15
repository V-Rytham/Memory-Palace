import env from "../config/env.js";

const baseCookieOptions = {
  httpOnly: true,
  secure: env.cookieSecure,
  sameSite: env.cookieSameSite,
  path: "/",
};

export const authCookieOptions = {
  ...baseCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const clearAuthCookieOptions = {
  ...baseCookieOptions,
  maxAge: 0,
};
