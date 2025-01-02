import { navigationMenus } from "@/lib/navigation";
import { Link } from "@inertiajs/react";

export const ProdiSidebar = () => {
    const programs = navigationMenus["Program Studi"].Program;
    const Akademiks = navigationMenus["Program Studi"].Akademik;

    return (
        <div className="bg-gray-50 rounded-lg p-4 flex flex-col ">
            <h3 className="font-semibold text-lg mb-2">Program</h3>
            <nav className="space-y-2">
                {programs.map((link) => {
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

            <h3 className="font-semibold text-lg mt-10 mb-2">Akademik</h3>
            <nav className="space-y-2">
                {Akademiks.map((link) => {
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
