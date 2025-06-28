import { Outlet } from "react-router-dom";

import { Header, Sidebar } from "@/components";

const MainLayout = () => {
    return (
        <>
            <Header></Header>
            <main className="flex min-h-screen min-w-auto bg-blue-50">
                <Sidebar />
                <div className="flex-1 pt-10 md:pt-6 md:ml-72 overflow-hidden bg-blue-50">
                    <div className=" md:w-4/5 md:m-auto md:mt-16 bg-blue-50">
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
};

export default MainLayout;
