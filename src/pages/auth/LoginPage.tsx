import { Card } from "@/components";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 shadow-xl bg-white rounded-lg">
                <Card.Header>
                    <Card.Title className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Login
                    </Card.Title>
                    <Card.Content>
                        <LoginForm />
                    </Card.Content>
                </Card.Header>
            </Card>
        </div>
    );
};

export default LoginPage;
