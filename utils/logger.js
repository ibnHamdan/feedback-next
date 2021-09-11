import pino from "pino";
import { logflarePinoVercel } from "pino-logflare";

const { stream, send } = logflarePinoVercel({
  apiKey: process.env.NEXT_PUBLIC_LOGFLARE_KEY,
  sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_SOURCE_TOKEN,
});

const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
    level: "debug",
    base: {
      env: process.env.ENV || "ENV not set",
      revision: process.env.VERCEL_GITHUB_COMMIT_SAH,
    },
  },
  stream
);

const formatObjectKeys = (headers) => {
  const keyValues = {};
  Object.keys(headers).map((key) => {
    const newKey = key.replace(/-/g, "_");
    keyValues[newKey] = headers[key];
  });

  return keyValues;
};

export { formatObjectKeys, logger };
