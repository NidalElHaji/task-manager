import { AppDispatch } from "@/types/storeTypes";
import { authStorageUtils } from "@/features/auth/utils/authStorage";
import { LoginCredentials, User } from "@/types/authTypes";
import { authActions } from "@/features/auth/store/authReducer";

export const initializeAuth = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const token = authStorageUtils.getToken();
            const user = authStorageUtils.getUser();

            if (token && user) {
                if (authStorageUtils.isTokenExpired(token)) {
                    const refreshToken = authStorageUtils.getRefreshToken();

                    if (refreshToken) {
                        authStorageUtils.clearAll();
                        dispatch(authActions.logout());
                    } else {
                        authStorageUtils.clearAll();
                        dispatch(authActions.logout());
                    }
                } else {
                    dispatch(authActions.loginSuccess({ user, token }));
                }
            } else {
                dispatch(authActions.logout());
            }
        } catch (error) {
            console.error("Error initializing auth:", error);
            authStorageUtils.clearAll();
            dispatch(authActions.logout());
        }
    };
};

export const loginUser = (credentials: LoginCredentials) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.setLoading(true));

            if (credentials.email && credentials.password) {
                const mockUser: User = {
                    id: "1",
                    email: credentials.email,
                    name: credentials.email.split("@")[0],
                };

                const mockToken = `mock_token_${Date.now()}`;
                const mockRefreshToken = `refresh_token_${Date.now()}`;

                dispatch(
                    authActions.loginSuccess({
                        user: mockUser,
                        token: mockToken,
                        refreshToken: mockRefreshToken,
                    }),
                );

                return { success: true, user: mockUser };
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            dispatch(authActions.loginFailure());
            throw new Error(`Login failed: ${error}`);
        }
    };
};

export const logoutUser = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.logout());
        } catch (error) {
            console.error("Logout error:", error);

            dispatch(authActions.logout());
        }
    };
};

export const updateUserProfile = (updates: Partial<User>) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(authActions.updateUser(updates));
        } catch (error) {
            console.error("Update user profile failed:", error);
            throw new Error(`Update failed: ${error}`);
        }
    };
};

export const refreshAuthToken = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const refreshToken = authStorageUtils.getRefreshToken();

            if (!refreshToken) {
                throw new Error("No refresh token available");
            }

            const newToken = `refreshed_token_${Date.now()}`;

            dispatch(authActions.refreshToken(newToken));

            return newToken;
        } catch (error) {
            console.error("Token refresh failed:", error);
            dispatch(authActions.logout());
            throw error;
        }
    };
};
