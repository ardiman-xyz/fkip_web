import {
    PiMagnifyingGlassDuotone,
    PiUploadSimpleDuotone,
} from "react-icons/pi";
import { Check, FileIcon, Loader2, Search, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { ScrollArea } from "@/Components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Media } from "@/types/app";
import { formatFileSize } from "@/lib/utils";
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
import { useDebouncedCallback } from 'use-debounce';

interface PaginatedMedia {
    data: Media[];
    current_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    last_page: number;
    links: any[];
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface MediaGridProps {
    media: Media[];
    selectedMedia?: Media | null;
    onSelect: (media: Media) => void;
    variant?: 'modal' | 'page';
}

export const MediaGrid = ({ media, selectedMedia = null, onSelect, variant = 'modal' }: MediaGridProps) => {
    const getFileIcon = (item: Media) => {
        const extension = item.name?.split('.').pop()?.toLowerCase() || '';
        const mimeType = item.mime_type?.toLowerCase() || '';
        const iconSize = variant === 'modal' ? 'size-8' : 'size-6';

        // Image files - show actual image
        if (mimeType.includes('image')) {
            return (
                <img
                    src={item.path}
                    alt={item.name}
                    className="max-w-full max-h-full object-cover"
                />
            );
        }

        // PDF files
        if (mimeType === 'application/pdf' || extension === 'pdf') {
            return <PiFilePdfDuotone className={`${iconSize} text-red-600`} />;
        }

        // Microsoft Office files
        if (mimeType.includes('word') || ['doc', 'docx'].includes(extension)) {
            return <PiFileDocDuotone className={`${iconSize} text-blue-600`} />;
        }

        if (mimeType.includes('excel') || mimeType.includes('spreadsheet') || ['xls', 'xlsx'].includes(extension)) {
            return <PiFileXlsDuotone className={`${iconSize} text-green-600`} />;
        }

        if (mimeType.includes('presentation') || ['ppt', 'pptx'].includes(extension)) {
            return <PiFilePptDuotone className={`${iconSize} text-orange-600`} />;
        }

        // Video files
        if (mimeType.startsWith('video/')) {
            return <PiFileVideoDuotone className={`${iconSize} text-red-500`} />;
        }

        // Audio files
        if (mimeType.startsWith('audio/')) {
            return <PiFileAudioDuotone className={`${iconSize} text-green-500`} />;
        }

        // Archive files
        if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('7z') ||
            ['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
            return <PiFileZipDuotone className={`${iconSize} text-yellow-600`} />;
        }

        // Code files
        if (['html', 'htm'].includes(extension)) {
            return <PiFileHtmlDuotone className={`${iconSize} text-orange-500`} />;
        }

        if (['css'].includes(extension)) {
            return <PiFileCssDuotone className={`${iconSize} text-blue-400`} />;
        }

        if (['js', 'jsx', 'ts', 'tsx'].includes(extension)) {
            return <PiFileJsDuotone className={`${iconSize} text-yellow-500`} />;
        }

        if (['php', 'py', 'java', 'cpp', 'c', 'cs', 'rb', 'go', 'rs'].includes(extension)) {
            return <PiFileCodeDuotone className={`${iconSize} text-purple-500`} />;
        }

        // Text files
        if (mimeType.startsWith('text/') || ['txt', 'log', 'md', 'readme'].includes(extension)) {
            return <PiFileTextDuotone className={`${iconSize} text-gray-600`} />;
        }

        // Default file icon
        return <PiFileDuotone className={`${iconSize} text-gray-500`} />;
    };

    const gridCols = variant === 'modal'
        ? 'grid-cols-1 sm:grid-cols-3 md:grid-cols-4'
        : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';

    return (
        <div className={`grid ${gridCols} gap-3`}>
            {media.map((item) => (
                <div
                    key={item.id}
                    className={`relative group cursor-pointer border-2 rounded-lg p-2 transition-all hover:shadow-md ${
                        selectedMedia?.id === item.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => onSelect(item)}
                >
                    <div className="aspect-square bg-gray-50 rounded flex items-center justify-center overflow-hidden mb-2">
                        {getFileIcon(item)}
                    </div>
                    <div className="text-xs text-center">
                        <div className="font-medium truncate" title={item.name}>
                            {item.name}
                        </div>
                        <div className="text-muted-foreground">
                            {formatFileSize(item.size)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export type MediaType = 'images' | 'files' | 'all';

interface MediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect?: (media: Media) => void;
    selectedMedia?: Media | null;
    mediaType?: MediaType;
    title?: string;
}

export const MediaModal = ({
                               isOpen,
                               onClose,
                               onSelect,
                               selectedMedia,
                               mediaType = 'all',
                               title = 'Media Library'
                           }: MediaModalProps) => {
    const [paginatedMedia, setPaginatedMedia] = useState<PaginatedMedia | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        per_page: 20,
        sort_by: 'created_at',
        sort_order: 'desc',
        search: '',
        page: 1,
        media_type: mediaType,
    });

    // Debounced search function
    const debouncedSearch = useDebouncedCallback(
        (value: string) => {
            setFilters(prev => ({
                ...prev,
                search: value,
                page: 1, // Reset to first page when searching
            }));
        },
        500
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm]);

    // Update filters when mediaType prop changes
    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            media_type: mediaType,
            page: 1,
        }));
    }, [mediaType]);

    const fetchMedia = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(route("admin.media.index"), {
                params: filters
            });

            if (response.data.status) {
                const data = response.data.data;

                // Filter data based on media type
                let filteredData = data.data;

                if (filters.media_type === 'images') {
                    filteredData = data.data.filter((item: Media) =>
                        item.mime_type?.startsWith('image/')
                    );
                } else if (filters.media_type === 'files') {
                    filteredData = data.data.filter((item: Media) =>
                        !item.mime_type?.startsWith('image/')
                    );
                }

                setPaginatedMedia({
                    ...data,
                    data: filteredData
                });
            }
        } catch (error) {
            toast.error("Failed to fetch media");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchMedia();
        }
    }, [isOpen, filters]);

    useEffect(() => {
        const eventName = ".notification.uploaded";
        const echoInstance = (window as any).Echo;

        const channel = echoInstance.channel(`media`);

        channel.listen(eventName, (data: any) => {
            // Refresh the first page after upload
            if (filters.page === 1) {
                fetchMedia();
            }
        });

        return () => {
            echoInstance.leave("media");
        };
    }, [filters.page]);

    const getAcceptedFileTypes = () => {
        switch (mediaType) {
            case 'images':
                return 'image/*';
            case 'files':
                return '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar';
            default:
                return '*/*';
        }
    };

    const getUploadText = () => {
        switch (mediaType) {
            case 'images':
                return {
                    title: 'Drop your images here',
                    subtitle: 'or click to browse images',
                    accept: 'PNG, JPG, GIF, WebP up to 10MB'
                };
            case 'files':
                return {
                    title: 'Drop your files here',
                    subtitle: 'or click to browse files',
                    accept: 'PDF, DOC, XLS, PPT, TXT, ZIP up to 10MB'
                };
            default:
                return {
                    title: 'Drop your files here',
                    subtitle: 'or click to browse',
                    accept: 'Any file type up to 10MB'
                };
        }
    };

    const handleFileUpload = async (files: FileList | null) => {
        if (!files?.length) return;

        // Validate file type based on mediaType
        const file = files[0];
        if (mediaType === 'images' && !file.type.startsWith('image/')) {
            toast.error('Please select only image files');
            return;
        }
        if (mediaType === 'files' && file.type.startsWith('image/')) {
            toast.error('Please select only non-image files');
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post(
                route("admin.media.store"),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.status) {
                toast.success("File uploaded successfully");
                // Refresh media list after upload
                fetchMedia();
            }
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    const handlePerPageChange = (perPage: string) => {
        setFilters(prev => ({
            ...prev,
            per_page: parseInt(perPage),
            page: 1,
        }));
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    const getPageNumbers = () => {
        if (!paginatedMedia) return [];

        const { current_page, last_page } = paginatedMedia;
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        const start = Math.max(1, current_page - delta);
        const end = Math.min(last_page, current_page + delta);

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (start > 1) {
            rangeWithDots.push(1);
            if (start > 2) {
                rangeWithDots.push('...');
            }
        }

        rangeWithDots.push(...range);

        if (end < last_page) {
            if (end < last_page - 1) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(last_page);
        }

        return rangeWithDots;
    };

    const getModalTitle = () => {
        if (title !== 'Media Library') return title;

        switch (mediaType) {
            case 'images':
                return 'Select Image';
            case 'files':
                return 'Select File';
            default:
                return 'Media Library';
        }
    };

    const uploadText = getUploadText();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl ">
                <DialogHeader>
                    <DialogTitle>{getModalTitle()}</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="library" className="flex flex-col h-full">
                    <TabsList>
                        <TabsTrigger value="library">
                            {mediaType === 'images' ? 'Image Library' :
                                mediaType === 'files' ? 'File Library' : 'Media Library'}
                        </TabsTrigger>
                        <TabsTrigger value="upload">
                            {mediaType === 'images' ? 'Upload Image' :
                                mediaType === 'files' ? 'Upload File' : 'Upload'}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="library" className="flex-1 mt-0 space-y-4">
                        {/* Search and Controls */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                            <div className="relative flex-1 max-w-md">
                                <PiMagnifyingGlassDuotone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={`Search ${mediaType === 'images' ? 'images' : mediaType === 'files' ? 'files' : 'media'}...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8"
                                />
                                {searchTerm && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearSearch}
                                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                    >
                                        ×
                                    </Button>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Show:</span>
                                <Select
                                    value={filters.per_page.toString()}
                                    onValueChange={handlePerPageChange}
                                >
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="6">6</SelectItem>
                                        <SelectItem value="12">12</SelectItem>
                                        <SelectItem value="24">24</SelectItem>
                                        <SelectItem value="48">48</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Results Info */}
                        {paginatedMedia && (
                            <div className="text-sm text-muted-foreground">
                                Showing {paginatedMedia.from || 1} to {paginatedMedia.to || 0} of {paginatedMedia.total || 0} {mediaType === 'images' ? 'images' : mediaType === 'files' ? 'files' : 'items'}
                                {searchTerm && ` for "${searchTerm}"`}
                            </div>
                        )}

                        {/* Media Content */}
                        <div className="flex-1 overflow-hidden">
                            {isLoading ? (
                                <div className="flex justify-center items-center h-48">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            ) : paginatedMedia && paginatedMedia.data.length > 0 ? (
                                <ScrollArea className="h-[calc(85vh-16rem)] pr-4">
                                    <MediaGrid
                                        media={paginatedMedia.data}
                                        selectedMedia={selectedMedia}
                                        onSelect={onSelect || (() => {})}
                                    />
                                </ScrollArea>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-muted-foreground">
                                        {searchTerm ?
                                            `No ${mediaType === 'images' ? 'images' : mediaType === 'files' ? 'files' : 'media'} found matching your search.` :
                                            `No ${mediaType === 'images' ? 'images' : mediaType === 'files' ? 'files' : 'media files'} available.`
                                        }
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {paginatedMedia && paginatedMedia.last_page > 1 && (
                            <div className="flex items-center justify-between pt-4 border-t">
                                <div className="text-sm text-muted-foreground">
                                    Page {paginatedMedia.current_page} of {paginatedMedia.last_page}
                                </div>

                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(paginatedMedia.current_page - 1)}
                                        disabled={paginatedMedia.current_page === 1}
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    {getPageNumbers().map((pageNum, index) => {
                                        if (pageNum === '...') {
                                            return (
                                                <span key={`dots-${index}`} className="px-2 text-sm text-muted-foreground">
                                                    ...
                                                </span>
                                            );
                                        }

                                        const page = pageNum as number;
                                        const isActive = page === paginatedMedia.current_page;

                                        return (
                                            <Button
                                                key={page}
                                                variant={isActive ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => handlePageChange(page)}
                                                className="h-8 w-8 p-0"
                                            >
                                                {page}
                                            </Button>
                                        );
                                    })}

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(paginatedMedia.current_page + 1)}
                                        disabled={paginatedMedia.current_page === paginatedMedia.last_page}
                                        className="h-8 w-8 p-0"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="upload" className="flex-1 mt-0">
                        <div className="h-[calc(85vh-12rem)] flex flex-col items-center justify-center border-2 border-dashed rounded-lg">
                            <div className="text-center space-y-4">
                                <div
                                    className="space-y-2"
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        handleFileUpload(e.dataTransfer.files);
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {isUploading ? (
                                        <div className="flex flex-col items-center">
                                            <Loader2 className="size-8 animate-spin" />
                                            <p className="mt-2">Uploading...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <PiUploadSimpleDuotone className="size-12 mx-auto mb-4 text-muted-foreground" />
                                            <h3 className="text-lg font-semibold mb-2">
                                                {uploadText.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {uploadText.subtitle}
                                            </p>
                                            <p className="text-xs text-muted-foreground mb-4">
                                                {uploadText.accept}
                                            </p>
                                            <Input
                                                type="file"
                                                className="hidden"
                                                id="file-upload"
                                                accept={getAcceptedFileTypes()}
                                                onChange={(e) =>
                                                    handleFileUpload(
                                                        e.target.files
                                                    )
                                                }
                                            />
                                            <Button asChild>
                                                <label htmlFor="file-upload">
                                                    {mediaType === 'images' ? 'Choose Images' :
                                                        mediaType === 'files' ? 'Choose Files' : 'Choose Files'}
                                                </label>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Footer with Select Button */}
                {onSelect && (
                    <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                            {selectedMedia ? `Selected: ${selectedMedia.name}` :
                                `No ${mediaType === 'images' ? 'image' : mediaType === 'files' ? 'file' : 'media'} selected`}
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    if (selectedMedia && onSelect) {
                                        onSelect(selectedMedia);
                                        onClose();
                                    }
                                }}
                                disabled={!selectedMedia}
                            >
                                {mediaType === 'images' ? 'Select Image' :
                                    mediaType === 'files' ? 'Select File' : 'Select Media'}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};
