import { navigationMenus } from "@/lib/navigation";
import { Link } from "@inertiajs/react";

export const ProfileSidebar = () => {
    const profileLinks = navigationMenus["Tentang Kami"].Profil;

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-4">Profil</h3>
            <nav className="space-y-2">
                {profileLinks.map((link) => {
                    return (
                        <Link
                            key={link.url}
                            href={link.url}
                            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                        >
                            {link.title}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};
