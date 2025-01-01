import Guest2 from "@/Layouts/GuestLayout2";
import React from "react";
import { ProfileSidebar } from "../_components/ProfileSidebar";
import { EmptyState } from "../_components/EmptyState";

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
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-9">
                            {about ? (
                                <div className="space-y-8">
                                    {/* Vision */}
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">
                                            Visi
                                        </h2>
                                        <div
                                            className="prose max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: about.translations.id
                                                    .vision,
                                            }}
                                        />
                                    </div>

                                    {/* Mission */}
                                    <div>
                                        <h2 className="text-2xl font-semibold mb-4">
                                            Misi
                                        </h2>
                                        <div
                                            className="prose max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: about.translations.id
                                                    .mission,
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <EmptyState
                                    title="Visi & Misi Belum Tersedia"
                                    description="Data visi & misi fakultas sedang dalam proses penambahan"
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

export default VisiMission;
