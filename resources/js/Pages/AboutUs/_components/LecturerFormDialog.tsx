// _components/LecturerFormDialogFixedTypes.tsx
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Switch } from "@/Components/ui/switch";
import { toast } from "sonner";
import axios from "axios";
import { MediaModal } from "@/Components/MediaModal";
import { DialogError } from "./DialogError";
import { Loader, ChevronDown, ChevronUp, Info } from "lucide-react";
import { z } from "zod";
import { Lecturer } from "../_types/lecturer";

// Definisi tipe data yang konsisten
interface TranslationData {
    language_id: number;
    full_name: string;
    research_interests?: string;
    education_history?: string;
    biography?: string;
}

// Skema untuk terjemahan dosen dalam bahasa Indonesia (wajib)
const lecturerTranslationIdSchema = z.object({
    language_id: z.number(),
    full_name: z.string().min(1, "Nama lengkap harus diisi"),
    research_interests: z.string().optional(),
    education_history: z.string().optional(),
    biography: z.string().optional(),
});

// Skema untuk terjemahan dosen dalam bahasa Inggris (opsional)
const lecturerTranslationEnSchema = z.object({
    language_id: z.number(),
    full_name: z.string().optional(),
    research_interests: z.string().optional(),
    education_history: z.string().optional(),
    biography: z.string().optional(),
});

// Skema untuk form data dosen
const lecturerFormSchema = z.object({
    media_id: z.any().nullable(),
    nip: z.string().optional(),
    nidn: z.string().optional(),
    email: z.string().email("Format email tidak valid"),
    phone: z.string().optional(),
    academic_title: z.string().optional(),
    is_active: z.boolean().default(true),
    translations: z.object({
        id: lecturerTranslationIdSchema,
        en: lecturerTranslationEnSchema,
    }),
});

type LecturerFormData = z.infer<typeof lecturerFormSchema>;

// Header Section Component
interface SectionHeaderProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
}

const SectionHeader = ({ title, isOpen, onToggle }: SectionHeaderProps) => (
    <button
        type="button"
        className="w-full p-3 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors rounded-t-md text-left"
        onClick={onToggle}
    >
        <h3 className="font-medium text-lg">{title}</h3>
        {isOpen ? (
            <ChevronUp className="h-5 w-5" />
        ) : (
            <ChevronDown className="h-5 w-5" />
        )}
    </button>
);

// Main Component
interface LecturerFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: Lecturer) => void;
    initialData: Lecturer | null;
}

