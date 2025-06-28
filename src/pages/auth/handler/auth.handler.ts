import { LoaderFunction, redirect } from "react-router-dom";
import store from "@/store";
import { authActions } from "@/features/auth/store/authSlice";

export const authLoader: LoaderFunction = async () => {
    store.dispatch(authActions.checkAuthStatus());

    const authState = store.getState().auth;

    if (!authState.isAuthenticated || !authState.user) {
        throw redirect("/login");
    }

    return { user: authState.user, token: authState.token };
};
