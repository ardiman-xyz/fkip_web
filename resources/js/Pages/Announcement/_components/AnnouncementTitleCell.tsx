// File: resources/js/Pages/Announcement/components/AnnouncementTitleCell.tsx

import React from "react";
import { PiStarDuotone, PiPingPongDuotone } from "react-icons/pi";

interface AnnouncementTitleCellProps {
    title: string;
    author: string;
    isFeatured: boolean;
    isPinned: boolean;
}

export default function AnnouncementTitleCell({
    title,
    author,
    isFeatured,
    isPinned,
}: AnnouncementTitleCellProps) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                {isPinned && (
                    <PiPingPongDuotone className="size-4 text-orange-500" />
                )}
                {isFeatured && (
                    <PiStarDuotone className="size-4 text-yellow-500" />
                )}
                <span className="font-medium line-clamp-1">{title}</span>
            </div>
            <span className="text-sm text-gray-500">by {author}</span>
        </div>
    );
}
