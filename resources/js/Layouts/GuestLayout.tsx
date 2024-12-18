import ApplicationLogo from "@/Components/ApplicationLogo";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    const props = usePage<PageProps>();

    console.info(props);

    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
            <p className="text-center mt-6 text-gray-400 font-semibold text-sm">
                {import.meta.env.VITE_LARAVEL_APP_VERSION}
            </p>
        </div>
    );
}
