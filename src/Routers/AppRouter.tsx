import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";

import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import TasksPage from "../pages/TasksPage";
import { tasksLoader } from "../pages/handlers/tasksPage.handler";
import LoadingPage from "../pages/LoadingPage";
import RecruitersHomePage from "../pages/RecruitersHomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <RecruitersHomePage /> },
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
