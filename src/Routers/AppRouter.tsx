import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPage from "../pages/DashboardPage";
import TasksPage from "../pages/TasksPage";
import { tasksLoader } from "../pages/handlers/tasksPage.handler";
import LoadingPage from "../pages/LoadingPage";
const AppRouter = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <DashboardPage /> },
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

    return <RouterProvider router={router} />;
};

export default AppRouter;
