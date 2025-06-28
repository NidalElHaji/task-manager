import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import { MainLayout, ProtectedRoute, SentryErrorBoundary } from "@/components";
import ErrorPage from "@/pages/common/ErrorPage";
import TasksPage from "@/pages/tasks/TasksPage";
import LoginPage from "@/pages/auth/LoginPage";
import { tasksLoader } from "@/pages/tasks/handlers/tasksPage.handler";
import LoadingPage from "@/pages/common/LoadingPage";
import HomePage from "@/pages/common/HomePage";
import RegisterPage from "@/pages/auth/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "tasks",
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <TasksPage />
                    </Suspense>
                ),
                loader: tasksLoader,
                errorElement: <ErrorPage />,
            },
        ],
    },
]);

const AppRouter = () => {
    return (
        <SentryErrorBoundary>
            <Suspense fallback={<LoadingPage />}>
                <RouterProvider router={router} />
            </Suspense>
        </SentryErrorBoundary>
    );
};

export default AppRouter;
