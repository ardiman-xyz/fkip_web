import { navigationMenus } from "@/lib/navigation";
import { Link, usePage } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { cn } from "@/lib/utils";

export const ProfileSidebar = () => {
    const profileLinks = navigationMenus["Tentang Kami"].Profil;
    const profileLinksSdm = navigationMenus["Tentang Kami"]["Staf & SDM"];
    const { url } = usePage();

    return (
        <div>
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Profil</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <nav className="space-y-1">
                        {profileLinks.map((link) => {
                            const isActive = url === link.url;

                            return (
                                <Link
                                    key={link.url}
                                    href={link.url}
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

            <Card className="mt-10">
                <CardHeader className="pb-3">
                    <CardTitle>Staf & SDM</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <nav className="space-y-1">
                        {profileLinksSdm.map((link) => {
                            const isActive = url === link.url;

                            return (
                                <Link
                                    key={link.url}
                                    href={link.url}
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
        </div>
    );
};
