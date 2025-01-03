import { Link, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { cn } from "@/lib/utils";

export const StudentSidebar = () => {
    const { url } = usePage();

    const links = [
        { title: "Organisasi Mahasiswa", href: "/kemahasiswaan/organisasi" },
        { title: "Beasiswa", href: "/kemahasiswaan/beasiswa" },
        { title: "Prestasi", href: "/kemahasiswaan/prestasi" },
    ];

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle>Kemahasiswaan</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
                <nav className="space-y-1">
                    {links.map((link) => {
                        const isActive = url === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2.5 rounded-md transition-colors",
                                    "hover:bg-gray-100",
                                    isActive
                                        ? "bg-green-50 text-green-600 font-medium"
                                        : "text-gray-600 hover:text-gray-900"
                                )}
                            >
                                {link.title}
                            </Link>
                        );
                    })}
                </nav>
            </CardContent>
        </Card>
    );
};
