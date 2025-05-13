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
import { Textarea } from "@/Components/ui/textarea";
import {
    PiDeviceMobileDuotone,
    PiEnvelopeDuotone,
    PiGlobeDuotone,
    PiInstagramLogoDuotone,
    PiWhatsappLogoDuotone,
    PiYoutubeLogoDuotone,
    PiMapPinDuotone,
    PiFloppyDiskDuotone,
} from "react-icons/pi";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface StudyProgramContact {
    id?: number;
    study_program_id?: number;
    website: string | null;
    email: string | null;
    phone: string | null;
    whatsapp: string | null;
    instagram: string | null;
    youtube: string | null;
    address: string | null;
}

interface EditContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (contact: StudyProgramContact) => void;
    studyProgramId: number;
    contact: StudyProgramContact | null;
}

const EditContactModal = ({
    isOpen,
    onClose,
    onSuccess,
    studyProgramId,
    contact,
}: EditContactModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<StudyProgramContact>({
        website: contact?.website || null,
        email: contact?.email || null,
        phone: contact?.phone || null,
        whatsapp: contact?.whatsapp || null,
        instagram: contact?.instagram || null,
        youtube: contact?.youtube || null,
        address: contact?.address || null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value || null,
        }));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            // Menggunakan fungsi route() dari Ziggy dengan parameter studyProgramId
            const response = await axios.post(
                route("admin.study-program.contact.store", { studyProgramId }),
                formData
            );

            if (response.data.status) {
                toast.success("Kontak berhasil disimpan");
                onSuccess(response.data.data);
                onClose();
            } else {
                toast.error(response.data.message || "Gagal menyimpan kontak");
            }
        } catch (error) {
            console.error("Error saving contact:", error);
            toast.error("Terjadi kesalahan saat menyimpan kontak");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Edit Informasi Kontak</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Email */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="email"
                            className="text-right flex items-center justify-end"
                        >
                            <PiEnvelopeDuotone className="mr-2 h-4 w-4" />
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            placeholder="contoh@email.com"
                            className="col-span-3"
                        />
                    </div>

                    {/* Phone */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="phone"
                            className="text-right flex items-center justify-end"
                        >
                            <PiDeviceMobileDuotone className="mr-2 h-4 w-4" />
                            Telepon
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone || ""}
                            onChange={handleChange}
                            placeholder="08123456789"
                            className="col-span-3"
                        />
                    </div>

                    {/* WhatsApp */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="whatsapp"
                            className="text-right flex items-center justify-end"
                        >
                            <PiWhatsappLogoDuotone className="mr-2 h-4 w-4" />
                            WhatsApp
                        </Label>
                        <Input
                            id="whatsapp"
                            name="whatsapp"
                            value={formData.whatsapp || ""}
                            onChange={handleChange}
                            placeholder="08123456789"
                            className="col-span-3"
                        />
                    </div>

                    {/* Website */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="website"
                            className="text-right flex items-center justify-end"
                        >
                            <PiGlobeDuotone className="mr-2 h-4 w-4" />
                            Website
                        </Label>
                        <Input
                            id="website"
                            name="website"
                            value={formData.website || ""}
                            onChange={handleChange}
                            placeholder="https://contoh.com"
                            className="col-span-3"
                        />
                    </div>

                    {/* Instagram */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="instagram"
                            className="text-right flex items-center justify-end"
                        >
                            <PiInstagramLogoDuotone className="mr-2 h-4 w-4" />
                            Instagram
                        </Label>
                        <Input
                            id="instagram"
                            name="instagram"
                            value={formData.instagram || ""}
                            onChange={handleChange}
                            placeholder="@username"
                            className="col-span-3"
                        />
                    </div>

                    {/* YouTube */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="youtube"
                            className="text-right flex items-center justify-end"
                        >
                            <PiYoutubeLogoDuotone className="mr-2 h-4 w-4" />
                            YouTube
                        </Label>
                        <Input
                            id="youtube"
                            name="youtube"
                            value={formData.youtube || ""}
                            onChange={handleChange}
                            placeholder="@channel"
                            className="col-span-3"
                        />
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                            htmlFor="address"
                            className="text-right flex items-start justify-end pt-2"
                        >
                            <PiMapPinDuotone className="mr-2 h-4 w-4" />
                            Alamat
                        </Label>
                        <Textarea
                            id="address"
                            name="address"
                            value={formData.address || ""}
                            onChange={handleChange}
                            placeholder="Masukkan alamat lengkap"
                            className="col-span-3"
                            rows={3}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="gap-2"
                    >
                        <PiFloppyDiskDuotone className="h-4 w-4" />
                        {isLoading ? "Menyimpan..." : "Simpan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditContactModal;
