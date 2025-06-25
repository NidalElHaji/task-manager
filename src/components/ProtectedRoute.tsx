import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../types";
import { initializeAuth } from "../features/auth/store/authActions";
import { AppDispatch } from "../types";
import LoadingPage from "../pages/LoadingPage";

interface ProtectedRouteProps {
    children: React.ReactNode;
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
