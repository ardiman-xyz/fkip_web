import Guest2 from "@/Layouts/GuestLayout2";
import React from "react";
import { ProfileSidebar } from "../_components/ProfileSidebar";
import { EmptyState } from "../_components/EmptyState";
import { Media } from "@/Pages/News/_types";
import { Card, CardContent, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { ExternalLink, Users2 } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

interface OrganizationProps {
    organizationStructure: Media | undefined;
}

const Organization = ({ organizationStructure }: OrganizationProps) => {
    const [isImageLoading, setIsImageLoading] = React.useState(true);

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
                                    <BreadcrumbPage>
                                        Struktur Organisasi
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8">
                            {organizationStructure ? (
                                <div className="space-y-6">
                                    <Card className="overflow-hidden">
                                        <CardContent className="p-6">
                                            <h1 className="text-3xl font-bold mb-8">
                                                Struktur Organisasi
                                            </h1>
                                            {/* Image Container */}
                                            <div className="relative bg-gray-50 rounded-lg mb-4">
                                                {/* Blur Image */}
                                                {isImageLoading && (
                                                    <img
                                                        src={
                                                            organizationStructure
                                                                .paths.blur
                                                        }
                                                        alt="Struktur Organisasi (Loading)"
                                                        className="w-full aspect-[16/9] object-contain rounded"
                                                    />
                                                )}

                                                {/* Full Image */}
                                                <img
                                                    src={
                                                        organizationStructure
                                                            .paths.original
                                                    }
                                                    alt="Struktur Organisasi"
                                                    className={`w-full aspect-[16/9] object-contain rounded transition-opacity duration-300 ${
                                                        isImageLoading
                                                            ? "opacity-0"
                                                            : "opacity-100"
                                                    }`}
                                                    onLoad={() =>
                                                        setIsImageLoading(false)
                                                    }
                                                />
                                            </div>

                                            {/* View Full Size Button */}
                                            <div className="flex justify-center">
                                                <Button
                                                    variant="outline"
                                                    asChild
                                                    className="gap-2"
                                                >
                                                    <a
                                                        href={
                                                            organizationStructure
                                                                .paths.original
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        Lihat Ukuran Penuh
                                                    </a>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : (
                                <EmptyState
                                    title="Struktur Organisasi Belum Tersedia"
                                    description="Data struktur organisasi fakultas sedang dalam proses penambahan"
                                    icon={Users2}
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

export default Organization;
