import ApplicationLogo from "@/Components/ApplicationLogo";
import Footer from "@/Components/web/Footer";
import Navbar from "@/Components/web/Navbar";
import { Link } from "@inertiajs/react";
import { GraduationCap } from "lucide-react";
import { PropsWithChildren } from "react";

export default function Guest2({ children }: PropsWithChildren) {
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
