import { PropsWithChildren } from "react";

import Footer from "@/Components/web/Footer";
import Navbar from "@/Components/web/Navbar";
import { Head } from "@inertiajs/react";

interface Props {
    children: React.ReactNode;

}

export default function Guest2({ children }: Props) {
    return (

        <div className="font-jakarta">
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <main className="flex-grow">{children}</main>

                <Footer />
            </div>
        </div>
    );
}
