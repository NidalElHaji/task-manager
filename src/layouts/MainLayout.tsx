import { Outlet } from "react-router-dom";

import Header from "../ui/layouts/Header";
import Sidebar from "../ui/layouts/Sidebar";

const MainLayout = () => {
    return (
        <>
            <Header></Header>
            <main className="flex bg-blue-50 w-screen h-screen">
                <Sidebar />
                <div className="flex-1">
                    <div className=" w-4/5 m-auto mt-16">
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
};

export default MainLayout;
