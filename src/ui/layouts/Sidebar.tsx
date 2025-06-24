import { JSX, useState } from "react";
import { House, ListChecks, Menu, X } from "lucide-react";

import NavLinkButton from "../buttons/NavLinkButton";

const NAV_LINKS: readonly { to: string; text: string; icon: JSX.Element }[] =
    Object.freeze([
        { to: "/", text: "Home", icon: <House /> },
        { to: "tasks", text: "Tasks", icon: <ListChecks /> },
    ]);

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                className="fixed top-4 right-4 z-30 p-2 rounded-full bg-gray-100 shadow-lg md:hidden"
                onClick={toggleSidebar}
                aria-label="Toggle Sidebar"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside
                className={`bg-gray-800 text-white fixed top-0 left-0 z-20 h-full w-64 shadow-md transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }  md:translate-x-0 md:w-72`}
            >
                <div className="p-4 text-2xl font-bold border-b border-gray-700">
                    <h1>Task Manager</h1>
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {NAV_LINKS.map((link) => (
                            <li key={link.text}>
                                <NavLinkButton to={link.to}>
                                    <span className="flex items-center space-x-2">
                                        <span>{link.icon}</span>
                                        <span>{link.text}</span>
                                    </span>
                                </NavLinkButton>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
