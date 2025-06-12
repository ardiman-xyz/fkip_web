import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { PiImageDuotone } from "react-icons/pi";
import { Media } from "@/types/app";
import { MediaModal } from "@/Components/MediaModal";
import { toast } from "sonner";

interface FeaturedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { image: Media | null; expiredDate: string }) => void;
    defaultImage?: Media | null;
    defaultExpiredDate?: string;
}

const FeaturedModal = ({
    isOpen,
    onClose,
    onConfirm,
    defaultImage = null,
    defaultExpiredDate = "",
}: FeaturedModalProps) => {
    const [selectedImage, setSelectedImage] = React.useState<Media | null>(
        defaultImage
    );
    const [expiredDate, setExpiredDate] = React.useState(
        defaultExpiredDate || ""
    );
    const [isMediaModalOpen, setIsMediaModalOpen] = React.useState(false);
    const [isValidating, setIsValidating] = React.useState(false);

    const validateImageDimensions = (imageUrl: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const requiredWidth = 1920;
                const requiredHeight = 694;

                const isValid =
                    img.width === requiredWidth &&
                    img.height === requiredHeight;

                if (!isValid) {
                    toast.error(
                        `Image must be exactly ${requiredWidth}x${requiredHeight} pixels. Current size: ${img.width}x${img.height}`
                    );
                }
                resolve(isValid);
            };
            img.onerror = () => {
                toast.error("Failed to load image for validation");
                resolve(false);
            };
            img.src = imageUrl;
        });
    };

    const handleConfirm = async () => {
        if (!selectedImage) return;

        setIsValidating(true);
        const isValid = await validateImageDimensions(selectedImage.path);
        setIsValidating(false);

        if (isValid) {
            onConfirm({
                image: selectedImage,
                expiredDate: expiredDate,
            });
            onClose();
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Featured News Settings</DialogTitle>
                        <DialogDescription>
                            Konfigurasikan pengaturan tampilan berita unggulan
                            untuk slider depan. Gambar harus berukuran tepat
                            1920x694 piksel.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Image Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Slider Image
                            </label>
                            <div className="space-y-4">
                                {selectedImage ? (
                                    <div className="relative group">
                                        <img
                                            src={selectedImage.path}
                                            alt="Featured"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() =>
                                                    setIsMediaModalOpen(true)
                                                }
                                                type="button"
                                            >
                                                Change
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() =>
                                                    setSelectedImage(null)
                                                }
                                                type="button"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            setIsMediaModalOpen(true)
                                        }
                                        className="w-full h-48"
                                        type="button"
                                    >
                                        <PiImageDuotone className="size-8 mr-2" />
                                        Choose Slider Image
                                    </Button>
                                )}
                                <p className="text-sm text-gray-500">
                                    Required size: Exactly 1920x694 pixels
                                </p>
                            </div>
                        </div>

                        {/* Expired Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Featured Until
                            </label>
                            <Input
                                type="date"
                                value={expiredDate}
                                onChange={(e) => setExpiredDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                            />
                            <p className="text-sm text-gray-500">
                                Berita akan ditampilkan di slider hingga tanggal
                                ini.
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={
                                !selectedImage || !expiredDate || isValidating
                            }
                        >
                            {isValidating ? "Validating..." : "Confirm"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <MediaModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onSelect={(media) => {
                    setSelectedImage(media);
                    setIsMediaModalOpen(false);
                }}
            />
        </>
    );
};

export default FeaturedModal;
