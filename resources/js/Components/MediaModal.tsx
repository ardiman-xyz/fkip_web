// components/MediaLibrary/MediaModal.tsx
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { PiImage, PiUpload } from "react-icons/pi";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface Media {
    id: number;
    name: string;
    file_name: string;
    mime_type: string;
    path: string;
    size: number;
    url: string;
    created_at: string;
    updated_at: string;
}
interface MediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect?: (media: Media) => void;
}

export const MediaModal = ({ isOpen, onClose, onSelect }: MediaModalProps) => {
    const [medias, setMedias] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

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

    // useEffect(() => {
    //     if (isOpen) {
    //         fetchMedia();
    //     }
    // }, [isOpen]);

    useEffect(() => {
        const eventName = ".notification.uploaded";
        const echoInstance = (window as any).Echo;

        echoInstance.channel(`media`).listen(eventName, (data: any) => {
            console.info("New media:", data);
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
            <DialogContent className="max-w-4xl h-[600px]">
                <DialogHeader>
                    <DialogTitle>Media Library</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="library" className="flex flex-col h-full">
                    <TabsList>
                        <TabsTrigger value="library">Media Library</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>

                    {/* Library Tab */}
                    <TabsContent value="library" className="flex-1">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-4">
                                <Input
                                    placeholder="Search media..."
                                    className="max-w-sm"
                                />
                            </div>

                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="size-8 animate-spin" />
                                </div>
                            ) : (
                                <div className="grid grid-cols-4 gap-4 overflow-y-auto p-1">
                                    {medias.map((media) => (
                                        <div
                                            key={media.id}
                                            className="group relative aspect-square cursor-pointer rounded-md overflow-hidden"
                                            onClick={() => onSelect?.(media)}
                                        >
                                            <img
                                                src={`/storage/${media.path}`}
                                                alt={media.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                >
                                                    Select
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* Upload Tab */}
                    <TabsContent value="upload">
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <div
                                className="border-2 border-dashed rounded-lg p-12 text-center"
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
                                        <PiUpload className="size-12 mx-auto mb-4 text-muted-foreground" />
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
                                                handleFileUpload(e.target.files)
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
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};
