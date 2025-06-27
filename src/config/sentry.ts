import * as Sentry from "@sentry/react";

export const initializeSentry = () => {
    Sentry.init({
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: "development", // later to be configured through import.meta.env.MODE and CI/CD
        // Setting this option to true will send default PII data to Sentry.
        // For example, automatic IP address collection on events
        sendDefaultPii: true,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
        ],
        // Tracing
        tracesSampleRate: import.meta.env.MODE === "development" ? 1.0 : 0.1, // Lower in production
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ["localhost"],
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
        // Additional useful options
        beforeSend(event) {
            // Filter out development errors or sensitive data
            if (import.meta.env.MODE === "development") {
                console.log("Sentry Event:", event);
            }
            return event;
        },
        // Set user context for better debugging
        initialScope: {
            tags: {
                component: "task-management-app",
            },
        },
    });
};
