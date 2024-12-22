import { PropsWithChildren } from "react";

import Footer from "@/Components/web/Footer";
import Navbar from "@/Components/web/Navbar";
import { Head } from "@inertiajs/react";
import TopBar from "@/Components/web/TopBar";

interface Props {
    children: React.ReactNode;

}

export default function Guest2({ children }: Props) {
    return (

        <div className="font-jakarta">
            <div className="flex flex-col min-h-screen">
                <div className="fixed top-0 left-0 right-0 z-50">
                    <TopBar/>
                </div>
                <div className="fixed top-[36px] left-0 right-0 z-40">
                    <Navbar/>
                </div>
                <main className="flex-grow bg-gray-100 pt-[116px]">
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
    );
}
