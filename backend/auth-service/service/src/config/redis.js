import { createClient } from "redis";
import env from "./env.js";

const redisClient = createClient({
  socket: {
    host: env.redisHost,
    port: env.redisPort,
  },
  password: env.redisPassword,
});

redisClient.on("error", (error) => {
  console.error("Redis error:", error.message);
});

const fallbackStore = new Map();
let redisAvailable = false;

const now = () => Date.now();

const pruneExpiredEntry = (key, record) => {
  if (record?.expiresAt && record.expiresAt <= now()) {
    fallbackStore.delete(key);
    return true;
  }

  return false;
};

const fallbackRedis = {
  isOpen: false,
  async set(key, value, options = {}) {
    const expiresAt =
      typeof options.EX === "number" ? now() + options.EX * 1000 : null;
    fallbackStore.set(key, { value, expiresAt });
  },
  async get(key) {
    const record = fallbackStore.get(key);

    if (!record) {
      return null;
    }

    if (pruneExpiredEntry(key, record)) {
      return null;
    }

    return record.value;
  },
  async del(key) {
    fallbackStore.delete(key);
  },
};

const getActiveRedisClient = () =>
  redisAvailable && redisClient.isOpen ? redisClient : fallbackRedis;

export const connectRedis = async () => {
  if (redisClient.isOpen) {
    redisAvailable = true;
    return redisClient;
  }

  try {
    const connectPromise = redisClient.connect();
    connectPromise.catch((error) => {
      console.warn(`Redis connection attempt failed: ${error.message}`);
    });

    await Promise.race([
      connectPromise,
      new Promise((resolve) => setTimeout(resolve, 1500)),
    ]);

    if (!redisClient.isOpen) {
      throw new Error("Redis connection timed out");
    }

    redisAvailable = true;
    console.log(`Redis connected: ${env.redisHost}:${env.redisPort}`);
    return redisClient;
  } catch (error) {
    redisAvailable = false;
    console.warn(
      `Redis unavailable, using in-memory fallback: ${error.message}`
    );
    return fallbackRedis;
  }
};

export default new Proxy(redisClient, {
  get(target, property) {
    if (property === "isOpen") {
      return redisAvailable && target.isOpen;
    }

    const activeClient = getActiveRedisClient();
    const value = activeClient[property];
    return typeof value === "function" ? value.bind(activeClient) : value;
  },
});
