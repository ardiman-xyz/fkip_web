import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    onClose,
    title,
    className = "max-w-[700px]",
    children,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={cn(className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{""}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};
