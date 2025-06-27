import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Modal: FC<{
    title: string;
    children: ReactNode;
    onClose: () => void;
}> = ({ title, children, onClose }) => {
    return createPortal(
        <>
            <motion.div
                className="fixed top-0 left-0 w-full h-screen bg-black opacity-75 z-10"
                onClick={onClose}
                exit={{ opacity: 0 }}
            />
            <motion.dialog
                open
                className="fixed z-20 m-auto p-6 w-[30rem] max-w-[90%] bg-white rounded-lg shadow-md inset-0"
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {title}
                </h2>
                {children}
            </motion.dialog>
        </>,
        document.getElementById("modal") as HTMLElement,
    );
};

export default Modal;
