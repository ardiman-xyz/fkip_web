// File: resources/js/Pages/Announcement/_components/AnnouncementTableRow.tsx

import React from "react";
import { TableCell, TableRow } from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import AnnouncementTitleCell from "./AnnouncementTitleCell";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import AnnouncementActionsDropdown from "./AnnouncementActionsDropdown";
import { Announcement } from "../_types/announcement";
import { PiClockDuotone, PiMapPinSimpleAreaDuotone } from "react-icons/pi";

interface AnnouncementTableRowProps {
    announcement: Announcement;
    onDelete: (id: number) => void;
    onPin?: (
        id: number,
        data: { pinned_start_date: string; pinned_end_date: string }
    ) => void;
    onUnpin?: (id: number) => void;
    isDeleting?: boolean;
    isTogglingPin?: boolean;
}

export default function AnnouncementTableRow({
    announcement,
    onDelete,
    onPin,
    onUnpin,
    isDeleting = false,
    isTogglingPin = false,
}: AnnouncementTableRowProps) {
    const getTitle = (announcement: Announcement) => {
        // Prioritas: Indonesian first, then English
        return (
            announcement.translations?.id?.title ||
            announcement.translations?.en?.title ||
            "Untitled"
        );
    };

    const formatPinnedPeriod = (
        startDate: string | null,
        endDate: string | null
    ) => {
        if (!startDate && !endDate) return null;

        if (startDate && endDate) {
            return `${startDate} - ${endDate}`;
        }

        if (startDate) {
            return `Mulai: ${startDate}`;
        }

        if (endDate) {
            return `Sampai: ${endDate}`;
        }

        return null;
    };

    const isPinnedActive = (announcement: Announcement) => {
        if (!announcement.is_pinned) return false;

        const now = new Date();
        const startDate = announcement.pinned_start_date
            ? new Date(announcement.pinned_start_date)
            : null;
        const endDate = announcement.pinned_end_date
            ? new Date(announcement.pinned_end_date)
            : null;

        if (startDate && endDate) {
            return now >= startDate && now <= endDate;
        }

        if (startDate && !endDate) {
            return now >= startDate;
        }

        if (!startDate && endDate) {
            return now <= endDate;
        }

        return true; // Jika tidak ada tanggal, anggap aktif
    };

    const pinnedPeriod = formatPinnedPeriod(
        announcement.pinned_start_date,
        announcement.pinned_end_date
    );
    const isCurrentlyPinned = isPinnedActive(announcement);

    return (
        <TableRow
            key={announcement.id}
            className={`${isDeleting ? "opacity-50 pointer-events-none" : ""} ${
                announcement.is_pinned
                    ? "bg-orange-50 border-l-4 border-l-orange-400"
                    : ""
            } transition-opacity`}
        >
            <TableCell>
                <AnnouncementTitleCell
                    title={getTitle(announcement)}
                    author={announcement.author}
                    isFeatured={announcement.is_featured}
                    isPinned={announcement.is_pinned}
                />

                {/* Tampilkan info pinned jika ada */}
                {announcement.is_pinned && pinnedPeriod && (
                    <div className="mt-2 flex items-center gap-2">
                        <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                                isCurrentlyPinned
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            <PiMapPinSimpleAreaDuotone className="size-3" />
                            {isCurrentlyPinned
                                ? "Pinned Aktif"
                                : "Pinned Tidak Aktif"}
                        </div>
                    </div>
                )}

                {announcement.is_pinned && pinnedPeriod && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <PiClockDuotone className="size-3" />
                        <span>{pinnedPeriod}</span>
                    </div>
                )}
            </TableCell>

            <TableCell>
                <div className="flex flex-col gap-1">
                    <StatusBadge status={announcement.status} />
                    {announcement.is_pinned && (
                        <Badge
                            variant={
                                isCurrentlyPinned ? "default" : "secondary"
                            }
                            className="text-xs"
                        >
                            <PiMapPinSimpleAreaDuotone className="size-3 mr-1" />
                            {isCurrentlyPinned ? "Pinned" : "Scheduled"}
                        </Badge>
                    )}
                </div>
            </TableCell>

            <TableCell>
                <PriorityBadge priority={announcement.priority} />
            </TableCell>

            <TableCell>
                <div className="text-sm">
                    {announcement.view_count.toLocaleString()}
                </div>
            </TableCell>

            <TableCell>
                <div className="text-sm">
                    <div>{announcement.created_at}</div>
                    {announcement.published_at && (
                        <div className="text-xs text-gray-500">
                            Published:{" "}
                            {new Date(
                                announcement.published_at
                            ).toLocaleDateString()}
                        </div>
                    )}
                </div>
            </TableCell>

            <TableCell>
                <AnnouncementActionsDropdown
                    announcement={announcement}
                    onDelete={onDelete}
                    onPin={onPin}
                    onUnpin={onUnpin}
                    isDeleting={isDeleting}
                    isTogglingPin={isTogglingPin}
                />
            </TableCell>
        </TableRow>
    );
}
