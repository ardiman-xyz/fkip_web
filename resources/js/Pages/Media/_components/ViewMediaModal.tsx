import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useRef, useState } from "react";
import { Media } from "@/types/app";
import { formatDateToIndonesian, formatFileSize } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { PiImageDuotone } from "react-icons/pi";
import axios from "axios";
import { Expand, Trash2 } from "lucide-react";
import { DeleteConfirm } from "@/Components/DeleteConfirmation";

interface ViewMediaModalProps {
    media: Media;
    isOpen: boolean;
    onClose: () => void;
    onUpdate?: (updatedMedia: Media) => void;
}

export const ViewMediaModal = ({
    media,
    isOpen,
    onClose,
    onUpdate,
}: ViewMediaModalProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(media.name);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const copyButtonRef = useRef<HTMLButtonElement>(null);

    const handleRename = async () => {
        if (newName === media.name) return;

        setIsSubmitting(true);
        try {
            const response = await axios.put(
                route("admin.media.update", media.id),
                {
                    name: newName,
                }
            );

            const updatedMedia = response.data.data;
            setNewName(updatedMedia.name);
            onUpdate?.(updatedMedia);

            toast.success("Media renamed successfully");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to rename media");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleFullscreen = () => {
        if (media.mime_type?.includes("image")) {
            window.open(media.url, "_blank");
        }
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(media.url);
        toast.success("URL copied to clipboard");

        if (copyButtonRef.current) {
            copyButtonRef.current.disabled = true;
            setTimeout(() => {
                if (copyButtonRef.current) {
                    copyButtonRef.current.disabled = false;
                }
            }, 2000);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-6xl">
                <div className="flex gap-6 h-[80vh]">
                    <div className="flex-1 relative group">
                        <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                variant="outline"
                                size="icon"
                                className="bg-white hover:bg-gray-100"
                                onClick={toggleFullscreen}
                            >
                                <Expand className="size-4" />
                            </Button>
                        </div>

                        <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center p-4">
                            {media.mime_type?.includes("image") ? (
                                <img
                                    src={media.url}
                                    alt={media.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <PiImageDuotone className="size-16 text-muted-foreground" />
                                    <p className="text-sm font-semibold text-muted-foreground mt-2">
                                        No Image Preview
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-80 flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">
                            File Information
                        </h3>

                        {/* Name with Edit */}
                        <div className="space-y-2 mb-6">
                            <label className="text-sm font-medium text-gray-500">
                                Name
                            </label>
                            {isEditing ? (
                                <div className="flex gap-2">
                                    <Input
                                        value={newName}
                                        onChange={(e) =>
                                            setNewName(e.target.value)
                                        }
                                        className="flex-1"
                                    />
                                    <div className="space-x-1">
                                        <Button
                                            size="sm"
                                            onClick={handleRename}
                                            disabled={
                                                isSubmitting ||
                                                newName === media.name
                                            }
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setNewName(media.name);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <p className="text-sm truncate">
                                        {media.name}
                                    </p>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Other Information */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Type
                                </label>
                                <p className="text-sm">{media.mime_type}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Size
                                </label>
                                <p className="text-sm">
                                    {formatFileSize(media.size)}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Uploaded
                                </label>
                                <p className="text-sm">
                                    {formatDateToIndonesian(media.created_at)}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    URL
                                </label>
                                <div className="flex gap-2 items-center">
                                    <Input
                                        value={media.url}
                                        readOnly
                                        className="text-sm"
                                    />
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleCopyUrl}
                                        ref={copyButtonRef}
                                    >
                                        Copy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
