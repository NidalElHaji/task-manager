import * as Sentry from "@sentry/react";

const useCaptureSentryException = (
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

export default useCaptureSentryException;
