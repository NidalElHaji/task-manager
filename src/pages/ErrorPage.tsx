import { useRouteError } from "react-router-dom";

type RouteError = {
    title?: string;
    message?: string;
};

const ErrorPage = () => {
    const error = useRouteError() as RouteError;

    return (
        <div>
            <h2>{error?.title ?? `An error occurred!`}</h2>
            <p>{error.message ?? `Something went wrong!`}</p>
        </div>
    );
};

export default ErrorPage;
