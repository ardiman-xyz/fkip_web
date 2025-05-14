// resources/js/Components/web/NavbarWithEducationLevels.tsx
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
import { useSharedData } from "@/lib/utils";

const DesktopNav = () => {
    const { educationLevels } = useSharedData();

    console.info(educationLevels);

    return (
        <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
                {Object.entries(navigationMenus).map(([key, sections]) => (
                    <NavigationMenuItem key={key}>
                        <NavigationMenuTrigger>{key}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="grid grid-cols-2 p-6 md:w-[600px] lg:w-[700px]">
                                {key === "Program Studi" &&
                                educationLevels.length > 0 ? (
                                    <>
                                        <div className="p-3">
                                            <h3 className="font-medium mb-2 text-sm text-muted-foreground">
                                                Program
                                            </h3>
                                            <ul className="space-y-2">
                                                {educationLevels.map(
                                                    (level) => (
                                                        <li key={level.id}>
                                                            <NavigationMenuLink
                                                                asChild
                                                            >
                                                                <a
                                                                    href={`/program/${level.slug}`}
                                                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors capitalize"
                                                                >
                                                                    {level.name}{" "}
                                                                    (
                                                                    {level.code}
                                                                    )
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-medium mb-2 text-sm text-muted-foreground">
                                                Akademik
                                            </h3>
                                            <ul className="space-y-2">
                                                {navigationMenus[
                                                    "Program Studi"
                                                ].Akademik.map((item) => (
                                                    <li key={item.title}>
                                                        <NavigationMenuLink
                                                            asChild
                                                        >
                                                            <a
                                                                href={item.url}
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
                                    </>
                                ) : (
                                    // Render normal untuk menu lainnya
                                    Object.entries(sections).map(
                                        ([sectionTitle, items]) => (
                                            <div
                                                key={sectionTitle}
                                                className="p-3"
                                            >
                                                <h3 className="font-medium mb-2 text-sm text-muted-foreground">
                                                    {sectionTitle}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {items.map((item) => (
                                                        <li key={item.title}>
                                                            <NavigationMenuLink
                                                                asChild
                                                            >
                                                                <a
                                                                    href={
                                                                        item.url
                                                                    }
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
                                    )
                                )}
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const MobileNav = () => {
    const { educationLevels } = useSharedData();

    return (
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

                            {/* Khusus untuk Program Studi */}
                            {key === "Program Studi" &&
                            educationLevels.length > 0 ? (
                                <>
                                    <div className="pl-4 space-y-2">
                                        <h4 className="text-sm font-medium text-muted-foreground">
                                            Program
                                        </h4>
                                        {educationLevels.map((level) => (
                                            <a
                                                key={level.id}
                                                href={`/program/${level.slug}`}
                                                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                            >
                                                {level.name} ({level.code})
                                            </a>
                                        ))}
                                    </div>
                                    <div className="pl-4 space-y-2">
                                        <h4 className="text-sm font-medium text-muted-foreground">
                                            Akademik
                                        </h4>
                                        {navigationMenus[
                                            "Program Studi"
                                        ].Akademik.map((item) => (
                                            <a
                                                key={item.title}
                                                href={item.url}
                                                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                            >
                                                <item.icon className="w-4 h-4" />
                                                {item.title}
                                            </a>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                // Menu normal
                                Object.entries(sections).map(
                                    ([sectionTitle, items]) => (
                                        <div
                                            key={sectionTitle}
                                            className="pl-4 space-y-2"
                                        >
                                            <h4 className="text-sm font-medium text-muted-foreground">
                                                {sectionTitle}
                                            </h4>
                                            {items.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={item.url}
                                                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    {item.title}
                                                </a>
                                            ))}
                                        </div>
                                    )
                                )
                            )}
                        </div>
                    ))}
                    <Link
                        href="#"
                        className="hover:text-primary transition-colors"
                    >
                        Kontak
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

const NavbarWithEducationLevels = () => {
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

export default NavbarWithEducationLevels;
