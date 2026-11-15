import { consoleLoggingIntegration } from "@sentry/core";
import { captureRouterTransitionStart, init } from "@sentry/nextjs";

// Sentry runs on the production deploy only (../.claude/rules/architecture.md, "Sentry: production only").
const dsn =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_SENTRY_DSN
    : undefined;

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
