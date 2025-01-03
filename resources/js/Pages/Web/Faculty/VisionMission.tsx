import Guest2 from "@/Layouts/GuestLayout2";
import React from "react";
import { ProfileSidebar } from "../_components/ProfileSidebar";
import { EmptyState } from "../_components/EmptyState";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Target } from "lucide-react";

export interface AboutTranslation {
    language_id: number;
    title: string;
    vision: string;
    mission: string;
}

export interface About {
    id: number;
    translations: {
        id: AboutTranslation;
        en: AboutTranslation;
    };
    created_at: string;
    updated_at: string;
}

interface VisiMissionProps {
    about: About | undefined;
}

const VisiMission = ({ about }: VisiMissionProps) => {
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
                                    <BreadcrumbPage>Visi & Misi</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8">
                            {about ? (
                                <Card>
                                    <CardContent className="p-6">
                                        <h1 className="text-3xl font-bold mb-8">
                                            Visi & Misi
                                        </h1>
                                        <div className="space-y-8">
                                            {/* Vision */}
                                            <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-green-100 rounded-lg">
                                                        <Target className="w-5 h-5 text-green-600" />
                                                    </div>
                                                    <h2 className="text-2xl font-semibold">
                                                        Visi
                                                    </h2>
                                                </div>
                                                <div
                                                    className="prose prose-lg max-w-none"
                                                    dangerouslySetInnerHTML={{
                                                        __html: about
                                                            .translations.id
                                                            .vision,
                                                    }}
                                                />
                                            </div>

                                            {/* Mission */}
                                            <div className="space-y-4">
                                                <h2 className="text-2xl font-semibold">
                                                    Misi
                                                </h2>
                                                <div
                                                    className="prose prose-lg max-w-none prose-ul:space-y-2 prose-li:marker:text-green-600"
                                                    dangerouslySetInnerHTML={{
                                                        __html: about
                                                            .translations.id
                                                            .mission,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <EmptyState
                                    title="Visi & Misi Belum Tersedia"
                                    description="Data visi & misi fakultas sedang dalam proses penambahan"
                                    icon={Target}
                                />
                            )}
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

export default VisiMission;