export const LecturerFormDialog = ({
    isOpen,
    onClose,
    onSuccess,
    initialData,
}: LecturerFormDialogProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [showErrors, setShowErrors] = useState(false);

    // Section state (expanded/collapsed)
    const [sectionsOpen, setSectionsOpen] = useState({
        basicInfo: true,
        translation: true,
        socialMedia: true,
        expertise: true,
        research: true,
        contact: true,
    });

    const toggleSection = (section: keyof typeof sectionsOpen) => {
        setSectionsOpen((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const [formData, setFormData] = useState<LecturerFormData>({
        media_id: null,
        nip: "",
        nidn: "",
        email: "",
        phone: "",
        academic_title: "",
        is_active: true,
        translations: {
            id: {
                language_id: 1,
                full_name: "",
                research_interests: "",
                education_history: "",
                biography: "",
            },
            en: {
                language_id: 2,
                full_name: "",
                research_interests: "",
                education_history: "",
                biography: "",
            },
        },
    });

    useEffect(() => {
        if (initialData) {
            // Siapkan media jika tersedia
            if (initialData.media) {
                setSelectedMedia(initialData.media);
            } else if (initialData.media_id && initialData.photo_url) {
                setSelectedMedia({
                    id: initialData.media_id,
                    path: initialData.photo_url,
                    name: initialData.name || "Profile photo",
                    mime_type: "image/jpeg",
                    size: 0,
                    file_name: initialData.name || "Profile photo",
                    url: initialData.photo_url,
                    created_at: initialData.created_at || "",
                    updated_at: initialData.updated_at || "",
                });
            }

            // Isi formData dari initialData dengan default fallback
            setFormData({
                media_id: initialData.media_id || null,
                nip: initialData.nip || "",
                nidn: initialData.nidn || "",
                email: initialData.contact?.email || initialData.email || "",
                phone: initialData.contact?.phone || initialData.phone || "",
                academic_title: initialData.academic_title || "",
                is_active: initialData.is_active ?? true,
                translations: {
                    id: {
                        language_id: 1,
                        full_name:
                            initialData.translations?.id?.full_name ||
                            initialData.name ||
                            "",
                        research_interests:
                            initialData.translations?.id?.research_interests ||
                            "",
                        education_history:
                            initialData.translations?.id?.education_history ||
                            "",
                        biography:
                            initialData.translations?.id?.biography || "",
                    },
                    en: {
                        language_id: 2,
                        full_name:
                            initialData.translations?.en?.full_name || "",
                        research_interests:
                            initialData.translations?.en?.research_interests ||
                            "",
                        education_history:
                            initialData.translations?.en?.education_history ||
                            "",
                        biography:
                            initialData.translations?.en?.biography || "",
                    },
                },
            });
        } else {
            // Reset form ketika menambah data baru
            setFormData({
                media_id: null,
                nip: "",
                nidn: "",
                email: "",
                phone: "",
                academic_title: "",
                is_active: true,
                translations: {
                    id: {
                        language_id: 1,
                        full_name: "",
                        research_interests: "",
                        education_history: "",
                        biography: "",
                    },
                    en: {
                        language_id: 2,
                        full_name: "",
                        research_interests: "",
                        education_history: "",
                        biography: "",
                    },
                },
            });
            setSelectedMedia(null);
        }
    }, [initialData, isOpen]);

    const handleInputChange =
        (field: string) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        };

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            is_active: checked,
        }));
    };

    const handleTranslationChange =
        (lang: "id" | "en", field: string) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { value } = e.target;
            setFormData((prev) => ({
                ...prev,
                translations: {
                    ...prev.translations,
                    [lang]: {
                        ...prev.translations[lang],
                        [field]: value,
                    },
                },
            }));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validasi form data menggunakan Zod
            const validatedData = lecturerFormSchema.parse(formData);

            let response;
            if (initialData) {
                response = await axios.post(
                    route("admin.lecturers.update", initialData.id),
                    validatedData
                );
            } else {
                response = await axios.post(
                    route("admin.lecturers.store"),
                    validatedData
                );
            }

            if (response.data.status) {
                toast.success(
                    response.data.message || "Data berhasil disimpan"
                );
                onSuccess(response.data.data);
                onClose();
            }
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
            } else {
                toast.error("Gagal menyimpan data");
                console.error(error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    interface FormatHintProps {
        text: string;
    }

    const FormatHint = ({ text }: FormatHintProps) => (
        <div className="flex items-start mt-1 text-xs text-muted-foreground">
            <Info className="h-3 w-3 mr-1.5 mt-0.5 flex-shrink-0" />
            <span>{text}</span>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {initialData ? "Edit Data Dosen" : "Tambah Dosen"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Foto Section */}
                    <div className="p-4 border rounded-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-lg">Foto Profil</h3>
                        </div>

                        <div className="flex justify-center">
                            {selectedMedia ? (
                                <div className="relative group">
                                    <img
                                        src={selectedMedia.path}
                                        alt="Preview"
                                        className="w-40 h-40 object-cover rounded-md"
                                    />
                                    <div className="absolute inset-0 w-40 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
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
                                    className="w-40 h-40"
                                >
                                    Pilih Foto
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Informasi Dasar Section */}
                    <div className="border rounded-md shadow-sm overflow-hidden">
                        <SectionHeader
                            title="Informasi Dasar"
                            isOpen={sectionsOpen.basicInfo}
                            onToggle={() => toggleSection("basicInfo")}
                        />

                        {sectionsOpen.basicInfo && (
                            <div className="p-4 space-y-4 border-t">
                                <div>
                                    <Label htmlFor="id-full_name">
                                        Nama Lengkap
                                    </Label>
                                    <Input
                                        id="id-full_name"
                                        value={
                                            formData.translations.id.full_name
                                        }
                                        onChange={handleTranslationChange(
                                            "id",
                                            "full_name"
                                        )}
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="nip">NIP</Label>
                                        <Input
                                            id="nip"
                                            value={formData.nip}
                                            onChange={handleInputChange("nip")}
                                            placeholder="Masukkan NIP"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="nidn">NIDN</Label>
                                        <Input
                                            id="nidn"
                                            value={formData.nidn}
                                            onChange={handleInputChange("nidn")}
                                            placeholder="Masukkan NIDN"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="academic_title">
                                        Gelar Akademik
                                    </Label>
                                    <Input
                                        id="academic_title"
                                        value={formData.academic_title}
                                        onChange={handleInputChange(
                                            "academic_title"
                                        )}
                                        placeholder="Contoh: Dr., M.Pd"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={formData.is_active}
                                        onCheckedChange={handleSwitchChange}
                                    />
                                    <Label htmlFor="is_active">
                                        Status Aktif
                                    </Label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Kontak Section */}
                    <div className="border rounded-md shadow-sm overflow-hidden">
                        <SectionHeader
                            title="Kontak"
                            isOpen={sectionsOpen.contact}
                            onToggle={() => toggleSection("contact")}
                        />

                        {sectionsOpen.contact && (
                            <div className="p-4 space-y-4 border-t">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange("email")}
                                        required
                                        placeholder="nama@domain.com"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Nomor Telepon</Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange("phone")}
                                        placeholder="Masukkan nomor telepon"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Translation Section */}
                    <div className="border rounded-md shadow-sm overflow-hidden">
                        <SectionHeader
                            title="Data Terjemahan"
                            isOpen={sectionsOpen.translation}
                            onToggle={() => toggleSection("translation")}
                        />

                        {sectionsOpen.translation && (
                            <div className="p-4 border-t">
                                <Tabs defaultValue="id">
                                    <TabsList>
                                        <TabsTrigger value="id">
                                            Indonesia
                                        </TabsTrigger>
                                        <TabsTrigger value="en">
                                            English (Opsional)
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                        value="id"
                                        className="space-y-4 mt-4"
                                    >
                                        <div>
                                            <Label htmlFor="id-biography">
                                                Biografi
                                            </Label>
                                            <Textarea
                                                id="id-biography"
                                                value={
                                                    formData.translations.id
                                                        .biography
                                                }
                                                onChange={handleTranslationChange(
                                                    "id",
                                                    "biography"
                                                )}
                                                placeholder="Informasi singkat tentang dosen"
                                                rows={4}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="id-education_history">
                                                Riwayat Pendidikan
                                            </Label>
                                            <Textarea
                                                id="id-education_history"
                                                value={
                                                    formData.translations.id
                                                        .education_history
                                                }
                                                onChange={handleTranslationChange(
                                                    "id",
                                                    "education_history"
                                                )}
                                                placeholder="Pendidikan Matematika; Media Pembelajaran; Teknologi dalam Pendidikan"
                                                rows={3}
                                            />
                                            <FormatHint text="Gunakan titik koma (;) sebagai pemisah untuk beberapa riwayat pendidikan" />
                                        </div>
                                    </TabsContent>

                                    <TabsContent
                                        value="en"
                                        className="space-y-4 mt-4"
                                    >
                                        <div className="bg-blue-50 p-3 rounded-md mb-3">
                                            <p className="text-blue-800 text-sm">
                                                Semua field dalam bahasa Inggris
                                                bersifat opsional
                                            </p>
                                        </div>

                                        <div>
                                            <Label htmlFor="en-full_name">
                                                Name (English)
                                            </Label>
                                            <Input
                                                id="en-full_name"
                                                value={
                                                    formData.translations.en
                                                        .full_name
                                                }
                                                onChange={handleTranslationChange(
                                                    "en",
                                                    "full_name"
                                                )}
                                                placeholder="Full name in English (optional)"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="en-biography">
                                                Biography
                                            </Label>
                                            <Textarea
                                                id="en-biography"
                                                value={
                                                    formData.translations.en
                                                        .biography
                                                }
                                                onChange={handleTranslationChange(
                                                    "en",
                                                    "biography"
                                                )}
                                                placeholder="Brief information about the lecturer (optional)"
                                                rows={4}
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="en-education_history">
                                                Education History
                                            </Label>
                                            <Textarea
                                                id="en-education_history"
                                                value={
                                                    formData.translations.en
                                                        .education_history
                                                }
                                                onChange={handleTranslationChange(
                                                    "en",
                                                    "education_history"
                                                )}
                                                placeholder="PhD in Mathematics Education, State University of Malang (2015-2019); Master in Mathematics Education, State University of Yogyakarta (2009-2011)"
                                                rows={3}
                                            />
                                            <FormatHint text="Use semicolons (;) to separate multiple education entries" />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                    </div>

                    {/* Bidang Keahlian Section */}
                    <div className="border rounded-md shadow-sm overflow-hidden">
                        <SectionHeader
                            title="Bidang Keahlian"
                            isOpen={sectionsOpen.expertise}
                            onToggle={() => toggleSection("expertise")}
                        />

                        {sectionsOpen.expertise && (
                            <div className="p-4 border-t">
                                <div className="bg-yellow-50 p-3 rounded-md mb-3">
                                    <p className="text-yellow-800 text-sm">
                                        Fitur ini akan diimplementasikan
                                        kemudian
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    <Label>Bidang Keahlian Dosen</Label>
                                    <div className="border border-dashed rounded-md p-4 text-center">
                                        <p className="text-muted-foreground">
                                            Bagian untuk daftar bidang keahlian
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Minat Penelitian Section */}
                    <div className="border rounded-md shadow-sm overflow-hidden">
                        <SectionHeader
                            title="Minat Penelitian"
                            isOpen={sectionsOpen.research}
                            onToggle={() => toggleSection("research")}
                        />

                        {sectionsOpen.research && (
                            <div className="p-4 border-t">
                                <Tabs defaultValue="id">
                                    <TabsList>
                                        <TabsTrigger value="id">
                                            Indonesia
                                        </TabsTrigger>
                                        <TabsTrigger value="en">
                                            English (Opsional)
                                        </TabsTrigger>
                                    </TabsList>

                                    <TabsContent
                                        value="id"
                                        className="space-y-4 mt-4"
                                    >
                                        <div>
                                            <Label htmlFor="id-research_interests">
                                                Minat Penelitian
                                            </Label>
                                            <Textarea
                                                id="id-research_interests"
                                                value={
                                                    formData.translations.id
                                                        .research_interests
                                                }
                                                onChange={handleTranslationChange(
                                                    "id",
                                                    "research_interests"
                                                )}
                                                placeholder="Pendidikan Matematika, Media Pembelajaran, dll"
                                                rows={3}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent
                                        value="en"
                                        className="space-y-4 mt-4"
                                    >
                                        <div className="bg-blue-50 p-3 rounded-md mb-3">
                                            <p className="text-blue-800 text-sm">
                                                Semua field dalam bahasa Inggris
                                                bersifat opsional
                                            </p>
                                        </div>

                                        <div>
                                            <Label htmlFor="en-research_interests">
                                                Research Interests
                                            </Label>
                                            <Textarea
                                                id="en-research_interests"
                                                value={
                                                    formData.translations.en
                                                        .research_interests
                                                }
                                                onChange={handleTranslationChange(
                                                    "en",
                                                    "research_interests"
                                                )}
                                                placeholder="Mathematics Education, Learning Media, etc (optional)"
                                                rows={3}
                                            />
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        )}
                    </div>

                    {/* Media Sosial Section */}
                    <div className="border rounded-md shadow-sm overflow-hidden">
                        <SectionHeader
                            title="Media Sosial"
                            isOpen={sectionsOpen.socialMedia}
                            onToggle={() => toggleSection("socialMedia")}
                        />

                        {sectionsOpen.socialMedia && (
                            <div className="p-4 border-t">
                                <div className="bg-yellow-50 p-3 rounded-md mb-3">
                                    <p className="text-yellow-800 text-sm">
                                        Fitur ini akan diimplementasikan
                                        kemudian
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="social-website">
                                            Website/Blog
                                        </Label>
                                        <Input
                                            id="social-website"
                                            placeholder="https://example.com"
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="social-linkedin">
                                            LinkedIn
                                        </Label>
                                        <Input
                                            id="social-linkedin"
                                            placeholder="https://linkedin.com/in/username"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && (
                                <Loader className="h-4 w-4 mr-1 animate-spin" />
                            )}
                            Simpan
                        </Button>
                    </div>
                </form>

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
