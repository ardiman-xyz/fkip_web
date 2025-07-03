
import { Button } from "@/Components/ui/button";
import { formatDateToIndonesian, formatFileSize } from "@/lib/utils";
import { Media } from "@/types/app";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import {
    PiFilePdfDuotone,
    PiFileDocDuotone,
    PiFileXlsDuotone,
    PiFilePptDuotone,
    PiFileTextDuotone,
    PiFileZipDuotone,
    PiFileVideoDuotone,
    PiFileAudioDuotone,
    PiFileCodeDuotone,
    PiFileHtmlDuotone,
    PiFileCssDuotone,
    PiFileJsDuotone,
    PiFileDuotone,
} from "react-icons/pi";
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

    const handleDeleteSuccess = (success: boolean) => {
        if (success) {
            onDelete?.(item.id);
        }
        setIsModalDeleteOpen(false);
    };

    const getFileIcon = () => {
        const extension = item.name?.split('.').pop()?.toLowerCase() || '';
        const mimeType = item.mime_type?.toLowerCase() || '';

        // Image files - show actual image
        if (mimeType.includes('image')) {
            return null; // Will display the actual image
        }

        // PDF files
        if (mimeType === 'application/pdf' || extension === 'pdf') {
            return <PiFilePdfDuotone className="size-12 text-red-600" />;
        }

        // Microsoft Office files
        if (mimeType.includes('word') || ['doc', 'docx'].includes(extension)) {
            return <PiFileDocDuotone className="size-12 text-blue-600" />;
        }

        if (mimeType.includes('excel') || mimeType.includes('spreadsheet') || ['xls', 'xlsx'].includes(extension)) {
            return <PiFileXlsDuotone className="size-12 text-green-600" />;
        }

        if (mimeType.includes('presentation') || ['ppt', 'pptx'].includes(extension)) {
            return <PiFilePptDuotone className="size-12 text-orange-600" />;
        }

        // Video files
        if (mimeType.startsWith('video/')) {
            return <PiFileVideoDuotone className="size-12 text-red-500" />;
        }

        // Audio files
        if (mimeType.startsWith('audio/')) {
            return <PiFileAudioDuotone className="size-12 text-green-500" />;
        }

        // Archive files
        if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z') ||
            ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
            return <PiFileZipDuotone className="size-12 text-yellow-600" />;
        }

        // Code files
        if (['html', 'htm'].includes(extension)) {
            return <PiFileHtmlDuotone className="size-12 text-orange-500" />;
        }

        if (['css'].includes(extension)) {
            return <PiFileCssDuotone className="size-12 text-blue-400" />;
        }

        if (['js', 'jsx', 'ts', 'tsx'].includes(extension)) {
            return <PiFileJsDuotone className="size-12 text-yellow-500" />;
        }

        if (['php', 'py', 'java', 'cpp', 'c', 'cs', 'rb', 'go', 'rs'].includes(extension)) {
            return <PiFileCodeDuotone className="size-12 text-purple-500" />;
        }

        // Text files
        if (mimeType.startsWith('text/') || ['txt', 'log', 'md', 'readme'].includes(extension)) {
            return <PiFileTextDuotone className="size-12 text-gray-600" />;
        }

        // Default file icon
        return <PiFileDuotone className="size-12 text-gray-500" />;
    };

    const getFileTypeDisplay = () => {
        const extension = item.name?.split('.').pop()?.toUpperCase() || '';
        const mimeType = item.mime_type?.toLowerCase() || '';

        // Special cases for better display names
        if (mimeType === 'application/pdf') return 'PDF';
        if (mimeType.includes('word')) return 'WORD';
        if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'EXCEL';
        if (mimeType.includes('presentation')) return 'POWERPOINT';
        if (mimeType.startsWith('image/')) return 'IMAGE';
        if (mimeType.startsWith('video/')) return 'VIDEO';
        if (mimeType.startsWith('audio/')) return 'AUDIO';
        if (mimeType.includes('zip') || mimeType.includes('rar')) return 'ARCHIVE';
        if (mimeType.startsWith('text/')) return 'TEXT';

        return extension || mimeType.split('/')[1]?.toUpperCase() || 'FILE';
    };

    const isImage = item.mime_type?.includes("image");
    const fileIcon = getFileIcon();

    return (
        <div
            className="group relative bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            onDoubleClick={() => setIsViewModalOpen(true)}
        >
            <div className="relative h-40 flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors">
                {isImage ? (
                    <img
                        src={item.path}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-2">
                        {fileIcon}
                        <div className="text-center">
                            <p className="text-xs font-medium text-gray-600">
                                {getFileTypeDisplay()}
                            </p>
                        </div>
                    </div>
                )}

                {/* Hover overlay for non-images */}
                {!isImage && (
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all" />
                )}
            </div>

            <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                    <h3
                        className="font-medium text-sm truncate leading-tight"
                        title={item.name}
                    >
                        {item.name}
                    </h3>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-6 hover:bg-gray-100 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <MoreVertical className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setIsViewModalOpen(true)}
                            >
                                <Eye className="size-4 mr-2" />
                                View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => setIsViewModalOpen(true)}
                            >
                                <Pencil className="size-4 mr-2" />
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer text-red-600"
                                onClick={() => setIsModalDeleteOpen(true)}
                            >
                                <Trash className="size-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{formatFileSize(item.size)}</span>
                    <span>{formatDateToIndonesian(item.created_at)}</span>
                </div>
            </div>

            {isModalDeleteOpen && (
                <DeleteConfirm
                    onClose={handleDeleteSuccess}
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
