// File: resources/js/Pages/Announcement/_components/AnnouncementTableRow.tsx

import React from "react";
import { TableCell, TableRow } from "@/Components/ui/table";
import AnnouncementTitleCell from "./AnnouncementTitleCell";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import AnnouncementActionsDropdown from "./AnnouncementActionsDropdown";
import { Announcement } from "../_types/announcement";

interface AnnouncementTableRowProps {
    announcement: Announcement;
    onDelete: (id: number) => void;
    isDeleting?: boolean;
}

export default function AnnouncementTableRow({
    announcement,
    onDelete,
    isDeleting = false,
}: AnnouncementTableRowProps) {
    const getTitle = (announcement: Announcement) => {
        // Prioritas: Indonesian first, then English
        return (
            announcement.translations?.id?.title ||
            announcement.translations?.en?.title ||
            "Untitled"
        );
    };

    return (
        <TableRow
            key={announcement.id}
            className={`${
                isDeleting ? "opacity-50 pointer-events-none" : ""
            } transition-opacity`}
        >
            <TableCell>
                <AnnouncementTitleCell
                    title={getTitle(announcement)}
                    author={announcement.author}
                    isFeatured={announcement.is_featured}
                    isPinned={announcement.is_pinned}
                />
            </TableCell>
            <TableCell>
                <StatusBadge status={announcement.status} />
            </TableCell>
            <TableCell>
                <PriorityBadge priority={announcement.priority} />
            </TableCell>
            <TableCell>
                <div className="flex flex-wrap gap-1">
                    {announcement.tags && announcement.tags.length > 0 ? (
                        announcement.tags.slice(0, 2).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-gray-400">No tags</span>
                    )}
                    {announcement.tags && announcement.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            +{announcement.tags.length - 2}
                        </span>
                    )}
                </div>
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
                    announcementId={announcement.id}
                    onDelete={onDelete}
                    isDeleting={isDeleting}
                />
            </TableCell>
        </TableRow>
    );
}
