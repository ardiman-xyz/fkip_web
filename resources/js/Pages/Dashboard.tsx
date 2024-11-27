import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, users }: PageProps) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-black">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="flex flex-col gap-4 overflow-y-scroll scroll-smooth py-4">
                <div className="grid gap-4 px-8 xl:grid-cols-4">dashboard</div>
            </div>
        </AuthenticatedLayout>
    );
}
