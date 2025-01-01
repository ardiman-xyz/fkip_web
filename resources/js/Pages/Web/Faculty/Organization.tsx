import Guest2 from "@/Layouts/GuestLayout2";
import React from "react";
import { ProfileSidebar } from "../_components/ProfileSidebar";
import { EmptyState } from "../_components/EmptyState";
import { Media } from "@/Pages/News/_types";

interface OrganizationProps {
    organizationStructure: Media | undefined;
}

const Organization = ({ organizationStructure }: OrganizationProps) => {
    const [isImageLoading, setIsImageLoading] = React.useState(true);

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-9">
                            {organizationStructure ? (
                                <div className="space-y-6">
                                    <h1 className="text-2xl md:text-3xl font-bold">
                                        Struktur Organisasi
                                    </h1>

                                    <div className="relative bg-white rounded-lg border shadow-sm p-4">
                                        {isImageLoading && (
                                            <img
                                                src={
                                                    organizationStructure.paths
                                                        .blur
                                                }
                                                alt="Struktur Organisasi (Loading)"
                                                className="w-full aspect-[16/9] object-contain rounded"
                                            />
                                        )}

                                        <img
                                            src={
                                                organizationStructure.paths
                                                    .original
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

                                    <div className="text-center">
                                        <a
                                            href={
                                                organizationStructure.paths
                                                    .original
                                            }
                                            target="_blank"
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Lihat ukuran penuh
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <EmptyState
                                    title="Struktur Organisasi Belum Tersedia"
                                    description="Data struktur organisasi fakultas sedang dalam proses penambahan"
                                />
                            )}
                        </div>

                        <div className="col-span-3">
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Organization;
