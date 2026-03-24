import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7f3938ab26e510808e8182f3aa25c0c7@o4506349855244288.ingest.us.sentry.io/4507005056581632",

  // Adds request headers and IP for users
  sendDefaultPii: true,

  // Capture 100% in dev, 10% in production
  // Adjust based on your traffic volume
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  // Enable logs to be sent to Sentry
  enableLogs: true,
});