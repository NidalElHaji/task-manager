import NavLinkButton from "../buttons/NavLinkButton";

const NAV_LINKS: readonly { to: string; text: string }[] = Object.freeze([
    { to: "/", text: "Dashboard" },
    { to: "tasks", text: "Tasks" },
]);

const Sidebar = () => {
    return (
        <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">
                <h1>Task Manager</h1>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {NAV_LINKS.map((link) => (
                        <li key={link.text}>
                            <NavLinkButton to={link.to}>
                                {link.text}
                            </NavLinkButton>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
