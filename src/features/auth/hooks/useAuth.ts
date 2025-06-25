import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../../config/firebase";
import { LoginCredentials, User } from "../types/AuthTypes";
import { authStorageUtils } from "../utils/authStorage";
const transformFirebaseUser = (firebaseUser: FirebaseUser): User => {
    return {
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name:
            firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "",
    };
};

export const useLoginMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<
        { user: User; token: string; refreshToken?: string },
        Error,
        LoginCredentials
    >({
        mutationFn: async (credentials: LoginCredentials) => {
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    credentials.email,
                    credentials.password,
                );

                const token = await userCredential.user.getIdToken();

                authStorageUtils.setToken(token);

                return {
                    user: transformFirebaseUser(userCredential.user),
                    token: token,
                    refreshToken: userCredential.user.refreshToken,
                };
            } catch (error) {
                console.error("Login failed:", error);
                throw new Error("Login failed");
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.user);
            authStorageUtils.setUser(data.user);
        },
        onError: (error) => {
            console.error("Login failed:", error);
            authStorageUtils.clearAll();
        },
    });
};

export const useLogoutMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Logout failed:", error);
                throw error;
            }
        },
        onSettled: () => {
            queryClient.clear();
            authStorageUtils.clearAll();
        },
    });
};

export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<
        { user: User; token: string; refreshToken?: string },
        Error,
        LoginCredentials & { name?: string }
    >({
        mutationFn: async (userData) => {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    userData.email,
                    userData.password,
                );

                if (userData.name) {
                    await updateProfile(userCredential.user, {
                        displayName: userData.name,
                    });
                }

                const token = await userCredential.user.getIdToken();
                authStorageUtils.setToken(token);

                return {
                    user: transformFirebaseUser(userCredential.user),
                    token: token,
                    refreshToken: userCredential.user.refreshToken,
                };
            } catch (error) {
                console.error("Registration failed:", error);
                throw new Error("Registration failed");
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.user);
            authStorageUtils.setUser(data.user);
        },
        onError: (error) => {
            console.error("Registration failed:", error);
        },
    });
};

export const useUserQuery = () => {
    return useQuery<User | null>({
        queryKey: ["user"],
        queryFn: () => {
            return new Promise<User | null>((resolve) => {
                const unsubscribe = onAuthStateChanged(
                    auth,
                    async (firebaseUser) => {
                        unsubscribe();

                        if (firebaseUser) {
                            try {
                                const token = await firebaseUser.getIdToken();
                                authStorageUtils.setToken(token);

                                const user =
                                    transformFirebaseUser(firebaseUser);
                                authStorageUtils.setUser(user);
                                resolve(user);
                            } catch (error) {
                                console.error(
                                    "Error getting user token:",
                                    error,
                                );
                                authStorageUtils.clearAll();
                                resolve(null);
                            }
                        } else {
                            authStorageUtils.clearAll();
                            resolve(null);
                        }
                    },
                );
            });
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: false,
    });
};

export const useRefreshTokenMutation = () => {
    return useMutation<string, Error>({
        mutationFn: async () => {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                throw new Error("No authenticated user");
            }

            try {
                const token = await currentUser.getIdToken(true);
                authStorageUtils.setToken(token);
                return token;
            } catch (error) {
                authStorageUtils.clearAll();
                throw error;
            }
        },
        onError: (error) => {
            console.error("Token refresh failed:", error);
            authStorageUtils.clearAll();
        },
    });
};

export const useAuthStateListener = () => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["auth-state-listener"],
        queryFn: () => {
            return new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(
                    auth,
                    async (firebaseUser) => {
                        if (firebaseUser) {
                            try {
                                const token = await firebaseUser.getIdToken();
                                authStorageUtils.setToken(token);

                                const user =
                                    transformFirebaseUser(firebaseUser);
                                authStorageUtils.setUser(user);
                                queryClient.setQueryData(["user"], user);
                            } catch (error) {
                                console.error(
                                    "Error in auth state listener:",
                                    error,
                                );
                                authStorageUtils.clearAll();
                                queryClient.setQueryData(["user"], null);
                            }
                        } else {
                            authStorageUtils.clearAll();
                            queryClient.setQueryData(["user"], null);
                        }
                    },
                );

                resolve(unsubscribe);
            });
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
};
