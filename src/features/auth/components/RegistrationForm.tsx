import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { Button, InputLabel, SentryErrorBoundary } from "@/components";
import { useShakeAnimation } from "@/hooks/useShakeAnimation";
import { AppDispatch } from "@/types/storeTypes";
import { validateEmail } from "@/utils/validation";
import { authActions } from "@/features/auth/store/authSlice";
import { useRegisterMutation } from "@/features/auth/hooks/useAuth";

const RegistrationForm = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const password2Ref = useRef<HTMLInputElement>(null);

    const [invalidFields, setInvalidFields] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { scope, triggerShake } = useShakeAnimation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const registerMutation = useRegisterMutation();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");

        const email = emailRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";
        const password2 = password2Ref.current?.value.trim() || "";

        const invalids = [];
        if (!email || !validateEmail(email)) invalids.push("email");
        if (!password) invalids.push("password");
        if (!password2) invalids.push("password2");
        if (password !== password2) invalids.push("password", "password2");

        if (invalids.length > 0) {
            setInvalidFields(invalids);
            setErrorMessage("Registration failed. Please try again.");
            triggerShake("input");
            return;
        }

        setInvalidFields([]);

        try {
            const response = await registerMutation.mutateAsync({
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
        <>
            {errorMessage && (
                <SentryErrorBoundary>
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errorMessage}
                    </div>
                </SentryErrorBoundary>
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
                        disabled={registerMutation.isPending}
                        autoFocus
                    />
                </div>
                <div className="mb-4">
                    <InputLabel
                        id="password"
                        label="Password"
                        ref={passwordRef}
                        type="password"
                        name="password"
                        isInvalid={invalidFields.includes("password")}
                        disabled={registerMutation.isPending}
                    />
                </div>
                <div className="mb-6">
                    <InputLabel
                        id="password2"
                        label="Repeat Password"
                        ref={password2Ref}
                        type="password"
                        name="password2"
                        isInvalid={invalidFields.includes("password2")}
                        disabled={registerMutation.isPending}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-400 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending ? "Signing up..." : "Sign up"}
                </Button>
                <p className="text-sm text-gray-600 text-center mt-4">
                    Do you have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-400"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </>
    );
};

export default RegistrationForm;
