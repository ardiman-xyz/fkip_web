// _components/StaffFormDialog.tsx
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Switch } from "@/Components/ui/switch";
import { MediaModal } from "@/Components/MediaModal";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Staff } from "../_types/staff";

interface StaffFormDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: Staff) => void;
    initialData: Staff | null;
}

export const StaffFormDialog = ({
    isOpen,
    onClose,
    onSuccess,
    initialData,
}: StaffFormDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("id");

    // Form state
    const [formData, setFormData] = useState({
        nip: "",
        unit: "",
        status: "active",
        media_id: null as number | null,
        translations: {
            id: {
                full_name: "",
                position: "",
            },
            en: {
                full_name: "",
                position: "",
            },
        },
    });

    // Reset form when dialog opens/closes or initialData changes
    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    nip: initialData.nip || "",
                    unit: initialData.unit || "",
                    status: initialData.is_active ? "active" : "inactive",
                    media_id: initialData.media_id,
                    translations: {
                        id: {
                            full_name:
                                initialData.translations?.id?.full_name || "",
                            position:
                                initialData.translations?.id?.position || "",
                        },
                        en: {
                            full_name:
                                initialData.translations?.en?.full_name || "",
                            position:
                                initialData.translations?.en?.position || "",
                        },
                    },
                });

                // Set selectedMedia if media exists
                if (initialData.media) {
                    setSelectedMedia({
                        id: initialData.media.id,
                        path: initialData.media.path,
                    });
                } else {
                    setSelectedMedia(null);
                }
            } else {
                // Reset form for new staff
                setFormData({
                    nip: "",
                    unit: "",
                    status: "active",
                    media_id: null,
                    translations: {
                        id: {
                            full_name: "",
                            position: "",
                        },
                        en: {
                            full_name: "",
                            position: "",
                        },
                    },
                });
                setSelectedMedia(null);
            }
        }
    }, [isOpen, initialData]);

    // Handle form submission
    const handleSubmit = async () => {
        if (!formData.translations.id.full_name) {
            toast.error("Nama harus diisi");
            return;
        }

        setIsLoading(true);

        try {
            let response;
            if (initialData) {
                // Update existing staff
                response = await axios.put(
                    route("admin.staff.update", initialData.id),
                    formData
                );
            } else {
                // Create new staff
                response = await axios.post(
                    route("admin.staff.store"),
                    formData
                );
            }

            if (response.data.status) {
                toast.success(
                    response.data.message || "Data berhasil disimpan"
                );
                onSuccess(response.data.data);
            }
        } catch (error) {
            console.error("Error saving staff:", error);
            toast.error("Gagal menyimpan data");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle form field changes
    const handleChange = (
        field: string,
        value: string | number | boolean | null
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleTranslationChange = (
        locale: string,
        field: string,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            translations: {
                ...prev.translations,
                [locale as "id" | "en"]: {
                    ...prev.translations[locale as "id" | "en"],
                    [field as keyof typeof prev.translations.id]: value,
                },
            },
        }));
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {initialData
                                ? "Edit Tenaga Kependidikan"
                                : "Tambah Tenaga Kependidikan"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="w-full"
                        >
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="id">Indonesia</TabsTrigger>
                                <TabsTrigger value="en">English</TabsTrigger>
                            </TabsList>

                            {/* Indonesian Form */}
                            <TabsContent value="id" className="space-y-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="id-full_name"
                                        className="text-right"
                                    >
                                        Nama
                                    </Label>
                                    <Input
                                        id="id-full_name"
                                        value={
                                            formData.translations.id.full_name
                                        }
                                        onChange={(e) =>
                                            handleTranslationChange(
                                                "id",
                                                "full_name",
                                                e.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="id-position"
                                        className="text-right"
                                    >
                                        Jabatan
                                    </Label>
                                    <Input
                                        id="id-position"
                                        value={
                                            formData.translations.id.position
                                        }
                                        onChange={(e) =>
                                            handleTranslationChange(
                                                "id",
                                                "position",
                                                e.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                            </TabsContent>

                            {/* English Form */}
                            <TabsContent value="en" className="space-y-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="en-full_name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="en-full_name"
                                        value={
                                            formData.translations.en.full_name
                                        }
                                        onChange={(e) =>
                                            handleTranslationChange(
                                                "en",
                                                "full_name",
                                                e.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="en-position"
                                        className="text-right"
                                    >
                                        Position
                                    </Label>
                                    <Input
                                        id="en-position"
                                        value={
                                            formData.translations.en.position
                                        }
                                        onChange={(e) =>
                                            handleTranslationChange(
                                                "en",
                                                "position",
                                                e.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Common fields for both languages */}
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nip" className="text-right">
                                NIP
                            </Label>
                            <Input
                                id="nip"
                                value={formData.nip}
                                onChange={(e) =>
                                    handleChange("nip", e.target.value)
                                }
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="unit" className="text-right">
                                Unit
                            </Label>
                            <Input
                                id="unit"
                                value={formData.unit}
                                onChange={(e) =>
                                    handleChange("unit", e.target.value)
                                }
                                className="col-span-3"
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <div className="flex items-center space-x-2 col-span-3">
                                <Switch
                                    id="status"
                                    checked={formData.status === "active"}
                                    onCheckedChange={(checked) =>
                                        handleChange(
                                            "status",
                                            checked ? "active" : "inactive"
                                        )
                                    }
                                />
                                <Label htmlFor="status">
                                    {formData.status === "active"
                                        ? "Aktif"
                                        : "Tidak Aktif"}
                                </Label>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Foto</Label>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            setIsMediaModalOpen(true)
                                        }
                                    >
                                        Pilih Foto
                                    </Button>

                                    {selectedMedia && (
                                        <div className="flex items-center gap-2">
                                            <div className="h-12 w-12 rounded-full overflow-hidden border">
                                                <img
                                                    src={selectedMedia.path}
                                                    alt="Selected media"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                Media dipilih
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
        </>
    );
};
