// File: resources/js/Pages/Announcement/_components/PinModal.tsx

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { PiPushPinDuotone, PiCalendarDuotone } from "react-icons/pi";
import { Announcement } from "../_types/announcement";

const pinSchema = z
    .object({
        pinned_start_date: z.string().min(1, "Tanggal mulai wajib diisi"),
        pinned_end_date: z.string().min(1, "Tanggal berakhir wajib diisi"),
    })
    .refine(
        (data) => {
            const startDate = new Date(data.pinned_start_date);
            const endDate = new Date(data.pinned_end_date);
            return endDate > startDate;
        },
        {
            message: "Tanggal berakhir harus setelah tanggal mulai",
            path: ["pinned_end_date"],
        }
    );

type PinFormData = z.infer<typeof pinSchema>;

interface PinModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: PinFormData) => void;
    announcement: Announcement | null;
    isLoading?: boolean;
}

export default function PinModal({
    isOpen,
    onClose,
    onConfirm,
    announcement,
    isLoading = false,
}: PinModalProps) {
    const form = useForm<PinFormData>({
        resolver: zodResolver(pinSchema),
        defaultValues: {
            pinned_start_date: "",
            pinned_end_date: "",
        },
    });

    // Reset form when modal opens with existing data
    React.useEffect(() => {
        if (isOpen && announcement) {
            // Set default dates
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextWeek = new Date(now);
            nextWeek.setDate(nextWeek.getDate() + 7);

            // Format untuk datetime-local input
            const formatForInput = (date: Date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                return `${year}-${month}-${day}T${hours}:${minutes}`;
            };

            // Use existing dates if available, otherwise use defaults
            const startDate = announcement.pinned_start_date
                ? formatForInput(new Date(announcement.pinned_start_date))
                : formatForInput(tomorrow);

            const endDate = announcement.pinned_end_date
                ? formatForInput(new Date(announcement.pinned_end_date))
                : formatForInput(nextWeek);

            form.reset({
                pinned_start_date: startDate,
                pinned_end_date: endDate,
            });
        }
    }, [isOpen, announcement, form]);

    const handleSubmit = (data: PinFormData) => {
        onConfirm(data);
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    if (!announcement) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <PiPushPinDuotone className="size-5 text-blue-600" />
                        {announcement.is_pinned
                            ? "Edit Pin Pengumuman"
                            : "Pin Pengumuman"}
                    </DialogTitle>
                    <DialogDescription>
                        {announcement.is_pinned
                            ? "Ubah periode waktu untuk menampilkan pengumuman sebagai popup/banner di website."
                            : "Atur periode waktu untuk menampilkan pengumuman sebagai popup/banner di website."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <div className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-blue-800 mb-1">
                                {announcement.translations?.id?.title ||
                                    announcement.translations?.en?.title ||
                                    "Untitled"}
                            </p>
                            <p className="text-xs text-blue-600">
                                Pengumuman ini akan ditampilkan sebagai
                                popup/banner selama periode yang ditentukan
                            </p>
                        </div>

                        <FormField
                            control={form.control}
                            name="pinned_start_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <PiCalendarDuotone className="size-4" />
                                        Tanggal & Waktu Mulai
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="pinned_end_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-2">
                                        <PiCalendarDuotone className="size-4" />
                                        Tanggal & Waktu Berakhir
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                            <p className="text-xs text-amber-700">
                                <strong>Catatan:</strong> Pengumuman yang di-pin
                                akan muncul sebagai popup atau banner di bagian
                                atas website dan sangat mencolok. Gunakan fitur
                                ini untuk pengumuman penting atau mendesak.
                            </p>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Batal
                            </Button>
                            <Button
                                type="button"
                                onClick={form.handleSubmit(handleSubmit)}
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                        {announcement.is_pinned
                                            ? "Mengupdate..."
                                            : "Menyimpan..."}
                                    </>
                                ) : (
                                    <>
                                        <PiPushPinDuotone className="size-4 mr-2" />
                                        {announcement.is_pinned
                                            ? "Update Pin"
                                            : "Pin Pengumuman"}
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
