// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
  // Sentry.init({
  //   dsn: "https://986357c0e2804c57aaa8a30f2d2d1762@o922244.ingest.sentry.io/5869257",
  //   integrations: [new Integrations.BrowserTracing()],
  //   release: "vidly@1.0.0",
  //   // Set tracesSampleRate to 1.0 to capture 100%
  //   // of transactions for performance monitoring.
  //   // We recommend adjusting this value in production
  //   tracesSampleRate: 0.3,
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.log(error);
}

const logger = {
  init,
  log,
};

export default logger;
