import ApplicationLogo from "@/Components/ApplicationLogo";
import { PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    const { app_version } = usePage<PageProps>().props;

    return (
        <div className="flex min-h-screen flex-col items-center bg-white pt-6  sm:pt-0">
            <div className={'w-full flex flex-col items-center md:mt-20 mt-10'}>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500"/>
                </Link>
                <div className="flex flex-col space-y-2 text-center mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to sign in
                    </p>
                </div>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4  sm:max-w-md sm:rounded-lg">
                {children}
            </div>
            <p className="text-center mt-6 text-gray-400 font-semibold text-sm">
                {app_version}
            </p>
        </div>
    );
}
