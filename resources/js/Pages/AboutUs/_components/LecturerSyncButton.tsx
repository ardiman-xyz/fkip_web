import { Button } from "@/Components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { LecturerSyncModal } from "./LecturerSyncModal";

interface LecturerSyncButtonProps {
    onSyncComplete?: () => void;
}

export const LecturerSyncButton = ({
    onSyncComplete,
}: LecturerSyncButtonProps) => {
    const [showSyncModal, setShowSyncModal] = useState<boolean>(false);

    return (
        <>
            <Button
                onClick={() => setShowSyncModal(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
            >
                <RefreshCcw className="h-4 w-4" />
                Sinkronisasi Data
            </Button>

            <LecturerSyncModal
                isOpen={showSyncModal}
                onClose={() => setShowSyncModal(false)}
                onSyncComplete={onSyncComplete}
            />
        </>
    );
};
