import { consoleLoggingIntegration } from "@sentry/core";
import * as Sentry from "@sentry/nextjs";

// Sentry runs on the production deploy only (../.claude/rules/architecture.md, "Sentry: production only").
const dsn =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? process.env.NEXT_PUBLIC_SENTRY_DSN
    : undefined;

if (dsn) {
  Sentry.init({
    dsn,
    integrations: [consoleLoggingIntegration()],
    tracesSampleRate: 1,
    debug: false,
  });
}
