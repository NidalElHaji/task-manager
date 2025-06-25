import { ChangeEvent, FC } from "react";

type InputProps = {
    type: string;
    isInvalid?: boolean;
    id?: string;
    className?: string;
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    "aria-describedby"?: string;
};

const Input: FC<InputProps> = ({ type, isInvalid, ...props }) => {
    return (
        <>
            {type === "textarea" ? (
                <textarea
                    className={`block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring bg-white border-t border-b border-blue-300 focus:ring-blue-400${
                        isInvalid ? "border-red-500" : ""
                    }`}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    className={`block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring bg-white border-t border-b border-blue-300 focus:ring-blue-400 ${
                        isInvalid ? "border-red-500" : ""
                    }`}
                    {...props}
                />
            )}
        </>
    );
};

export default Input;
