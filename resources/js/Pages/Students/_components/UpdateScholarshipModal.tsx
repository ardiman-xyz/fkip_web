import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import {
    PiImageDuotone,
    PiInstagramLogoDuotone,
    PiAt,
    PiCalendarDuotone,
    PiFloppyDiskDuotone,
    PiCurrencyDollarDuotone,
    PiUserCircleDuotone,
    PiPhoneDuotone,
    PiListNumbersDuotone,
    PiBuildingsDuotone,
    PiClipboardTextDuotone,
} from "react-icons/pi";
import { MediaModal } from "@/Components/MediaModal";
import { Scholarship } from "../_types";
import { Media } from "@/types/app";

// Create form validation schema
const scholarshipSchema = z.object({
    name: z.string().min(1, { message: "Nama beasiswa harus diisi" }),
    description: z.string().nullable().optional(),
    provider: z.string().min(1, { message: "Penyedia beasiswa harus diisi" }),
    amount: z.coerce.number().nullable().optional(),
    requirements: z.string().nullable().optional(),
    start_date: z.string().min(1, { message: "Tanggal mulai harus diisi" }),
    end_date: z.string().min(1, { message: "Tanggal berakhir harus diisi" }),
    application_deadline: z
        .string()
        .min(1, { message: "Tenggat pendaftaran harus diisi" }),
    quota: z.coerce.number().nullable().optional(),
    contact_person: z.string().nullable().optional(),
    contact_email: z
        .string()
        .email({ message: "Email tidak valid" })
        .nullable()
        .optional(),
    contact_phone: z.string().nullable().optional(),
    cover_image_id: z.number().nullable().optional(),
    is_active: z.boolean().default(true),
    is_featured: z.boolean().default(false),
});

interface UpdateScholarshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (scholarship: Scholarship) => void;
    scholarship: Scholarship | null;
}

