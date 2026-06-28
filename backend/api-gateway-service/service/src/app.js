import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import env from "./config/env.js";
import {
  authenticateRequest,
  isPublicAuthRoute,
} from "./middlewares/auth.middleware.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: env.clientOrigin,
    credentials: true,
  })
);

app.use(cookieParser());

const stripCorsHeaders = (proxyRes) => {
  delete proxyRes.headers["access-control-allow-origin"];
  delete proxyRes.headers["access-control-allow-credentials"];
  delete proxyRes.headers["access-control-allow-methods"];
  delete proxyRes.headers["access-control-allow-headers"];
  delete proxyRes.headers["access-control-expose-headers"];
};

const createServiceProxy = ({ serviceName, routePrefix, target }) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    proxyTimeout: 10000,
    timeout: 10000,
    pathRewrite: (path) => `${routePrefix}${path}`,
    on: {
      proxyReq: (proxyReq, req) => {
        proxyReq.removeHeader("x-user-id");

        if (req.authenticatedUserId) {
          proxyReq.setHeader("x-user-id", req.authenticatedUserId);
        }
      },
      proxyRes: (proxyRes) => {
        stripCorsHeaders(proxyRes);
      },
      error: (error, req, res) => {
        if (res.headersSent) {
          return;
        }

        res.status(502).json({
          success: false,
          message: `${serviceName} service is unavailable`,
        });
      },
    },
  });

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Gateway is running",
    data: {
      services: {
        auth: env.authServiceUrl,
        palace: env.palaceServiceUrl,
      },
    },
  });
});

app.use(
  "/api/auth",
  authenticateRequest({
    isPublicRoute: isPublicAuthRoute,
  }),
  createServiceProxy({
    serviceName: "Auth",
    routePrefix: "/api/auth",
    target: env.authServiceUrl,
  })
);

app.use(
  "/api/palace",
  authenticateRequest(),
  createServiceProxy({
    serviceName: "Palace",
    routePrefix: "/api/palace",
    target: env.palaceServiceUrl,
  })
);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`API Gateway listening on port ${env.port}`);
});
