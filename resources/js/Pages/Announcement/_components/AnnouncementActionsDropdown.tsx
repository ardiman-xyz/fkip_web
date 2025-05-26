// File: resources/js/Pages/Announcement/_components/AnnouncementActionsDropdown.tsx

import React from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    PiDotsThreeDuotone,
    PiPencilDuotone,
    PiTrashDuotone,
    PiSpinnerDuotone,
} from "react-icons/pi";

interface AnnouncementActionsDropdownProps {
    announcementId: number;
    onDelete: (id: number) => void;
    isDeleting?: boolean;
}

export default function AnnouncementActionsDropdown({
    announcementId,
    onDelete,
    isDeleting = false,
}: AnnouncementActionsDropdownProps) {
    const handleEdit = () => {
        router.get(route("admin.announcements.edit", announcementId));
    };

    const handleDelete = () => {
        onDelete(announcementId);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isDeleting}>
                    {isDeleting ? (
                        <PiSpinnerDuotone className="size-4 animate-spin" />
                    ) : (
                        <PiDotsThreeDuotone className="size-4" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={handleEdit}
                    className="cursor-pointer"
                    disabled={isDeleting}
                >
                    <PiPencilDuotone className="size-4 mr-2" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDelete}
                    className="cursor-pointer text-red-600"
                    disabled={isDeleting}
                >
                    {isDeleting ? (
                        <>
                            <PiSpinnerDuotone className="size-4 mr-2 animate-spin" />
                            Menghapus...
                        </>
                    ) : (
                        <>
                            <PiTrashDuotone className="size-4 mr-2" />
                            Hapus
                        </>
                    )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
