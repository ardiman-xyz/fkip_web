// File: resources/js/Pages/Announcement/components/AnnouncementHeader.tsx

import React from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { CardHeader, CardTitle } from "@/Components/ui/card";
import { PiMegaphoneDuotone, PiPlusDuotone } from "react-icons/pi";

export default function AnnouncementHeader() {
    const handleCreateClick = () => {
        router.get(route("admin.announcements.create"));
    };

    return (
        <CardHeader>
            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                <div className="flex items-center gap-x-2">
                    <PiMegaphoneDuotone className="size-7" />
                    <span>Pengumuman</span>
                </div>
                <Button
                    onClick={handleCreateClick}
                    className="flex items-center gap-2"
                >
                    <PiPlusDuotone className="size-4" />
                    Buat Pengumuman
                </Button>
            </CardTitle>
        </CardHeader>
    );
}
