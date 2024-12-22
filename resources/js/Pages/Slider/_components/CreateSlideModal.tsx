// components/Modals/SlideModal.tsx
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { PiImageDuotone } from "react-icons/pi";
import { Media } from "@/types/app";
import { MediaModal } from "@/Components/MediaModal";
import {toast} from "sonner";
import axios from "axios";

interface SlideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export  const CreateSlideModal = ({
                        isOpen,
                        onClose,
                    }: SlideModalProps) => {
    const [selectedImage, setSelectedImage] = React.useState<Media | null>(null);
    const [isMediaModalOpen, setIsMediaModalOpen] = React.useState(false);
    const [url, setUrl] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const validateImageDimensions = (imageUrl: string): Promise<boolean> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const isValid = img.width === 1920 && img.height === 694;
                if (!isValid) {
                    toast.error(`Image must be exactly 1920x694 pixels. Current size: ${img.width}x${img.height}`);
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

    const handleSubmit = async () => {
        if (!selectedImage) return;

        try {
            setIsSubmitting(true);

            const isValid = await validateImageDimensions(selectedImage.path);
            if (!isValid) {
                setIsSubmitting(false);
                return;
            }

           await axios.post(route('admin.slider.store'), {
                media_id: selectedImage.id,
                url,
            });

            toast.success('Slide saved successfully');
            handleClose();
        } catch (error) {
            toast.error('Failed to save slide');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setSelectedImage(null);
        setUrl('');
        onClose();
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[900px] h-[600px]">
                    <DialogHeader>
                        <DialogTitle>Add New Slide</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Image Selection */}
                        <div className="space-y-2">
                            <Label>Slide Image (1920x694)</Label>
                            <div className="space-y-4">
                                {selectedImage ? (
                                    <div className="relative group">
                                        <img
                                            src={selectedImage.path}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => setIsMediaModalOpen(true)}
                                                type="button"
                                            >
                                                Change
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => setSelectedImage(null)}
                                                type="button"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsMediaModalOpen(true)}
                                        className="w-full h-48"
                                        type="button"
                                    >
                                        <PiImageDuotone className="size-8 mr-2" />
                                        Choose Image
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* URL Input */}
                        <div className="space-y-2">
                            <Label>URL Tujuan (Optional)</Label>
                            <Input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                            />
                        </div>

                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!selectedImage || isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save'}
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

