import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import { MainLayout, ProtectedRoute } from "../components";
import ErrorPage from "../pages/ErrorPage";
import TasksPage from "../pages/TasksPage";
import LoginPage from "../pages/LoginPage";
import { tasksLoader } from "../pages/handlers/tasksPage.handler";
import LoadingPage from "../pages/LoadingPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";

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
        <Suspense fallback={<LoadingPage />}>
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default AppRouter;
