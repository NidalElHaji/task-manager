import { User } from "@/types/authTypes";
import { throwError } from "@/utils/utils";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";
const REFRESH_TOKEN_KEY = "refresh_token";

export const authStorageUtils = {
    getToken: (): string | null => {
        try {
            return localStorage.getItem(AUTH_TOKEN_KEY);
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    setToken: (token: string): void => {
        try {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    removeToken: (): void => {
        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    getUser: (): User | null => {
        try {
            const user = localStorage.getItem(AUTH_USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    setUser: (user: User): void => {
        try {
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    removeUser: (): void => {
        try {
            localStorage.removeItem(AUTH_USER_KEY);
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    getRefreshToken: (): string | null => {
        try {
            return localStorage.getItem(REFRESH_TOKEN_KEY);
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    setRefreshToken: (refreshToken: string): void => {
        try {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    removeRefreshToken: (): void => {
        try {
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    clearAll: (): void => {
        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(AUTH_USER_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        } catch (error) {
            throw throwError(error as Error);
        }
    },

    isTokenExpired: (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            throw throwError(error as Error);
        }
    },
};