const UpdateScholarshipModal: React.FC<UpdateScholarshipModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    scholarship,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
    const [selectedCover, setSelectedCover] = useState<Media | null>(null);

    const form = useForm<z.infer<typeof scholarshipSchema>>({
        resolver: zodResolver(scholarshipSchema),
        defaultValues: {
            name: "",
            description: "",
            provider: "",
            amount: null,
            requirements: "",
            start_date: "",
            end_date: "",
            application_deadline: "",
            quota: null,
            contact_person: "",
            contact_email: "",
            contact_phone: "",
            cover_image_id: null,
            is_active: true,
            is_featured: false,
        },
    });

    // Helper to format date from ISO string to YYYY-MM-DD
    const formatDateForInput = (dateString: string) => {
        if (!dateString) return "";
        // Extract the YYYY-MM-DD part from the ISO date string
        return dateString.split("T")[0];
    };

    // Update form values when scholarship changes
    useEffect(() => {
        if (scholarship) {
            form.reset({
                name: scholarship.name,
                description: scholarship.description || "",
                provider: scholarship.provider,
                amount:
                    typeof scholarship.amount === "string"
                        ? parseFloat(scholarship.amount)
                        : scholarship.amount,
                requirements: scholarship.requirements || "",
                start_date: formatDateForInput(scholarship.start_date),
                end_date: formatDateForInput(scholarship.end_date),
                application_deadline: formatDateForInput(
                    scholarship.application_deadline
                ),
                quota: scholarship.quota,
                contact_person: scholarship.contact_person || "",
                contact_email: scholarship.contact_email || "",
                contact_phone: scholarship.contact_phone || "",
                cover_image_id: scholarship.cover_image_id || null,
                is_active: scholarship.is_active,
                is_featured: scholarship.is_featured,
            });

            // Set cover image preview if available
            if (scholarship.cover_image) {
                const coverPath =
                    typeof scholarship.cover_image === "string"
                        ? scholarship.cover_image
                        : scholarship.cover_image.path ||
                          scholarship.cover_image.url ||
                          "";

                const coverId =
                    typeof scholarship.cover_image === "object"
                        ? scholarship.cover_image.id
                        : scholarship.cover_image_id || null;

                if (coverPath) {
                    setSelectedCover({
                        id: coverId || 0,
                        path: coverPath,
                        name: "Cover",
                        file_name: "cover.jpg",
                        mime_type: "image/jpeg",
                        size: 0,
                        url: coverPath,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    });
                } else {
                    setSelectedCover(null);
                }
            } else {
                setSelectedCover(null);
            }
        }
    }, [scholarship, form, isOpen]);

    const onSubmit = async (values: z.infer<typeof scholarshipSchema>) => {
        if (!scholarship) return;

        setIsSubmitting(true);

        try {
            // Buat objek data yang hanya berisi field yang valid untuk dikirim ke server
            const dataToSend = {
                name: values.name,
                description: values.description,
                provider: values.provider,
                amount: values.amount,
                requirements: values.requirements,
                start_date: values.start_date,
                end_date: values.end_date,
                application_deadline: values.application_deadline,
                quota: values.quota,
                contact_person: values.contact_person,
                contact_email: values.contact_email,
                contact_phone: values.contact_phone,
                cover_image_id: values.cover_image_id,
                is_active: values.is_active,
                is_featured: values.is_featured,
            };

            // Kirim ke endpoint update
            const response = await axios.put(
                route("admin.scholarships.update", scholarship.id),
                dataToSend
            );

            if (response.data && response.data.status) {
                onSuccess(response.data.data);
                onClose();
                toast.success("Beasiswa berhasil diperbarui");
            } else {
                toast.error(
                    response.data.message || "Gagal memperbarui data beasiswa"
                );
            }
        } catch (error: any) {
            console.error("Error updating scholarship:", error);

            if (error.response?.data?.errors) {
                // Set form errors from response
                Object.entries(error.response.data.errors).forEach(
                    ([key, value]) => {
                        // @ts-ignore - value is an array of error messages
                        form.setError(key as any, { message: value[0] });
                    }
                );
            } else {
                toast.error("Gagal memperbarui data beasiswa");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCoverSelect = (media: Media) => {
        setSelectedCover(media);
        form.setValue("cover_image_id", media.id);
        setIsCoverModalOpen(false);
    };

    const handleClose = () => {
        setSelectedCover(null);
        onClose();
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onOpenChange={(open) => !open && handleClose()}
            >
                <DialogContent className="sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Beasiswa</DialogTitle>
                        <DialogDescription>
                            Perbarui informasi program beasiswa
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Informasi Umum */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">
                                    Informasi Umum
                                </h3>

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Beasiswa</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Nama program beasiswa"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="provider"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Penyedia Beasiswa
                                            </FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-2">
                                                    <PiBuildingsDuotone className="h-5 w-5 text-gray-400" />
                                                    <Input
                                                        {...field}
                                                        placeholder="Nama institusi/organisasi penyedia"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Deskripsi</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Deskripsi singkat tentang program beasiswa"
                                                    value={field.value || ""}
                                                    className="min-h-[100px]"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="requirements"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Persyaratan</FormLabel>
                                            <FormControl>
                                                <div className="flex items-start gap-2">
                                                    <PiClipboardTextDuotone className="h-5 w-5 text-gray-400 mt-2" />
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Persyaratan untuk mendaftar beasiswa"
                                                        value={
                                                            field.value || ""
                                                        }
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Detail Beasiswa */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-lg font-medium">
                                    Detail Beasiswa
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Nilai Beasiswa (Rp)
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <PiCurrencyDollarDuotone className="h-5 w-5 text-gray-400" />
                                                        <Input
                                                            type="number"
                                                            placeholder="Jumlah dana beasiswa"
                                                            value={
                                                                field.value ===
                                                                null
                                                                    ? ""
                                                                    : field.value
                                                            }
                                                            onChange={(e) => {
                                                                const value =
                                                                    e.target
                                                                        .value ===
                                                                    ""
                                                                        ? null
                                                                        : parseFloat(
                                                                              e
                                                                                  .target
                                                                                  .value
                                                                          );
                                                                field.onChange(
                                                                    value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Nilai beasiswa dalam Rupiah
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="quota"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Kuota Penerima
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <PiListNumbersDuotone className="h-5 w-5 text-gray-400" />
                                                        <Input
                                                            type="number"
                                                            placeholder="Jumlah pendaftar yang diterima"
                                                            value={
                                                                field.value ===
                                                                null
                                                                    ? ""
                                                                    : field.value
                                                            }
                                                            onChange={(e) => {
                                                                const value =
                                                                    e.target
                                                                        .value ===
                                                                    ""
                                                                        ? null
                                                                        : parseInt(
                                                                              e
                                                                                  .target
                                                                                  .value
                                                                          );
                                                                field.onChange(
                                                                    value
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    Jumlah mahasiswa yang dapat
                                                    menerima beasiswa
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="start_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Tanggal Mulai
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <PiCalendarDuotone className="h-5 w-5 text-gray-400" />
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="end_date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Tanggal Berakhir
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <PiCalendarDuotone className="h-5 w-5 text-gray-400" />
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="application_deadline"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Tenggat Pendaftaran
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <PiCalendarDuotone className="h-5 w-5 text-gray-400" />
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Informasi Kontak */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-lg font-medium">
                                    Informasi Kontak
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="contact_person"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Kontak Penanggung Jawab
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <PiUserCircleDuotone className="h-5 w-5 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            placeholder="Nama penanggung jawab"
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contact_email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Email Kontak
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <PiAt className="h-5 w-5 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            placeholder="Email kontak"
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="contact_phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Nomor Telepon
                                                </FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <PiPhoneDuotone className="h-5 w-5 text-gray-400" />
                                                        <Input
                                                            {...field}
                                                            placeholder="Nomor telepon kontak"
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Cover Image & Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="cover_image_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cover Image</FormLabel>
                                            <FormControl>
                                                {selectedCover ? (
                                                    <div className="relative group">
                                                        <img
                                                            src={
                                                                selectedCover.path
                                                            }
                                                            alt="Cover Preview"
                                                            className="w-full h-40 object-cover rounded-md"
                                                        />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="secondary"
                                                                onClick={() =>
                                                                    setIsCoverModalOpen(
                                                                        true
                                                                    )
                                                                }
                                                                type="button"
                                                            >
                                                                Ganti
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() => {
                                                                    setSelectedCover(
                                                                        null
                                                                    );
                                                                    form.setValue(
                                                                        "cover_image_id",
                                                                        null
                                                                    );
                                                                }}
                                                                type="button"
                                                            >
                                                                Hapus
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            setIsCoverModalOpen(
                                                                true
                                                            )
                                                        }
                                                        className="w-full h-40"
                                                        type="button"
                                                    >
                                                        <PiImageDuotone className="size-8 mr-2" />
                                                        Pilih Cover Image
                                                    </Button>
                                                )}
                                            </FormControl>
                                            <FormDescription>
                                                Gambar banner untuk program
                                                beasiswa
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="is_active"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>Aktif</FormLabel>
                                                    <FormDescription>
                                                        Program beasiswa ini
                                                        aktif dan akan
                                                        ditampilkan di situs web
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="is_featured"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Tampilkan Sebagai
                                                        Unggulan
                                                    </FormLabel>
                                                    <FormDescription>
                                                        Tampilkan beasiswa ini
                                                        sebagai program unggulan
                                                        di situs web
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="gap-2"
                                >
                                    <PiFloppyDiskDuotone className="h-4 w-4" />
                                    {isSubmitting
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Cover Media Modal */}
            <MediaModal
                isOpen={isCoverModalOpen}
                onClose={() => setIsCoverModalOpen(false)}
                onSelect={handleCoverSelect}
            />
        </>
    );
};

export default UpdateScholarshipModal;
