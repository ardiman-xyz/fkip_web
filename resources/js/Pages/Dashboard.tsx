import VisitorChart from "@/Components/statistics/BarChart";
import MonthlyRevenue from "@/Components/statistics/MonthlyRevenue";
import SalesChart from "@/Components/statistics/SalesChart";
import UserEngagement from "@/Components/statistics/UserEngagement";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, users }: PageProps) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-black">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="flex flex-col gap-4 overflow-y-scroll scroll-smooth py-4 px-4 text-muted-foreground">
                Selamat datang di halaman dashboard
            </div>

            {/*<div className="flex flex-col gap-4 overflow-y-scroll scroll-smooth py-4">*/}
            {/*    <div className="grid gap-4 px-8 xl:grid-cols-4">*/}
            {/*        <MonthlyRevenue />*/}
            {/*        <UserEngagement />*/}
            {/*        <UserEngagement />*/}
            {/*        <MonthlyRevenue />*/}
            {/*        <div className="grid w-full grid-flow-row auto-rows-max grid-cols-4 gap-4 xl:col-span-4">*/}
            {/*            <SalesChart className="col-span-2 h-full" />*/}
            {/*            <VisitorChart className="col-span-2 h-full" />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </AuthenticatedLayout>
    );
}
