import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

const Badge: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <motion.span
            className="ml-2 px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-xs font-medium"
            initial={{ scale: 1 }}
            animate={{ scale: 1.2 }}
            exit={{ scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.span>
    );
};

export default Badge;
