import { useState } from "react";
import {
    Upload,
    Image as ImageIcon,
    Trash2,
    Pencil,
    Search,
    X,
    Upload as UploadIcon,
    UploadCloud,
    Loader,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { formatFileSize } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export const UploadModalMedia = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prev) => [...prev, ...droppedFiles]);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setFiles((prev) => [...prev, ...selectedFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    if (!isOpen) return null;

    const handleUpload = async () => {
        setIsLoading(true);
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files[]", file);
        });

        try {
            const response = await axios.post(
                route("admin.media.storeBatch"),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.status) {
                toast("All files are being uploaded ...");
                onClose();
                setFiles([]);
            } else if (response.data.status === "partial_success") {
                toast.warning(
                    `${response.data.data.uploaded.length} files uploaded, ${response.data.data.failed.length} failed`
                );
                response.data.data.failed.forEach((fail: any) => {
                    toast.error(`Failed to upload ${fail.file}: ${fail.error}`);
                });
            }
        } catch (error: any) {
            if (error.response) {
                toast.error(
                    `Server error: ${error.response.status} - ${
                        error.response.data.message || "Something went wrong"
                    }`
                );
            } else if (error.request) {
                toast.error("No response from server. Please try again later.");
            } else {
                toast.error(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Upload Media</DialogTitle>
                </DialogHeader>

                <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center
                        ${
                            dragActive
                                ? "border-black bg-gray-50"
                                : "border-gray-300"
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        multiple
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="*/*"
                    />
                    <UploadCloud className="mx-auto size-8 mb-3 text-gray-400" />
                    <p className="text-sm mb-1">
                        <span className="font-medium">Click to upload</span> or
                        drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 2MB
                    </p>
                </div>

                {files.length > 0 && (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <ImageIcon className="size-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {formatFileSize(file.size)}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="p-1 hover:bg-gray-200 rounded-md"
                                >
                                    <Trash2 className="size-4 text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <DialogFooter>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={files.length === 0 || isLoading}
                        className="px-4 py-2 text-sm flex items-center  bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading && (
                            <Loader className="mr-2 size-4 animate-spin" />
                        )}
                        Upload Files
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
