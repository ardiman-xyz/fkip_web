import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { MediaModal } from "@/Components/MediaModal";
import { useEffect, useState } from "react";
import { Accreditation, AccreditationFormData } from "../_types/accreditation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
}

export const AccreditationFormModal = ({
    isOpen,
    onClose,
    initialData,
}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [formData, setFormData] = useState<AccreditationFormData>({
        media_id: null,
        year: new Date().getFullYear(),
        is_active: true,
        translations: {
            id: { title: "", description: "" },
            en: { title: "", description: "" },
        },
    });

    const emptyForm = () => {
        setFormData({
            media_id: null,
            year: new Date().getFullYear(),
            is_active: true,
            translations: {
                id: { title: "", description: "" },
                en: { title: "", description: "" },
            },
        });
    };

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                media_id: initialData.media.id,
            });
            setSelectedMedia(initialData.media);
        }
    }, [initialData]);

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            let response;
            if (initialData) {
                response = await axios.put(
                    route("admin.accreditation.update", { id: initialData.id }),
                    formData
                );
            } else {
                response = await axios.post(
                    route("admin.accreditation.store"),
                    formData
                );
            }

            if (response.data.status) {
                toast.success(
                    response.data.message || "Berhasil menyimpan perubahan"
                );
                emptyForm();
                onClose();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<any>;

                if (axiosError.response?.status === 422) {
                    const validationErrors = axiosError.response.data.errors;
                    Object.values(validationErrors).forEach((messages: any) => {
                        messages.forEach((message: string) => {
                            toast.error(message);
                        });
                    });
                } else {
                    toast.error(
                        axiosError.response?.data?.message ||
                            "Terjadi kesalahan saat menyimpan perubahan"
                    );
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Edit" : "Tambah"} Sertifikat
                    </DialogTitle>
                    <DialogDescription>
                        Isi form berikut untuk{" "}
                        {initialData ? "mengubah" : "menambah"} sertifikat
                        akreditasi
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Gambar Sertifikat
                        </label>
                        {selectedMedia ? (
                            <div className="relative group">
                                <img
                                    src={selectedMedia.path}
                                    alt="Preview"
                                    className="w-full h-48 object-cover rounded"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            setIsMediaModalOpen(true)
                                        }
                                    >
                                        Ganti
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => setSelectedMedia(null)}
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={() => setIsMediaModalOpen(true)}
                                className="w-full h-48"
                            >
                                Pilih Gambar
                            </Button>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Tahun
                        </label>
                        <Input
                            type="number"
                            value={formData.year}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    year: parseInt(e.target.value),
                                }))
                            }
                            max={new Date().getFullYear()}
                        />
                    </div>

                    <Tabs defaultValue="id">
                        <TabsList>
                            <TabsTrigger value="id">Indonesia</TabsTrigger>
                            <TabsTrigger value="en">English</TabsTrigger>
                        </TabsList>

                        <TabsContent value="id" className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Judul
                                </label>
                                <Input
                                    value={formData.translations.id.title}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            translations: {
                                                ...prev.translations,
                                                id: {
                                                    ...prev.translations.id,
                                                    title: e.target.value,
                                                },
                                            },
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Deskripsi
                                </label>
                                <Textarea
                                    value={formData.translations.id.description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            translations: {
                                                ...prev.translations,
                                                id: {
                                                    ...prev.translations.id,
                                                    description: e.target.value,
                                                },
                                            },
                                        }))
                                    }
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="en" className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Title
                                </label>
                                <Input
                                    value={formData.translations.en.title}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            translations: {
                                                ...prev.translations,
                                                en: {
                                                    ...prev.translations.en,
                                                    title: e.target.value,
                                                },
                                            },
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Description
                                </label>
                                <Textarea
                                    value={formData.translations.en.description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            translations: {
                                                ...prev.translations,
                                                en: {
                                                    ...prev.translations.en,
                                                    description: e.target.value,
                                                },
                                            },
                                        }))
                                    }
                                />
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button onClick={() => onSubmit()} disabled={isLoading}>
                            {isLoading && (
                                <Loader className="mr-2 size-4 animate-spin" />
                            )}
                            {initialData ? "Simpan" : "Tambah"}
                        </Button>
                    </div>
                </div>
            </DialogContent>

            <MediaModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onSelect={(media) => {
                    setSelectedMedia(media);
                    setFormData((prev) => ({
                        ...prev,
                        media_id: media.id,
                    }));
                    setIsMediaModalOpen(false);
                }}
                selectedMedia={selectedMedia}
            />
        </Dialog>
    );
};
