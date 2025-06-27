import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { validateEmail } from "../utils/validation";
import { useLoginMutation } from "../features/auth/hooks/useAuth";
import { authActions } from "../features/auth/store/authReducer";
import { AppDispatch } from "../types/storeTypes";
import { useShakeAnimation } from "../hooks/useShakeAnimation";
import Card from "../components/ui/Card";
import InputLabel from "../components/ui/input/InputLabel";
import Button from "../components/ui/buttons/Button";

const LoginPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [invalidFields, setInvalidFields] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { scope, triggerShake } = useShakeAnimation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const loginMutation = useLoginMutation();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        const email = emailRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";

        const invalids = [];
        if (!email || !validateEmail(email)) invalids.push("email");
        if (!password) invalids.push("password");

        if (invalids.length > 0) {
            setInvalidFields(invalids);
            triggerShake("input");
            return;
        }

        setInvalidFields([]);

        try {
            const response = await loginMutation.mutateAsync({
                email,
                password,
            });

            dispatch(authActions.loginSuccess(response));

            navigate("/");
        } catch (error) {
            console.error("Error with the login", error);

            setErrorMessage("Invalid email or password. Please try again.");
            triggerShake("input");
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 shadow-xl bg-white rounded-lg">
                <Card.Header>
                    <Card.Title className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Login
                    </Card.Title>
                    <Card.Content>
                        {errorMessage && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} ref={scope}>
                            <div className="mb-4">
                                <InputLabel
                                    id="email"
                                    label="Email"
                                    ref={emailRef}
                                    type="email"
                                    name="email"
                                    isInvalid={invalidFields.includes("email")}
                                    disabled={loginMutation.isPending}
                                    autoFocus
                                />
                            </div>
                            <div className="mb-6">
                                <InputLabel
                                    id="password"
                                    label="Password"
                                    ref={passwordRef}
                                    type="password"
                                    name="password"
                                    isInvalid={invalidFields.includes(
                                        "password",
                                    )}
                                    disabled={loginMutation.isPending}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-400 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending
                                    ? "Logging in..."
                                    : "Log In"}
                            </Button>
                            <p className="text-sm text-gray-600 text-center mt-4">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-600 hover:text-blue-400"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </Card.Content>
                </Card.Header>
            </Card>
        </div>
    );
};

export default LoginPage;
