import { User } from "../../../types/authTypes";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";
const REFRESH_TOKEN_KEY = "refresh_token";

export const authStorageUtils = {
    getToken: (): string | null => {
        try {
            return localStorage.getItem(AUTH_TOKEN_KEY);
        } catch (error) {
            console.error("Error reading token from localStorage:", error);
            return null;
        }
    },

    setToken: (token: string): void => {
        try {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
        } catch (error) {
            console.error("Error saving token to localStorage:", error);
        }
    },

    removeToken: (): void => {
        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        } catch (error) {
            console.error("Error removing token from localStorage:", error);
        }
    },

    getUser: (): User | null => {
        try {
            const user = localStorage.getItem(AUTH_USER_KEY);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Error reading user from localStorage:", error);
            return null;
        }
    },

    setUser: (user: User): void => {
        try {
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error("Error saving user to localStorage:", error);
        }
    },

    removeUser: (): void => {
        try {
            localStorage.removeItem(AUTH_USER_KEY);
        } catch (error) {
            console.error("Error removing user from localStorage:", error);
        }
    },

    getRefreshToken: (): string | null => {
        try {
            return localStorage.getItem(REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error(
                "Error reading refresh token from localStorage:",
                error,
            );
            return null;
        }
    },

    setRefreshToken: (refreshToken: string): void => {
        try {
            localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        } catch (error) {
            console.error("Error saving refresh token to localStorage:", error);
        }
    },

    removeRefreshToken: (): void => {
        try {
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error(
                "Error removing refresh token from localStorage:",
                error,
            );
        }
    },

    clearAll: (): void => {
        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(AUTH_USER_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
        } catch (error) {
            console.error("Error clearing auth data from localStorage:", error);
        }
    },

    isTokenExpired: (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            console.error("Error checking token expiration:", error);
            return true;
        }
    },
};
