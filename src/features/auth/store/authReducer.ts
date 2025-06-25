import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState, User } from "../types/AuthTypes";
import { authStorageUtils } from "../utils/authStorage";

const initialState: AuthState = {
    user: authStorageUtils.getUser(),
    token: authStorageUtils.getToken(),
    isAuthenticated: !!authStorageUtils.getToken(),
    isLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        loginSuccess: (
            state,
            action: PayloadAction<{
                user: User;
                token: string;
                refreshToken?: string;
            }>,
        ) => {
            const { user, token, refreshToken } = action.payload;

            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.isLoading = false;

            authStorageUtils.setUser(user);
            authStorageUtils.setToken(token);
            if (refreshToken) {
                authStorageUtils.setRefreshToken(refreshToken);
            }
        },
        loginFailure: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.isLoading = false;

            authStorageUtils.clearAll();
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                authStorageUtils.setUser(state.user);
            }
        },
        refreshToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            authStorageUtils.setToken(action.payload);
        },
        checkAuthStatus: (state) => {
            const token = authStorageUtils.getToken();
            const user = authStorageUtils.getUser();

            if (token && user && !authStorageUtils.isTokenExpired(token)) {
                state.user = user;
                state.token = token;
                state.isAuthenticated = true;
            } else {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                authStorageUtils.clearAll();
            }
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
