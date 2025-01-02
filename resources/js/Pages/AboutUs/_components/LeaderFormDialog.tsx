import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Textarea } from "@/Components/ui/textarea";
import { useEffect, useState } from "react";
import { LeaderFormData, leaderFormSchema } from "../_schema";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { MediaModal } from "@/Components/MediaModal";
import { DialogError } from "./DialogError";
import { Loader } from "lucide-react";
import { Leader } from "../_types/leader";
import { getPositionLabel } from "../_helper";
import { positionOptions } from "../_data";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: Leader) => void;
    initialData?: any;
}

export const LeaderFormDialog = ({
    isOpen,
    onClose,
    initialData,
    onSuccess,
}: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [showErrors, setShowErrors] = useState(false);
    const [useCustomPosition, setUseCustomPosition] = useState(false);

    const [formData, setFormData] = useState<LeaderFormData>({
        media_id: null,
        nip: "",
        nidn: "",
        email: "",
        phone: "",
        academic_title: "",
        translations: {
            id: {
                language_id: 1,
                full_name: "",
                position: "",
                education_history: "",
                research_interests: "",
                biography: "",
            },
            en: {
                language_id: 2,
                full_name: "",
                position: "",
                education_history: "",
                research_interests: "",
                biography: "",
            },
        },
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                media_id: initialData.media_id,
                nip: initialData.nip || "",
                nidn: initialData.nidn || "",
                email: initialData.email,
                phone: initialData.phone || "",
                academic_title: initialData.academic_title || "",
                translations: {
                    id: {
                        language_id: 1,
                        full_name: initialData.translations.id.full_name || "",
                        position: initialData.translations.id.position || "",
                        education_history:
                            initialData.translations.id.education_history || "",
                        research_interests:
                            initialData.translations.id.research_interests ||
                            "",
                        biography: initialData.translations.id.biography || "",
                    },
                    en: {
                        language_id: 2,
                        full_name: initialData.translations.en.full_name || "",
                        position: initialData.translations.en.position || "",
                        education_history:
                            initialData.translations.en.education_history || "",
                        research_interests:
                            initialData.translations.en.research_interests ||
                            "",
                        biography: initialData.translations.en.biography || "",
                    },
                },
            });

            if (initialData.media) {
                setSelectedMedia(initialData.media);
            }
        } else {
            emptyForm();
        }
    }, [initialData]);

    useEffect(() => {
        if (!isOpen) {
            emptyForm();
        }
    }, [isOpen]);

    const emptyForm = () => {
        setFormData({
            media_id: null,
            nip: "",
            nidn: "",
            email: "",
            phone: "",
            academic_title: "",
            translations: {
                id: {
                    language_id: 1,
                    full_name: "",
                    position: "",
                    education_history: "",
                    research_interests: "",
                    biography: "",
                },
                en: {
                    language_id: 2,
                    full_name: "",
                    position: "",
                    education_history: "",
                    research_interests: "",
                    biography: "",
                },
            },
        });
        setSelectedMedia(null);
    };

    const onSubmit = async () => {
        try {
            const validatedData = leaderFormSchema.parse(formData);

            setIsLoading(true);

            let response;
            if (initialData) {
                response = await axios.put(
                    route("admin.leaders.update", initialData.id),
                    validatedData
                );
            } else {
                response = await axios.post(
                    route("admin.leaders.store"),
                    validatedData
                );
            }

            toast.success(response.data.message || "Data berhasil disimpan");
            onSuccess(response.data.data);
            emptyForm();
            onClose();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map(
                    (err) => `${err.path.join(".")} - ${err.message}`
                );
                setErrors(validationErrors);
                setShowErrors(true);
            } else if (axios.isAxiosError(error)) {
                if (error.response?.status === 422) {
                    const validationErrors = Object.values(
                        error.response.data.errors
                    )
                        .flat()
                        .map((err) => String(err));
                    setErrors(validationErrors);
                    setShowErrors(true);
                } else {
                    setErrors([
                        error.response?.data?.message || "Terjadi kesalahan",
                    ]);
                    setShowErrors(true);
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    console.info(formData);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Tambah Pimpinan</DialogTitle>
                </DialogHeader>

                <div>
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Foto
                            </label>
                            {selectedMedia ? (
                                <div className="relative group">
                                    <img
                                        src={selectedMedia.path}
                                        alt="Preview"
                                        className="w-48 h-48 object-cover rounded"
                                    />
                                    <div className="absolute inset-0 w-48  bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() =>
                                                setIsMediaModalOpen(true)
                                            }
                                        >
                                            Ganti
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => {
                                                setSelectedMedia(null);
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    media_id: null,
                                                }));
                                            }}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => setIsMediaModalOpen(true)}
                                    className="w-48 h-48"
                                >
                                    Pilih Foto
                                </Button>
                            )}
                        </div>
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        NIP
                                    </label>
                                    <Input
                                        placeholder="NIP"
                                        value={formData.nip}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                nip: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        NIDN
                                    </label>
                                    <Input
                                        placeholder="NIDN"
                                        value={formData.nidn}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                nidn: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Email
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Nomor Telepon
                                    </label>
                                    <Input
                                        placeholder="Nomor Telepon"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                phone: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Gelar Akademik
                                </label>
                                <Input
                                    placeholder="Contoh: Dr., M.Pd"
                                    value={formData.academic_title}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            academic_title: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>

                        {/* Translations */}
                        <Tabs defaultValue="id">
                            <TabsList>
                                <TabsTrigger value="id">Indonesia</TabsTrigger>
                                <TabsTrigger value="en">English</TabsTrigger>
                            </TabsList>

                            <TabsContent value="id" className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Nama Lengkap
                                    </label>
                                    <Input
                                        placeholder="Nama Lengkap"
                                        value={
                                            formData.translations.id.full_name
                                        }
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                translations: {
                                                    ...prev.translations,
                                                    id: {
                                                        ...prev.translations.id,
                                                        full_name:
                                                            e.target.value,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Jabatan
                                    </label>
                                    {!useCustomPosition ? (
                                        <select
                                            className="w-full rounded-md border border-input bg-background px-3 h-10"
                                            value={
                                                formData.translations.id
                                                    .position
                                            }
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === "other") {
                                                    setUseCustomPosition(true);
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        translations: {
                                                            ...prev.translations,
                                                            id: {
                                                                ...prev
                                                                    .translations
                                                                    .id,
                                                                position: "",
                                                            },
                                                            en: {
                                                                ...prev
                                                                    .translations
                                                                    .en,
                                                                position: "",
                                                            },
                                                        },
                                                    }));
                                                } else {
                                                    const idLabel =
                                                        getPositionLabel(
                                                            value,
                                                            "id"
                                                        );
                                                    const enLabel =
                                                        getPositionLabel(
                                                            value,
                                                            "en"
                                                        );

                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        translations: {
                                                            ...prev.translations,
                                                            id: {
                                                                ...prev
                                                                    .translations
                                                                    .id,
                                                                position:
                                                                    idLabel,
                                                            },
                                                            en: {
                                                                ...prev
                                                                    .translations
                                                                    .en,
                                                                position:
                                                                    enLabel,
                                                            },
                                                        },
                                                    }));
                                                }
                                            }}
                                        >
                                            <option value="">
                                                Pilih Jabatan
                                            </option>
                                            {positionOptions.id.map(
                                                (option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    ) : (
                                        <div className="space-y-2">
                                            <Input
                                                placeholder="Masukkan Jabatan"
                                                value={
                                                    formData.translations.id
                                                        .position
                                                }
                                                onChange={(e) => {
                                                    const value =
                                                        e.target.value;
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        translations: {
                                                            ...prev.translations,
                                                            id: {
                                                                ...prev
                                                                    .translations
                                                                    .id,
                                                                position: value,
                                                            },
                                                            en: {
                                                                ...prev
                                                                    .translations
                                                                    .en,
                                                                position: value,
                                                            },
                                                        },
                                                    }));
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setUseCustomPosition(false);
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        translations: {
                                                            ...prev.translations,
                                                            id: {
                                                                ...prev
                                                                    .translations
                                                                    .id,
                                                                position: "",
                                                            },
                                                            en: {
                                                                ...prev
                                                                    .translations
                                                                    .en,
                                                                position: "",
                                                            },
                                                        },
                                                    }));
                                                }}
                                            >
                                                Kembali ke Pilihan
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Riwayat Pendidikan
                                    </label>
                                    <Textarea
                                        placeholder="Riwayat Pendidikan"
                                        value={
                                            formData.translations.id
                                                .education_history
                                        }
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                translations: {
                                                    ...prev.translations,
                                                    id: {
                                                        ...prev.translations.id,
                                                        education_history:
                                                            e.target.value,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Minat Penelitian
                                    </label>
                                    <Textarea
                                        placeholder="Minat Penelitian"
                                        value={
                                            formData.translations.id
                                                .research_interests
                                        }
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                translations: {
                                                    ...prev.translations,
                                                    id: {
                                                        ...prev.translations.id,
                                                        research_interests:
                                                            e.target.value,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Biografi
                                    </label>
                                    <Textarea
                                        placeholder="Biografi"
                                        value={
                                            formData.translations.id.biography
                                        }
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                translations: {
                                                    ...prev.translations,
                                                    id: {
                                                        ...prev.translations.id,
                                                        biography:
                                                            e.target.value,
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
                                        Full Name
                                    </label>
                                    <Input
                                        value={
                                            formData.translations.en.full_name
                                        }
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                translations: {
                                                    ...prev.translations,
                                                    en: {
                                                        ...prev.translations.en,
                                                        full_name:
                                                            e.target.value,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Position
                                    </label>
                                    <Input
                                        value={
                                            formData.translations.en.position
                                        }
                                        disabled
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Education History
                                    </label>
                                    <Textarea
                                        value={
                                            formData.translations.en
                                                .education_history
                                        }
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                translations: {
                                                    ...prev.translations,
                                                    en: {
                                                        ...prev.translations.en,
                                                        education_history:
                                                            e.target.value,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Research Interests
                                    </label>
                                    <Textarea
                                        value={
                                            formData.translations.en
                                                .research_interests
                                        }
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                translations: {
                                                    ...prev.translations,
                                                    en: {
                                                        ...prev.translations.en,
                                                        research_interests:
                                                            e.target.value,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-2 block">
                                        Biography
                                    </label>
                                    <Textarea
                                        value={
                                            formData.translations.en.biography
                                        }
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                translations: {
                                                    ...prev.translations,
                                                    en: {
                                                        ...prev.translations.en,
                                                        biography:
                                                            e.target.value,
                                                    },
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                            >
                                Batal
                            </Button>
                            <Button
                                type="button"
                                onClick={onSubmit}
                                disabled={isLoading}
                            >
                                {isLoading && (
                                    <Loader className="h-4 w-4 mr-1 animate-spin" />
                                )}
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>

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
                <DialogError
                    isOpen={showErrors}
                    onClose={() => setShowErrors(false)}
                    errors={errors}
                />
            </DialogContent>
        </Dialog>
    );
};
