import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../types/storeTypes";
import { initializeAuth } from "../../features/auth/store/authActions";
import LoadingPage from "../../pages/LoadingPage";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, isLoading } = useSelector(
        (state: RootState) => state.auth,
    );

    useEffect(() => {
        dispatch(initializeAuth());
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
