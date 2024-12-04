import { Button } from "@/Components/ui/button";
import { formatDateToIndonesian, formatFileSize } from "@/lib/utils";
import { Media } from "@/types/app";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { PiImageDuotone } from "react-icons/pi";
import { useState } from "react";
import { DeleteConfirm } from "@/Components/ModalDeleteConfirmation";
import { ViewMediaModal } from "./ViewMediaModal";

interface MediaItemProps {
    item: Media;
    onDelete?: (id: number) => void;
    handleUpdate?: (updatedMedia: Media) => void;
}

export const MediaItem = ({ item, onDelete, handleUpdate }: MediaItemProps) => {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);

    const handleDeleteSuccess = () => {
        onDelete?.(item.id);
        setIsModalDeleteOpen(false);
    };

    return (
        <div
            className="group relative bg-white  "
            onDoubleClick={() => setIsViewModalOpen(true)}
        >
            <div className="relative h-40 flex items-center justify-center bg-gray-100 group-hover:bg-gray-200 transition ease-in-out duration-100">
                {item.mime_type?.includes("image") ? (
                    <img
                        src={item.url}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <PiImageDuotone className="size-8 text-muted-foreground" />
                        <p className="text-sm font-semibold text-muted-foreground">
                            No Image
                        </p>
                    </div>
                )}
            </div>

            <div className="p-2">
                <div className="flex items-center justify-between group">
                    <h3
                        className="font-medium text-sm truncate"
                        title={item.name}
                    >
                        {item.name}
                    </h3>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-6 hover:bg-gray-100"
                            >
                                <MoreVertical className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setIsViewModalOpen(true)}
                            >
                                <Eye className="size-4 mr-1" />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Pencil className="size-4 mr-1" />
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setIsModalDeleteOpen(true)}
                            >
                                <Trash className="size-4 mr-1" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-gray-500">
                        {formatFileSize(item.size)}
                    </span>
                    <span className="text-xs text-gray-500">
                        {formatDateToIndonesian(item.created_at)}
                    </span>
                </div>
            </div>
            {isModalDeleteOpen && (
                <DeleteConfirm
                    onClose={() => handleDeleteSuccess()}
                    id={item.id}
                    routeAction="admin.media.destroy"
                />
            )}

            <ViewMediaModal
                media={item}
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                onUpdate={handleUpdate}
            />
        </div>
    );
};
