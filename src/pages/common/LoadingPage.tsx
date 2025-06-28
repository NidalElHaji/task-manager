import { Card, LoadSpinner } from "@/components";

interface LoadingPageProps {
    loadText?: string;
}

const LoadingPage = ({ loadText }: LoadingPageProps) => {
    return (
        <div className="flex items-center justify-center bg-blue-50">
            <Card className="w-full max-w-md p-6 shadow-xl bg-white rounded-lg">
                <Card.Header>
                    <Card.Title className="text-3xl font-bold text-center text-gray-800 mb-6">
                        <LoadSpinner />
                    </Card.Title>
                    <Card.Content className=" text-center text-2xl font-semibold text-blue-600 mb-4">
                        <p>{loadText ? loadText : "Loading...."}</p>
                    </Card.Content>
                </Card.Header>
            </Card>
        </div>
    );
};

export default LoadingPage;
