import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NavLinkButton: FC<{
    to: string;
    children: ReactNode;
}> = ({ to, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `relative block px-4 py-2 rounded-md ${
                    isActive ? "text-white font-semibold" : "text-gray-400"
                } hover:text-white`
            }
        >
            {({ isActive }) => (
                <>
                    {isActive && (
                        <motion.div
                            layoutId="hover-indicator"
                            className={
                                "absolute inset-0 rounded-md bg-gray-700"
                            }
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    )}
                    <span className="relative">{children}</span>
                </>
            )}
        </NavLink>
    );
};

export default NavLinkButton;
