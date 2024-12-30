import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { ScrollArea } from "@/Components/ui/scroll-area";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    errors: string[];
}

export const DialogError = ({ isOpen, onClose, errors }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-red-500">Error</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[300px]">
                    <ul className="space-y-2 list-disc pl-4">
                        {errors.map((error, index) => (
                            <li key={index} className="text-sm text-red-500">
                                {error}
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
