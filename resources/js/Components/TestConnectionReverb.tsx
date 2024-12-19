import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TestConnection = () => {
    const { auth } = usePage<PageProps>().props;

    const [status, setStatus] = useState("Connecting...");
    const [lastPing, setLastPing] = useState<string | null>(null);

    useEffect(() => {
        const echoInstance = (window as any).Echo;

        const channel = echoInstance.channel(`ods-notifications`);

        channel.subscribed(() => {
            console.log("Successfully subscribed to private channel");
            setStatus("Subscribed to private channel");
        });

        channel.listen(".ods.notification", (data: any) => {
            // Tambahkan titik di depan
            console.log("New notification:", data);
            toast.info("New notification from ODS!", {
                description: data.message,
            });
        });
    }, []);

    return (
        <div className="fixed bottom-20 left-4 bg-white p-4 rounded-lg shadow-lg space-y-2">
            <h3 className="font-medium">Reverb Connection Status</h3>
            <div className="space-y-1 text-sm">
                <p>
                    Status:
                    <span
                        className={`ml-2 px-2 py-0.5 rounded ${
                            status.includes("Connected") ||
                            status.includes("Subscribed")
                                ? "bg-green-100 text-green-700"
                                : status === "Connecting..."
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {status}
                    </span>
                </p>
                {lastPing && (
                    <p className="text-gray-500">Last ping: {lastPing}</p>
                )}
            </div>
        </div>
    );
};

export default TestConnection;
