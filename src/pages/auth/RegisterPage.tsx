import { Card } from "@/components";
import RegistrationForm from "@/features/auth/components/RegistrationForm";

const SignInPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
            <Card className="w-full max-w-md p-6 shadow-xl bg-white rounded-lg">
                <Card.Header>
                    <Card.Title className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Sign up
                    </Card.Title>
                    <Card.Content>
                        <RegistrationForm />
                    </Card.Content>
                </Card.Header>
            </Card>
        </div>
    );
};

export default SignInPage;
