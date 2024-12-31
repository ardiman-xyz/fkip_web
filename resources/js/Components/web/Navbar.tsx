import { Menu } from "lucide-react";
import { Link } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/Components/ui/navigation-menu";

import { navigationMenus } from "@/lib/navigation";

const DesktopNav = () => (
    <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
            {Object.entries(navigationMenus).map(([key, sections]) => (
                <NavigationMenuItem key={key}>
                    <NavigationMenuTrigger>{key}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid grid-cols-2 p-6 md:w-[600px] lg:w-[700px]">
                            {Object.entries(sections).map(
                                ([sectionTitle, items]) => (
                                    <div key={sectionTitle} className="p-3">
                                        <h3 className="font-medium mb-2 text-sm text-muted-foreground">
                                            {sectionTitle}
                                        </h3>
                                        <ul className="space-y-2">
                                            {items.map((item) => (
                                                <li key={item.title}>
                                                    <NavigationMenuLink asChild>
                                                        <a
                                                            href="#"
                                                            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                                        >
                                                            <item.icon className="w-4 h-4" />
                                                            {item.title}
                                                        </a>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    </NavigationMenu>
);

const MobileNav = () => (
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
            <nav className="flex flex-col space-y-4 mt-6">
                {Object.entries(navigationMenus).map(([key, sections]) => (
                    <div key={key} className="space-y-2">
                        <h3 className="font-medium text-lg">{key}</h3>
                        {Object.entries(sections).map(
                            ([sectionTitle, items]) => (
                                <div
                                    key={sectionTitle}
                                    className="pl-4 space-y-2"
                                >
                                    {items.map((item) => (
                                        <a
                                            key={item.title}
                                            href="#"
                                            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                        >
                                            <item.icon className="w-4 h-4" />
                                            {item.title}
                                        </a>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                ))}
                <Link href="#" className="hover:text-primary transition-colors">
                    Kontak
                </Link>
            </nav>
        </SheetContent>
    </Sheet>
);

const Navbar = () => {
    return (
        <header className="bg-white border-b">
            <div className="container max-w-6xl mx-auto py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <a href="/">
                        <img
                            src="/images/faculty.webp"
                            alt="Fakultas Keguruan dan Ilmu Pendidikan"
                            className="w-[300px] pl-2 md:pl-0"
                        />
                    </a>
                </div>
                <DesktopNav />
                <MobileNav />
            </div>
        </header>
    );
};

export default Navbar;
