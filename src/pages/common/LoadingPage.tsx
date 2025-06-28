import { Loading } from "@/components";

const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                    Loading...
                </h2>
                <Loading />
            </div>
        </div>
    );
};

export default LoadingPage;
