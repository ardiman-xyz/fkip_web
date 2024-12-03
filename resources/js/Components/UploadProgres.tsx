import { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { usePage } from "@inertiajs/react";

interface UploadItem {
    uploadId: string;
    fileName: string;
    progress: number;
    isComplete: boolean;
    error?: string;
    completedAt?: number;
}

export const UploadProgress = () => {
    const [uploads, setUploads] = useState<UploadItem[]>([]);
    const [isMinimized, setIsMinimized] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        const echoInstance = (window as any).Echo;
        const eventName = ".media.upload";

        // Subscribe ke private channel
        const channel = echoInstance.private(`App.User.${auth.user.id}`);

        channel.listen(eventName, (event: any) => {
            setUploads((prev) => {
                // Update existing upload or add new one
                const index = prev.findIndex(
                    (u) =>
                        u.uploadId === event.uploadId &&
                        u.fileName === event.fileName
                );

                if (index >= 0) {
                    const newUploads = [...prev];
                    newUploads[index] = {
                        ...newUploads[index],
                        progress: event.progress,
                        isComplete: event.isComplete,
                        error: event.error,
                        ...(event.isComplete
                            ? { completedAt: Date.now() }
                            : {}),
                    };
                    return newUploads;
                }

                return [
                    ...prev,
                    {
                        uploadId: event.uploadId,
                        fileName: event.fileName,
                        progress: event.progress,
                        isComplete: event.isComplete,
                        error: event.error,
                        ...(event.isComplete
                            ? { completedAt: Date.now() }
                            : {}),
                    },
                ];
            });
        });

        return () => {
            channel.stopListening(eventName);
        };
    }, []);

    // Remove completed uploads after 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setUploads((prev) =>
                prev.filter(
                    (u) =>
                        !u.isComplete ||
                        !u.completedAt ||
                        Date.now() - u.completedAt < 3000
                )
            );
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (uploads.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                        {isMinimized ? "Uploading..." : "Upload Progress"}
                    </h3>
                    <span className="text-sm text-gray-500">
                        {uploads.filter((u) => !u.isComplete).length} remaining
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        {isMinimized ? "Show" : "Hide"}
                    </button>
                    {!isMinimized && uploads.every((u) => u.isComplete) && (
                        <button
                            onClick={() => setUploads([])}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <X className="size-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Upload List */}
            {!isMinimized && (
                <div className="max-h-60 overflow-y-auto p-2 space-y-2">
                    {uploads.map((upload) => (
                        <div
                            key={`${upload.uploadId}-${upload.fileName}`}
                            className="space-y-1"
                        >
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 truncate">
                                    {upload.isComplete ? (
                                        <CheckCircle className="size-4 text-green-500" />
                                    ) : upload.error ? (
                                        <AlertCircle className="size-4 text-red-500" />
                                    ) : null}
                                    <span
                                        className="truncate"
                                        title={upload.fileName}
                                    >
                                        {upload.fileName}
                                    </span>
                                </div>
                                <span>{upload.progress}%</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-300 ${
                                        upload.error
                                            ? "bg-red-500"
                                            : upload.isComplete
                                            ? "bg-green-500"
                                            : "bg-blue-500"
                                    }`}
                                    style={{ width: `${upload.progress}%` }}
                                />
                            </div>
                            {upload.error && (
                                <p className="text-xs text-red-500">
                                    {upload.error}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
