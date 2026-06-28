import env from "../config/env.js";

const baseCookieOptions = {
  httpOnly: true,
  secure: env.cookieSecure,
  sameSite: env.cookieSameSite,
  path: "/",
};

export const authCookieOptions = {
  ...baseCookieOptions,
  maxAge: env.accessTokenMaxAgeMs,
};

export const clearAuthCookieOptions = {
  ...baseCookieOptions,
  maxAge: 0,
};
