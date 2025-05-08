import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Media } from "@/types/app";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PiUploadSimpleDuotone, PiImageDuotone } from "react-icons/pi";
import { UploadModalMedia } from "./_components/UploadModal";
import {
    ChevronDown,
    Eye,
    LayoutGrid,
    List,
    MoreVertical,
    Pencil,
    Trash,
} from "lucide-react";
import { MediaItem } from "./_components/MediaItem";
import { PageProps } from "@/types";
import { formatDateToIndonesian, formatFileSize } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { DeleteConfirm } from "@/Components/ModalDeleteConfirmation";
import { ViewMediaModal } from "./_components/ViewMediaModal";
import { MediaPagination } from "@/Components/Pagination";

interface Props {
    media: Media[];
}

const MediaLibrary = ({ media: initialMedia }: Props) => {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
    const [viewType, setViewType] = useState<"grid" | "list">("grid");
    const [media, setMedia] = useState<Media[]>(initialMedia);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20; // Jumlah item per halaman
    const totalPages = Math.ceil(media.length / itemsPerPage);

    // 3. Tambahkan fungsi untuk mendapatkan media yang dipaginasi
    const getPaginatedMedia = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return media.slice(startIndex, endIndex);
    };

    // 4. Tambahkan fungsi untuk menangani perubahan halaman
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll ke atas halaman jika diperlukan
        window.scrollTo(0, 0);
    };

    // New state variables for list view functionality
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

    const { auth } = usePage<PageProps>().props;

    useEffect(() => {
        const echoInstance = (window as any).Echo;
        const eventName = ".media.upload";

        // Subscribe ke private channel
        const channel = echoInstance.private(`App.User.${auth.user.id}`);

        channel.listen(eventName, (event: any) => {
            if (event.isComplete && event.media) {
                setMedia((prev) => {
                    const newMedia = [event.media, ...prev];

                    // Apply current sort order to the updated media array
                    if (sortOrder === "newest") {
                        return newMedia.sort((a, b) => {
                            return (
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                            );
                        });
                    } else {
                        return newMedia.sort((a, b) => {
                            return (
                                new Date(a.created_at).getTime() -
                                new Date(b.created_at).getTime()
                            );
                        });
                    }
                });
            }
        });

        return () => {
            channel.stopListening(eventName);
        };
    }, [sortOrder]);

    const handleDelete = (id: number) => {
        setMedia((prev) => prev.filter((item) => item.id !== id));
    };

    const handleUpdate = (updatedMedia: Media) => {
        setMedia((prev) =>
            prev.map((item) =>
                item.id === updatedMedia.id ? updatedMedia : item
            )
        );
    };

    const handleSortMedia = (order: "newest" | "oldest") => {
        setSortOrder(order);
        setMedia((prev) => {
            const sortedMedia = [...prev].sort((a, b) => {
                const dateA = new Date(a.created_at).getTime();
                const dateB = new Date(b.created_at).getTime();
                return order === "newest" ? dateB - dateA : dateA - dateB;
            });
            return sortedMedia;
        });
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
                <div className="flex items-center justify-between mb-6">
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

                    <div className="flex items-center gap-x-3">
                        <Button variant="outline" size="sm" disabled>
                            Type
                            <ChevronDown className="ml-2 size-4" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Date Modified
                                    <ChevronDown className="ml-2 size-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem
                                    onClick={() => handleSortMedia("newest")}
                                >
                                    Newest First
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleSortMedia("oldest")}
                                >
                                    Oldest First
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

                {viewType === "list" ? (
                    <div className="rounded-md border overflow-hidden">
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
                        <div className="divide-y">
                            {media.map((item) => (
                                <div
                                    key={item.id}
                                    className="animate-in fade-in duration-300 hover:bg-muted/20 group"
                                >
                                    <div
                                        className="flex items-center py-2 px-4"
                                        onDoubleClick={() => {
                                            setSelectedMedia(item);
                                            setIsViewModalOpen(true);
                                        }}
                                    >
                                        <div className="w-12 h-12 mr-4 flex-shrink-0 bg-white border rounded flex items-center justify-center overflow-hidden">
                                            {item.mime_type?.includes(
                                                "image"
                                            ) ? (
                                                <img
                                                    src={item.path}
                                                    alt={item.name}
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            ) : (
                                                <PiImageDuotone className="size-6 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div
                                            className="flex-1 mr-4 truncate font-medium"
                                            title={item.name}
                                        >
                                            {item.name}
                                        </div>
                                        <div className="w-24 mr-4 text-sm text-muted-foreground text-center">
                                            {item.mime_type
                                                ?.split("/")[1]
                                                ?.toUpperCase() || "Unknown"}
                                        </div>
                                        <div className="w-24 mr-4 text-sm text-muted-foreground text-center">
                                            {formatFileSize(item.size)}
                                        </div>
                                        <div className="w-32 mr-4 text-sm text-muted-foreground text-center">
                                            {formatDateToIndonesian(
                                                item.created_at
                                            )}
                                        </div>
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
                                                        onClick={() => {
                                                            setSelectedMedia(
                                                                item
                                                            );
                                                            setIsViewModalOpen(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <Eye className="size-4 mr-2" />
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedMedia(
                                                                item
                                                            );
                                                            setIsViewModalOpen(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <Pencil className="size-4 mr-2" />
                                                        Rename
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedMedia(
                                                                item
                                                            );
                                                            setIsModalDeleteOpen(
                                                                true
                                                            );
                                                        }}
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
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {media.map((item) => (
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
            </div>

            <UploadModalMedia
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
            />

            {selectedMedia && (
                <>
                    {isModalDeleteOpen && (
                        <DeleteConfirm
                            onClose={(success) => {
                                if (success) {
                                    handleDelete(selectedMedia.id);
                                }
                                setIsModalDeleteOpen(false);
                                setSelectedMedia(null);
                            }}
                            id={selectedMedia.id}
                            routeAction="admin.media.destroy"
                        />
                    )}

                    <ViewMediaModal
                        media={selectedMedia}
                        isOpen={isViewModalOpen}
                        onClose={() => {
                            setIsViewModalOpen(false);
                            setSelectedMedia(null);
                        }}
                        onUpdate={handleUpdate}
                    />
                </>
            )}
        </AuthenticatedLayout>
    );
};

export default MediaLibrary;
