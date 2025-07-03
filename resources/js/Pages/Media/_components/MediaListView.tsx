
import { useState } from "react";
import { Media } from "@/types/app";
import { formatDateToIndonesian, formatFileSize } from "@/lib/utils";
import { Eye, MoreVertical, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";
import { DeleteConfirm } from "@/Components/ModalDeleteConfirmation";
import { ViewMediaModal } from "./ViewMediaModal";
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

interface MediaListViewProps {
    media: Media[];
    onDelete: (id: number) => void;
    onUpdate: (updatedMedia: Media) => void;
}

export const MediaListView = ({ media, onDelete, onUpdate }: MediaListViewProps) => {
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

    const getFileIcon = (item: Media) => {
        const extension = item.name?.split('.').pop()?.toLowerCase() || '';
        const mimeType = item.mime_type?.toLowerCase() || '';

        // Image files - show actual image
        if (mimeType.includes('image')) {
            return (
                <img
                    src={item.path}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain"
                />
            );
        }

        // PDF files
        if (mimeType === 'application/pdf' || extension === 'pdf') {
            return <PiFilePdfDuotone className="size-6 text-red-600" />;
        }

        // Microsoft Office files
        if (mimeType.includes('word') || ['doc', 'docx'].includes(extension)) {
            return <PiFileDocDuotone className="size-6 text-blue-600" />;
        }

        if (mimeType.includes('excel') || mimeType.includes('spreadsheet') || ['xls', 'xlsx'].includes(extension)) {
            return <PiFileXlsDuotone className="size-6 text-green-600" />;
        }

        if (mimeType.includes('presentation') || ['ppt', 'pptx'].includes(extension)) {
            return <PiFilePptDuotone className="size-6 text-orange-600" />;
        }

        // Video files
        if (mimeType.startsWith('video/')) {
            return <PiFileVideoDuotone className="size-6 text-red-500" />;
        }

        // Audio files
        if (mimeType.startsWith('audio/')) {
            return <PiFileAudioDuotone className="size-6 text-green-500" />;
        }

        // Archive files
        if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z') ||
            ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
            return <PiFileZipDuotone className="size-6 text-yellow-600" />;
        }

        // Code files
        if (['html', 'htm'].includes(extension)) {
            return <PiFileHtmlDuotone className="size-6 text-orange-500" />;
        }

        if (['css'].includes(extension)) {
            return <PiFileCssDuotone className="size-6 text-blue-400" />;
        }

        if (['js', 'jsx', 'ts', 'tsx'].includes(extension)) {
            return <PiFileJsDuotone className="size-6 text-yellow-500" />;
        }

        if (['php', 'py', 'java', 'cpp', 'c', 'cs', 'rb', 'go', 'rs'].includes(extension)) {
            return <PiFileCodeDuotone className="size-6 text-purple-500" />;
        }

        // Text files
        if (mimeType.startsWith('text/') || ['txt', 'log', 'md', 'readme'].includes(extension)) {
            return <PiFileTextDuotone className="size-6 text-gray-600" />;
        }

        // Default file icon
        return <PiFileDuotone className="size-6 text-gray-500" />;
    };

    const getFileTypeDisplay = (item: Media) => {
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

    const handleViewMedia = (item: Media) => {
        setSelectedMedia(item);
        setIsViewModalOpen(true);
    };

    const handleDeleteMedia = (item: Media) => {
        setSelectedMedia(item);
        setIsModalDeleteOpen(true);
    };

    const handleDeleteSuccess = (success: boolean) => {
        if (success && selectedMedia) {
            onDelete(selectedMedia.id);
        }
        setIsModalDeleteOpen(false);
        setSelectedMedia(null);
    };

    const handleModalClose = () => {
        setIsViewModalOpen(false);
        setSelectedMedia(null);
    };

    return (
        <>
            <div className="rounded-md border overflow-hidden">
                {/* Header */}
                <div className="bg-muted/50 py-2 px-4 flex items-center border-b">
                    <div className="w-12 mr-4 flex-shrink-0"></div>
                    <div className="flex-1 mr-4 font-medium text-sm">
                        Name
                    </div>
                    <div className="w-24 mr-4 font-medium text-sm text-center">
                        Type
                    </div>
                    <div className="w-24 mr-4 font-medium text-sm text-center">
                        Size
                    </div>
                    <div className="w-32 mr-4 font-medium text-sm text-center">
                        Date
                    </div>
                    <div className="w-20 flex-shrink-0"></div>
                </div>

                {/* Media List */}
                <div className="divide-y">
                    {media.map((item) => (
                        <div
                            key={item.id}
                            className="animate-in fade-in duration-300 hover:bg-muted/20 group"
                        >
                            <div
                                className="flex items-center py-2 px-4"
                                onDoubleClick={() => handleViewMedia(item)}
                            >
                                {/* File Icon/Preview */}
                                <div className="w-12 h-12 mr-4 flex-shrink-0 bg-white border rounded flex items-center justify-center overflow-hidden">
                                    {getFileIcon(item)}
                                </div>

                                {/* File Name */}
                                <div
                                    className="flex-1 mr-4 truncate font-medium"
                                    title={item.name}
                                >
                                    {item.name}
                                </div>

                                {/* File Type */}
                                <div className="w-24 mr-4 text-sm text-muted-foreground text-center">
                                    {getFileTypeDisplay(item)}
                                </div>

                                {/* File Size */}
                                <div className="w-24 mr-4 text-sm text-muted-foreground text-center">
                                    {formatFileSize(item.size)}
                                </div>

                                {/* Date */}
                                <div className="w-32 mr-4 text-sm text-muted-foreground text-center">
                                    {formatDateToIndonesian(item.created_at)}
                                </div>

                                {/* Actions */}
                                <div className="w-20 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 flex justify-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="size-8 hover:bg-gray-100"
                                            >
                                                <MoreVertical className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() => handleViewMedia(item)}
                                            >
                                                <Eye className="size-4 mr-2" />
                                                View
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() => handleViewMedia(item)}
                                            >
                                                <Pencil className="size-4 mr-2" />
                                                Rename
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="cursor-pointer text-red-600"
                                                onClick={() => handleDeleteMedia(item)}
                                            >
                                                <Trash className="size-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            {selectedMedia && (
                <>
                    {isModalDeleteOpen && (
                        <DeleteConfirm
                            onClose={handleDeleteSuccess}
                            id={selectedMedia.id}
                            routeAction="admin.media.destroy"
                        />
                    )}

                    <ViewMediaModal
                        media={selectedMedia}
                        isOpen={isViewModalOpen}
                        onClose={handleModalClose}
                        onUpdate={onUpdate}
                    />
                </>
            )}
        </>
    );
};

