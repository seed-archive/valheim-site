import { consoleLoggingIntegration } from "@sentry/core";
import { captureRouterTransitionStart, init } from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

// No forms or sign-in yet, so no replay or feedback button (monitoring.md: a game with them adds both).
if (dsn) {
  init({
    dsn,
    integrations: [consoleLoggingIntegration()],
    tracesSampleRate: 1,
    debug: false,
  });
}

export const onRouterTransitionStart = captureRouterTransitionStart;
