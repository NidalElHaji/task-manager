import * as Sentry from "@sentry/react";

export const captureSentryException = (
    error: Error,
    context?: Record<string, unknown>,
) => {
    Sentry.withScope((scope) => {
        if (context) {
            scope.setContext("additional_info", context);
        }
        Sentry.captureException(error);
    });
};
