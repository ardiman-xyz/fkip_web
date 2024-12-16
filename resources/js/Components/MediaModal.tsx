import {
    PiImage,
    PiMagnifyingGlassDuotone,
    PiUpload,
    PiUploadSimpleDuotone,
} from "react-icons/pi";
import { Check, FileIcon, Loader2, Search, Upload } from "lucide-react";
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
import { formatFileSize } from "@/lib/utils";
import { Media } from "@/types/app";

interface MediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect?: (media: Media) => void;
    selectedMedia?: Media | null; // Tambahkan ini
}

export const MediaModal = ({
    isOpen,
    onClose,
    onSelect,
    selectedMedia,
}: MediaModalProps) => {
    const [medias, setMedias] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const initialLoadRef = useRef(false);

    const fetchMedia = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(route("admin.media.index"));
            if (response.data.status) {
                setMedias(response.data.data);
            }
        } catch (error) {
            toast.error("Failed to fetch media");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && !initialLoadRef.current) {
            fetchMedia();
            initialLoadRef.current = true;
        }
    }, [isOpen]);

    useEffect(() => {
        const eventName = ".notification.uploaded";
        const echoInstance = (window as any).Echo;

        echoInstance.channel(`media`).listen(eventName, (data: any) => {
            setMedias((prev) => [data.media, ...prev]);
        });

        return () => {
            echoInstance.leave("media");
        };
    }, []);

    const handleFileUpload = async (files: FileList | null) => {
        if (!files?.length) return;

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", files[0]);

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
            }
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Media Library</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="library" className="flex flex-col h-full">
                    <TabsList>
                        <TabsTrigger value="library">Media Library</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                    <div className="my-4">
                        <div className="relative">
                            <PiMagnifyingGlassDuotone className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search media..."
                                className="pl-8"
                            />
                        </div>
                    </div>
                    <TabsContent value="library" className="flex-1 mt-0">
                        <ScrollArea className="h-[calc(80vh-12rem)] pr-4">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {medias.map((media) => (
                                    <div
                                        key={media.id}
                                        className={`group relative aspect-video rounded-lg overflow-hidden border-2 cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
                                            selectedMedia?.id === media.id
                                                ? "ring-2 ring-primary"
                                                : ""
                                        }`}
                                        onClick={() => onSelect?.(media)}
                                    >
                                        {media.mime_type.startsWith(
                                            "image/"
                                        ) ? (
                                            <img
                                                src={media.path}
                                                alt={media.name}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                                <FileIcon className="h-12 w-12 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-white">
                                            <p className="truncate font-medium">
                                                {media.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {formatFileSize(media.size)}
                                            </p>
                                        </div>
                                        {/* Tambahkan indikator selected */}
                                        {selectedMedia?.id === media.id && (
                                            <div className="absolute top-2 right-2">
                                                <div className="bg-primary text-primary-foreground rounded-full p-1">
                                                    <Check className="h-4 w-4" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="upload" className="flex-1 mt-0">
                        <div className="h-[calc(80vh-12rem)] flex flex-col items-center justify-center border-2 border-dashed rounded-lg">
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
                                                Drop your files here
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                or click to browse
                                            </p>
                                            <Input
                                                type="file"
                                                className="hidden"
                                                id="file-upload"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleFileUpload(
                                                        e.target.files
                                                    )
                                                }
                                            />
                                            <Button asChild>
                                                <label htmlFor="file-upload">
                                                    Choose Files
                                                </label>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
