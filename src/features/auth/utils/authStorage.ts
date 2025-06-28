import { User } from "@/types/authTypes";
import { captureSentryException } from "@/utils/sentry";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";
const REFRESH_TOKEN_KEY = "refresh_token";

const createStorageErrorContext = (
    operation: string,
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalContext?: Record<string, any>,
) => ({
    operation,
    storageKey: key,
    storageType: "localStorage",
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    ...additionalContext,
});

export const authStorageUtils = {
    getToken: (): string | null => {
        try {
            return localStorage.getItem(AUTH_TOKEN_KEY);
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext("getToken", AUTH_TOKEN_KEY),
            );

            return null;
        }
    },

    setToken: (token: string): void => {
        try {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext("setToken", AUTH_TOKEN_KEY, {
                    tokenLength: token?.length,
                    isTokenValid: typeof token === "string" && token.length > 0,
                }),
            );
            throw error;
        }
    },

    removeToken: (): void => {
        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext("removeToken", AUTH_TOKEN_KEY),
            );

            console.warn("Failed to remove token from localStorage");
        }
    },

    getUser: (): User | null => {
        try {
            const user = localStorage.getItem(AUTH_USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext("getUser", AUTH_USER_KEY, {
                    parseError:
                        error instanceof SyntaxError
                            ? "JSON_PARSE_ERROR"
                            : "STORAGE_ERROR",
                }),
            );

            try {
                localStorage.removeItem(AUTH_USER_KEY);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                // Ignore clear errors
            }
            return null;
        }
    },

    setUser: (user: User): void => {
        try {
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext("setUser", AUTH_USER_KEY, {
                    userId: user?.id,
                    userDataSize: JSON.stringify(user)?.length,
                    hasEmail: Boolean(user?.email),
                }),
            );

            throw error;
        }
    },

    removeUser: (): void => {
        try {
            localStorage.removeItem(AUTH_USER_KEY);
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext("removeUser", AUTH_USER_KEY),
            );

            console.warn("Failed to remove user from localStorage");
        }
    },

    getRefreshToken: (): string | null => {
        try {
            return localStorage.getItem(REFRESH_TOKEN_KEY);
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext("getRefreshToken", REFRESH_TOKEN_KEY),
            );

            return null;
        }
    },

    setRefreshToken: (refreshToken: string): void => {
        try {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext(
                    "setRefreshToken",
                    REFRESH_TOKEN_KEY,
                    {
                        tokenLength: refreshToken?.length,
                    },
                ),
            );

            console.warn("Failed to store refresh token");
        }
    },

    removeRefreshToken: (): void => {
        try {
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext(
                    "removeRefreshToken",
                    REFRESH_TOKEN_KEY,
                ),
            );

            console.warn("Failed to remove refresh token from localStorage");
        }
    },

    clearAll: (): void => {
        const errors: Error[] = [];

        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        } catch (error) {
            errors.push(error as Error);
        }

        try {
            localStorage.removeItem(AUTH_USER_KEY);
        } catch (error) {
            errors.push(error as Error);
        }

        try {
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        } catch (error) {
            errors.push(error as Error);
        }

        if (errors.length > 0) {
            captureSentryException(
                new Error("Failed to clear auth storage"),
                createStorageErrorContext("clearAll", "multiple_keys", {
                    failedOperations: errors.length,
                    errors: errors.map((e) => e.message),
                }),
            );

            console.warn("Some auth storage items failed to clear");
        }
    },

    isTokenExpired: (token: string): boolean => {
        try {
            if (!token || typeof token !== "string") {
                return true;
            }

            const parts = token.split(".");
            if (parts.length !== 3) {
                return true;
            }

            const payload = JSON.parse(atob(parts[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            captureSentryException(
                error as Error,
                createStorageErrorContext(
                    "isTokenExpired",
                    "token_validation",
                    {
                        tokenFormat: token ? "present" : "missing",
                        tokenParts: token?.split?.(".")?.length || 0,
                        errorType:
                            error instanceof SyntaxError
                                ? "JSON_PARSE_ERROR"
                                : "TOKEN_DECODE_ERROR",
                    },
                ),
            );

            return true;
        }
    },
};
