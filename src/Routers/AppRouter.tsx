import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import DashboardPage from "../pages/DashboardPage";
import TasksPage from "../pages/TasksPage";
import { tasksLoader } from "../pages/handlers/tasksPage.handler";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: "tasks", element: <TasksPage />, loader: tasksLoader },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
