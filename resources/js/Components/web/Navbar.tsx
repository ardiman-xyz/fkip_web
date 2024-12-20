import {
    Book,
    GraduationCap,
    Users,
    Calendar,
    ChevronRight,
    Clock,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Link } from "@inertiajs/react";
const NavLinks = () => (
    <>
        <a href="/" className="hover:underline">
            Beranda
        </a>
        <Link href="#" className="hover:underline">
            Program Studi
        </Link>
        <Link href="#" className="hover:underline">
            Penelitian
        </Link>
        <Link href="#" className="hover:underline">
            Kemahasiswaan
        </Link>
        <Link href="#" className="hover:underline">
            Kontak
        </Link>
    </>
);

const Navbar = () => {
    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <a href="/">
                        <img src="/images/faculty.webp" alt="Fakultas Keguruan dan Ilmu Pendidikan"
                             className={"w-[400px]"}/>
                    </a>
                </div>
                <nav className="hidden md:flex space-x-4">
                <NavLinks />
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Buka menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[240px] sm:w-[300px]"
                    >
                        <nav className="flex flex-col space-y-4 mt-6">
                            <NavLinks />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Navbar;
