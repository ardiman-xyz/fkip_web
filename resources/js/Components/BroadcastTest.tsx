import { useState, useEffect } from "react";
import { toast } from "sonner";
import { usePage } from "@inertiajs/react";

export const BroadcastTest = () => {
    const { auth } = usePage().props;
    const [lastPing, setLastPing] = useState<string | null>(null);
    const [status, setStatus] = useState("Connecting...");
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const echoInstance = (window as any).Echo;
        const eventName = ".media.upload";

        // Subscribe ke private channel
        const channel = echoInstance.private(`App.User.${auth.user.id}`);

        // Listen untuk subscription success
        channel.subscribed(() => {
            console.log("Successfully subscribed to private channel");
            setStatus("Subscribed to private channel");
            toast.success("Subscribed to private channel");
        });

        // Listen untuk event MediaUploadProgress
        channel.listen(eventName, (event: any) => {
            const message = `File: ${event.fileName}, Progress: ${event.progress}%`;
            setMessages((prev) => [message, ...prev]);
            setLastPing(new Date().toLocaleTimeString());
        });

        // Cleanup listener saat komponen unmount
        return () => {
            channel.stopListening(eventName);
        };
    }, []);

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg">
            <div className="p-3 border-b">
                <h3 className="font-medium">Broadcast Test</h3>
            </div>

            <div className="p-4 space-y-3">
                {/* Connection Status */}
                <div className="space-y-1">
                    <p className="text-sm">
                        Status:
                        <span
                            className={`ml-2 px-2 py-0.5 rounded text-sm ${
                                status.includes("Subscribed")
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {status}
                        </span>
                    </p>
                    {lastPing && (
                        <p className="text-xs text-gray-500">
                            Last event received: {lastPing}
                        </p>
                    )}
                </div>

                {/* Messages List */}
                {messages.length > 0 && (
                    <div className="max-h-40 overflow-y-auto space-y-2">
                        <h4 className="font-medium text-sm">Recent Events:</h4>
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className="text-sm text-gray-600 bg-gray-50 p-2 rounded"
                            >
                                {msg}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
