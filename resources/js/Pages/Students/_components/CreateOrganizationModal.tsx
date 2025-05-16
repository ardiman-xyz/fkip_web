import React, { useState } from "react";
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
} from "react-icons/pi";
import { Media } from "@/types/app";
import { MediaModal } from "@/Components/MediaModal";

// Create form validation schema
const organizationSchema = z.object({
    name: z.string().min(1, { message: "Nama organisasi harus diisi" }),
    description: z.string().nullable().optional(),
    logo_id: z.number().nullable().optional(),
    cover_image_id: z.number().nullable().optional(),
    founding_year: z.string().nullable().optional(),
    email: z
        .string()
        .email({ message: "Email tidak valid" })
        .nullable()
        .optional(),
    instagram: z.string().nullable().optional(),
    is_active: z.boolean().default(true),
    is_featured: z.boolean().default(false),
});

interface CreateOrganizationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (organization: any) => void;
}

const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
    const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
    const [selectedLogo, setSelectedLogo] = useState<Media | null>(null);
    const [selectedCover, setSelectedCover] = useState<Media | null>(null);

    const form = useForm<z.infer<typeof organizationSchema>>({
        resolver: zodResolver(organizationSchema),
        defaultValues: {
            name: "",
            description: "",
            logo_id: null,
            cover_image_id: null,
            founding_year: "",
            email: "",
            instagram: "",
            is_active: true,
            is_featured: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof organizationSchema>) => {
        setIsSubmitting(true);

        try {
            // Replace with your actual API endpoint
            const response = await axios.post(
                route("admin.student.organizations.store"),
                values
            );

            if (response.data.status) {
                onSuccess(response.data.data);
                form.reset();
                onClose();
            } else {
                toast.error(
                    response.data.message || "Gagal menyimpan data organisasi"
                );
            }
        } catch (error: any) {
            console.error("Error submitting form:", error);

            if (error.response?.data?.errors) {
                // Set form errors from response
                Object.entries(error.response.data.errors).forEach(
                    ([key, value]) => {
                        // @ts-ignore - value is an array of error messages
                        form.setError(key as any, { message: value[0] });
                    }
                );
            } else {
                toast.error("Gagal menyimpan data organisasi");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogoSelect = (media: Media) => {
        setSelectedLogo(media);
        form.setValue("logo_id", media.id);
        setIsLogoModalOpen(false);
    };

    const handleCoverSelect = (media: Media) => {
        setSelectedCover(media);
        form.setValue("cover_image_id", media.id);
        setIsCoverModalOpen(false);
    };

    const handleClose = () => {
        form.reset();
        setSelectedLogo(null);
        setSelectedCover(null);
        onClose();
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onOpenChange={(open) => !open && handleClose()}
            >
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Tambah Organisasi Baru</DialogTitle>
                        <DialogDescription>
                            Tambahkan organisasi mahasiswa baru ke sistem
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Organisasi</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Nama organisasi mahasiswa"
                                            />
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
                                                placeholder="Deskripsi singkat tentang organisasi"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="logo_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Logo Organisasi
                                            </FormLabel>
                                            <FormControl>
                                                {selectedLogo ? (
                                                    <div className="relative group">
                                                        <img
                                                            src={
                                                                selectedLogo.path
                                                            }
                                                            alt="Logo Preview"
                                                            className="w-full h-32 object-contain border rounded-md p-2"
                                                        />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="secondary"
                                                                onClick={() =>
                                                                    setIsLogoModalOpen(
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
                                                                    setSelectedLogo(
                                                                        null
                                                                    );
                                                                    form.setValue(
                                                                        "logo_id",
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
                                                            setIsLogoModalOpen(
                                                                true
                                                            )
                                                        }
                                                        className="w-full h-32"
                                                        type="button"
                                                    >
                                                        <PiImageDuotone className="size-8 mr-2" />
                                                        Pilih Logo
                                                    </Button>
                                                )}
                                            </FormControl>
                                            <FormDescription>
                                                Pilih gambar untuk logo
                                                organisasi
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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
                                                            className="w-full h-32 object-cover rounded-md"
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
                                                        className="w-full h-32"
                                                        type="button"
                                                    >
                                                        <PiImageDuotone className="size-8 mr-2" />
                                                        Pilih Cover
                                                    </Button>
                                                )}
                                            </FormControl>
                                            <FormDescription>
                                                Pilih gambar untuk cover
                                                organisasi
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FormField
                                    control={form.control}
                                    name="founding_year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tahun Berdiri</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-2">
                                                    <PiCalendarDuotone className="h-5 w-5 text-gray-400" />
                                                    <Input
                                                        {...field}
                                                        placeholder="Contoh: 1995"
                                                        value={
                                                            field.value || ""
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-2">
                                                    <PiAt className="h-5 w-5 text-gray-400" />
                                                    <Input
                                                        {...field}
                                                        placeholder="organisasi@example.com"
                                                        value={
                                                            field.value || ""
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
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instagram</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-2">
                                                    <PiInstagramLogoDuotone className="h-5 w-5 text-gray-400" />
                                                    <Input
                                                        {...field}
                                                        placeholder="nama_akun"
                                                        value={
                                                            field.value || ""
                                                        }
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-col space-y-4">
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
                                                    Organisasi ini aktif dan
                                                    akan ditampilkan di situs
                                                    web
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
                                                    Tampilkan Sebagai Unggulan
                                                </FormLabel>
                                                <FormDescription>
                                                    Tampilkan organisasi ini
                                                    sebagai unggulan di situs
                                                    web
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
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
                                    {isSubmitting ? "Menyimpan..." : "Simpan"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Logo Media Modal */}
            <MediaModal
                isOpen={isLogoModalOpen}
                onClose={() => setIsLogoModalOpen(false)}
                onSelect={handleLogoSelect}
            />

            {/* Cover Media Modal */}
            <MediaModal
                isOpen={isCoverModalOpen}
                onClose={() => setIsCoverModalOpen(false)}
                onSelect={handleCoverSelect}
            />
        </>
    );
};

export default CreateOrganizationModal;
