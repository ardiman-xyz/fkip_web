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
        <Link href="/" className="hover:underline">
            Beranda
        </Link>
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
        <header className="bg-green-800 text-white">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <GraduationCap size={32} />
                    <h1 className="text-2xl font-bold">FKIP</h1>
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
