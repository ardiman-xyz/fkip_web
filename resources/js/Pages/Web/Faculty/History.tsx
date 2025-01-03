import Guest2 from "@/Layouts/GuestLayout2";
import { ProfileSidebar } from "../_components/ProfileSidebar";
import { History as HistoryType } from "@/Pages/AboutUs/_types/history";
import { EmptyState } from "../_components/EmptyState";
import { School } from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

interface HistoryProps {
    history: HistoryType | undefined;
}

const History = ({ history }: HistoryProps) => {
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
                                    <BreadcrumbPage>Sejarah</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            <Card>
                                <CardContent className="p-6">
                                    {history ? (
                                        <div>
                                            <h1 className="text-3xl font-bold mb-6 capitalize">
                                                {history.translations.id.title}
                                            </h1>
                                            <div
                                                className="prose prose-lg max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: history.translations
                                                        .id.content,
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <EmptyState
                                            title="Sejarah Belum Tersedia"
                                            description="Data sejarah fakultas sedang dalam proses penambahan"
                                            icon={School}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4">
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default History;
