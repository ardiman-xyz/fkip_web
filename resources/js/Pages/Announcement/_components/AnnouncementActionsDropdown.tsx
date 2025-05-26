// File: resources/js/Pages/Announcement/_components/AnnouncementActionsDropdown.tsx

import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    PiDotsThreeDuotone,
    PiPencilDuotone,
    PiTrashDuotone,
    PiSpinnerDuotone,
    PiPushPinDuotone,
    PiPushPinSlashDuotone,
} from "react-icons/pi";
import { Announcement } from "../_types/announcement";
import PinModal from "./PinModal";

interface PinFormData {
    pinned_start_date: string;
    pinned_end_date: string;
}

interface AnnouncementActionsDropdownProps {
    announcement: Announcement;
    onDelete: (id: number) => void;
    onPin?: (id: number, data: PinFormData) => void;
    onUnpin?: (id: number) => void;
    isDeleting?: boolean;
    isTogglingPin?: boolean;
}

export default function AnnouncementActionsDropdown({
    announcement,
    onDelete,
    onPin,
    onUnpin,
    isDeleting = false,
    isTogglingPin = false,
}: AnnouncementActionsDropdownProps) {
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);

    const handleEdit = () => {
        router.get(route("admin.announcements.edit", announcement.id));
    };

    const handleDelete = () => {
        onDelete(announcement.id);
    };

    const handlePinClick = () => {
        if (announcement.is_pinned) {
            // Langsung unpin
            if (onUnpin) {
                onUnpin(announcement.id);
            }
        } else {
            // Buka modal untuk set tanggal
            setIsPinModalOpen(true);
        }
    };

    const handlePinConfirm = (data: PinFormData) => {
        if (onPin) {
            onPin(announcement.id, data);
        }
        setIsPinModalOpen(false);
    };

    const isDisabled = isDeleting || isTogglingPin;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={isDisabled}>
                        {isDeleting || isTogglingPin ? (
                            <PiSpinnerDuotone className="size-4 animate-spin" />
                        ) : (
                            <PiDotsThreeDuotone className="size-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={handleEdit}
                        className="cursor-pointer"
                        disabled={isDisabled}
                    >
                        <PiPencilDuotone className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {announcement.is_pinned && (
                        <>
                            <DropdownMenuItem
                                onClick={() => setIsPinModalOpen(true)}
                                className="cursor-pointer"
                                disabled={isDisabled}
                            >
                                <PiPencilDuotone className="size-4 mr-2 text-blue-600" />
                                Edit Pin
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={handlePinClick}
                                className="cursor-pointer"
                                disabled={isDisabled}
                            >
                                {isTogglingPin ? (
                                    <>
                                        <PiSpinnerDuotone className="size-4 mr-2 animate-spin" />
                                        Unpinning...
                                    </>
                                ) : (
                                    <>
                                        <PiPushPinSlashDuotone className="size-4 mr-2 text-orange-600" />
                                        Unpin
                                    </>
                                )}
                            </DropdownMenuItem>
                        </>
                    )}

                    {!announcement.is_pinned && (
                        <DropdownMenuItem
                            onClick={handlePinClick}
                            className="cursor-pointer"
                            disabled={isDisabled}
                        >
                            {isTogglingPin ? (
                                <>
                                    <PiSpinnerDuotone className="size-4 mr-2 animate-spin" />
                                    Pinning...
                                </>
                            ) : (
                                <>
                                    <PiPushPinDuotone className="size-4 mr-2 text-blue-600" />
                                    Pin
                                </>
                            )}
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onClick={handleDelete}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                        disabled={isDisabled}
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

            <PinModal
                isOpen={isPinModalOpen}
                onClose={() => setIsPinModalOpen(false)}
                onConfirm={handlePinConfirm}
                announcement={announcement}
                isLoading={isTogglingPin}
            />
        </>
    );
}
