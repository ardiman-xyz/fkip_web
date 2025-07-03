import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Media } from "@/types/app";
import { Head, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PiUploadSimpleDuotone } from "react-icons/pi";
import { UploadModalMedia } from "./_components/UploadModal";
import { MediaPagination } from "./_components/MediaPagination";
import {
    ChevronDown,
    LayoutGrid,
    List,
    Search,
} from "lucide-react";
import { MediaItem } from "./_components/MediaItem";
import { MediaListView } from "./_components/MediaListView";
import { PageProps } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
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

interface Props {
    media: PaginatedMedia;
    filters: {
        per_page: number;
        sort_by: string;
        sort_order: string;
        search?: string;
    };
}

const MediaLibrary = ({ media: paginatedMedia, filters }: Props) => {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
    const [viewType, setViewType] = useState<"grid" | "list">("grid");
    const [searchTerm, setSearchTerm] = useState<string>(filters.search || "");
    const [mediaData, setMediaData] = useState<Media[]>(paginatedMedia.data);

    const { auth } = usePage<PageProps>().props;

    // Debounced search function
    const debouncedSearch = useDebouncedCallback(
        (value: string) => {
            router.get(route('admin.media.indexView'), {
                ...filters,
                search: value || undefined,
                page: 1,
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        },
        500
    );

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm]);

    useEffect(() => {
        setMediaData(paginatedMedia.data);
    }, [paginatedMedia.data]);

    useEffect(() => {
        const echoInstance = (window as any).Echo;
        const eventName = ".media.upload";

        const channel = echoInstance.private(`App.User.${auth.user.id}`);

        channel.listen(eventName, (event: any) => {
            if (event.isComplete && event.media) {
                // Add new media to the beginning of the current data
                setMediaData(prevData => [event.media, ...prevData]);
            }
        });

        return () => {
            channel.stopListening(eventName);
        };
    }, []);

    const handleDelete = (id: number) => {
        setMediaData(prevData => prevData.filter(item => item.id !== id));
    };

    const handleUpdate = (updatedMedia: Media) => {
        setMediaData(prevData =>
            prevData.map(item =>
                item.id === updatedMedia.id ? updatedMedia : item
            )
        );
    };

    const handleSortMedia = (sortBy: string, sortOrder: "asc" | "desc") => {
        router.get(route('admin.media.indexView'), {
            ...filters,
            sort_by: sortBy,
            sort_order: sortOrder,
            page: 1,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearSearch = () => {
        setSearchTerm("");
    };



    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-medium">Media Library</h2>
                </div>
            }
        >
            <Head title="Media" />

            <div className="p-6">
                {/* Header Controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        {/* View Type Toggles */}
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => setViewType("grid")}
                                variant={
                                    viewType === "grid" ? "secondary" : "ghost"
                                }
                                size="icon"
                            >
                                <LayoutGrid className="size-4" />
                            </Button>
                            <Button
                                onClick={() => setViewType("list")}
                                variant={
                                    viewType === "list" ? "secondary" : "ghost"
                                }
                                size="icon"
                            >
                                <List className="size-4" />
                            </Button>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search media..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 w-64"
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
                    </div>

                    <div className="flex items-center gap-x-3">
                        {/* Sort Controls */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Sort by: {filters.sort_by === 'created_at' ? 'Date' : filters.sort_by === 'name' ? 'Name' : 'Size'}
                                    <ChevronDown className="ml-2 size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={() => handleSortMedia("created_at", "desc")}
                                >
                                    Newest First
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleSortMedia("created_at", "asc")}
                                >
                                    Oldest First
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleSortMedia("name", "asc")}
                                >
                                    Name A-Z
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleSortMedia("name", "desc")}
                                >
                                    Name Z-A
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleSortMedia("size", "desc")}
                                >
                                    Largest First
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleSortMedia("size", "asc")}
                                >
                                    Smallest First
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button
                            size={"lg"}
                            onClick={() => setIsUploadOpen(true)}
                        >
                            <PiUploadSimpleDuotone className="mr-2 size-4" />
                            Upload Media
                        </Button>
                    </div>
                </div>

                {/* Results Info */}
                {searchTerm && (
                    <div className="mb-4 text-sm text-muted-foreground">
                        {paginatedMedia.total > 0 ? (
                            <>Found {paginatedMedia.total} result{paginatedMedia.total !== 1 ? 's' : ''} for "{searchTerm}"</>
                        ) : (
                            <>No results found for "{searchTerm}"</>
                        )}
                    </div>
                )}

                {/* Media Display */}
                {mediaData.length > 0 ? (
                    <>
                        {viewType === "list" ? (
                            <MediaListView
                                media={mediaData}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                            />
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {mediaData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                    >
                                        <MediaItem
                                            item={item}
                                            onDelete={handleDelete}
                                            handleUpdate={handleUpdate}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <MediaPagination
                            paginationData={paginatedMedia}
                            filters={filters}
                        />
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-muted-foreground">
                            {searchTerm ? 'No media found matching your search.' : 'No media files yet.'}
                        </div>
                        {!searchTerm && (
                            <Button
                                onClick={() => setIsUploadOpen(true)}
                                className="mt-4"
                            >
                                <PiUploadSimpleDuotone className="mr-2 size-4" />
                                Upload your first media
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <UploadModalMedia
                isOpen={isUploadOpen}
                onClose={() => {
                    setIsUploadOpen(false);
                }}
            />
        </AuthenticatedLayout>
    );
};

export default MediaLibrary;
