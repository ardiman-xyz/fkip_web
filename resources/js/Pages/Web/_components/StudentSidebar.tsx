import { Link } from "@inertiajs/react";

export const StudentSidebar = () => {
    const links = [
        { title: "Organisasi Mahasiswa", href: "/kemahasiswaan/organisasi" },
        { title: "Beasiswa", href: "/kemahasiswaan/beasiswa" },
        { title: "Prestasi", href: "/kemahasiswaan/prestasi" },
    ];

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-4">Kemahasiswaan</h3>
            <nav className="space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                    >
                        {link.title}
                    </Link>
                ))}
            </nav>
        </div>
    );
};
