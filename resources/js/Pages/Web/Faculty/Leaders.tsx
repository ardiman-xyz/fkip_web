import Guest2 from "@/Layouts/GuestLayout2";
import { Users } from "lucide-react";
import { Leader } from "@/Pages/AboutUs/_types/leader";
import { ProfileSidebar } from "../_components/ProfileSidebar";
import { EmptyState } from "../_components/EmptyState";
import { LeaderSection } from "../_components/LeaderSection";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

const Leaders = ({ leaders }: { leaders: Leader[] }) => {
    const dekan = leaders.filter(
        (l) =>
            l.translations.id.position.toLowerCase().includes("dekan") &&
            !l.translations.id.position.toLowerCase().includes("wakil")
    );
    const wakilDekan = leaders.filter((l) =>
        l.translations.id.position.toLowerCase().includes("wakil dekan")
    );
    const kaprodi = leaders.filter(
        (l) =>
            l.translations.id.position
                .toLowerCase()
                .includes("ketua program studi") ||
            l.translations.id.position.toLowerCase().includes("kaprodi")
    );

    const others = leaders.filter(
        (l) =>
            !l.translations.id.position.toLowerCase().includes("dekan") &&
            !l.translations.id.position
                .toLowerCase()
                .includes("ketua program studi") &&
            !l.translations.id.position.toLowerCase().includes("kaprodi")
    );
    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">
                                        Beranda
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-muted-foreground">
                                        Profil
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Pimpinan</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            {leaders.length > 0 ? (
                                <div className="space-y-16">
                                    {dekan.length > 0 && (
                                        <LeaderSection
                                            title="Dekan"
                                            leaders={dekan}
                                            layout="large"
                                        />
                                    )}

                                    {wakilDekan.length > 0 && (
                                        <LeaderSection
                                            title="Wakil Dekan"
                                            leaders={wakilDekan}
                                        />
                                    )}

                                    {kaprodi.length > 0 && (
                                        <LeaderSection
                                            title="Ketua Program Studi"
                                            leaders={kaprodi}
                                        />
                                    )}

                                    {others.length > 0 && (
                                        <LeaderSection
                                            title="Pejabat Lainnya"
                                            leaders={others}
                                        />
                                    )}
                                </div>
                            ) : (
                                <EmptyState
                                    title="Data Pimpinan Belum Tersedia"
                                    description="Data pimpinan fakultas sedang dalam proses penambahan"
                                    icon={Users}
                                />
                            )}
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Leaders;
