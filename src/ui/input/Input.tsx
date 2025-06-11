import { FC } from "react";

type InputProps = {
    type: string;
    isInvalid: boolean;
};

const Input: FC<InputProps> = ({ type, isInvalid, ...props }) => {
    return (
        <>
            {type === "textarea" ? (
                <textarea
                    className={`flex-1 px-4 py-2 text-sm text-gray-700 bg-white border-t border-b border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
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
