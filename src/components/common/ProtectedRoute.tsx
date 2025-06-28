import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "@/types/storeTypes";
import LoadingPage from "@/pages/common/LoadingPage";
import { authActions } from "@/features/auth/store/authSlice";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, isLoading } = useSelector(
        (state: RootState) => state.auth,
    );

    useEffect(() => {
        dispatch(authActions.checkAuthStatus());
    }, [dispatch]);

    if (isLoading) {
        return <LoadingPage />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
