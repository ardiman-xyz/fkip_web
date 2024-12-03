import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Media } from "@/types/app";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    PiImageDuotone,
    PiPencilDuotone,
    PiTrashDuotone,
    PiUploadSimpleDuotone,
} from "react-icons/pi";
import { UploadModalMedia } from "./_components/UploadModal";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import { MediaItem } from "./_components/MediaItem";
import { PageProps } from "@/types";

interface Props {
    media: Media[];
}

const MediaLibrary = ({ media: initialMedia }: Props) => {
    const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
    const [viewType, setViewType] = useState<"grid" | "list">("grid");

    const [media, setMedia] = useState<Media[]>(initialMedia);

    const { auth } = usePage<PageProps>().props;

    useEffect(() => {
        const echoInstance = (window as any).Echo;
        const eventName = ".media.upload";

        // Subscribe ke private channel
        const channel = echoInstance.private(`App.User.${auth.user.id}`);

        channel.listen(eventName, (event: any) => {
            if (event.isComplete && event.media) {
                setMedia((prev) => [event.media, ...prev]);
            }
        });

        return () => {
            channel.stopListening(eventName);
        };
    }, []);

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
                        <Button variant="outline" size="sm">
                            Type
                            <ChevronDown className="ml-2 size-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                            Date Modified
                            <ChevronDown className="ml-2 size-4" />
                        </Button>
                        <Button
                            size={"lg"}
                            onClick={() => setIsUploadOpen(true)}
                        >
                            <PiUploadSimpleDuotone className="mr-2 size-4" />
                            Upload Media
                        </Button>
                    </div>
                </div>
                {viewType === "grid" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {media.map((item) => (
                            <div
                                key={item.id}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                            >
                                <MediaItem item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="divide-y">
                        {media.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center py-2 px-4 hover:bg-gray-50"
                            >
                                <MediaItem item={item} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <UploadModalMedia
                isOpen={isUploadOpen}
                onClose={() => setIsUploadOpen(false)}
            />
        </AuthenticatedLayout>
    );
};

export default MediaLibrary;
