import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <motion.button
            type={props.type ?? "button"}
            {...(props as object)}
            className={
                props.className ??
                `px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1`
            }
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500 }}
        >
            {children}
        </motion.button>
    );
};

export default Button;
