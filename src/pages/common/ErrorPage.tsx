import { useNavigate, useRouteError } from "react-router-dom";

type RouteError = {
    title?: string;
    message?: string;
};

const ErrorPage = () => {
    const error = useRouteError() as RouteError;

    const navigate = useNavigate();

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="w-full mt-8 md:p-6 pl-1 p-2 bg-red-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-lg text-red-500 mb-6">{error.message}</p>
            <div className="flex justify-end gap-4 mt-4">
                <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                    Retry
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                >
                    Go Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
