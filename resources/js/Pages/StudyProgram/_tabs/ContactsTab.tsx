// resources/js/Pages/Admin/StudyProgram/_tabs/ContactsTab.tsx
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    PiEnvelopeDuotone,
    PiPhoneDuotone,
    PiWhatsappLogoDuotone,
    PiInstagramLogoDuotone,
    PiYoutubeLogoDuotone,
    PiGlobeDuotone,
    PiMapPinDuotone,
    PiPencilSimpleDuotone,
} from "react-icons/pi";
import { useState } from "react";
import EditContactModal from "../_components/EditContactModal";

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

interface ContactsTabProps {
    contact: StudyProgramContact | null | undefined;
    studyProgramId: number;
}

const ContactsTab = ({ contact, studyProgramId }: ContactsTabProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentContact, setCurrentContact] =
        useState<StudyProgramContact | null>(contact || null);

    const handleSuccess = (updatedContact: StudyProgramContact) => {
        setCurrentContact(updatedContact);
    };

    // Helper function untuk format nomor telepon
    const formatPhoneNumber = (phoneNumber: string | null) => {
        if (!phoneNumber) return null;

        // Hapus karakter non-digit
        const digits = phoneNumber.replace(/\D/g, "");

        // Pastikan dimulai dengan +62
        if (digits.startsWith("62")) {
            return `+${digits}`;
        } else if (digits.startsWith("0")) {
            return `+62${digits.substring(1)}`;
        } else {
            return `+62${digits}`;
        }
    };

    // Helper function untuk membuat link WhatsApp
    const getWhatsAppLink = (number: string | null) => {
        if (!number) return "#";
        const formattedNumber = formatPhoneNumber(number);
        if (!formattedNumber) return "#";
        return `https://wa.me/${formattedNumber.replace("+", "")}`;
    };

    // Helper function untuk membuat link Instagram
    const getInstagramLink = (username: string | null) => {
        if (!username) return "#";
        // Hapus @ jika ada
        const cleanUsername = username.startsWith("@")
            ? username.substring(1)
            : username;
        return `https://instagram.com/${cleanUsername}`;
    };

    // Helper function untuk membuat link YouTube
    const getYouTubeLink = (channel: string | null) => {
        if (!channel) return "#";
        if (channel.includes("youtube.com") || channel.includes("youtu.be")) {
            return channel;
        }
        return `https://youtube.com/${channel}`;
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold">
                            Informasi Kontak
                        </h3>
                        <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PiPencilSimpleDuotone className="h-4 w-4" />
                            Edit Kontak
                        </Button>
                    </div>

                    {/* Informasi kontak */}
                    <div className="grid gap-4">
                        {/* Email */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <PiEnvelopeDuotone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Email</p>
                                {currentContact?.email ? (
                                    <a
                                        href={`mailto:${currentContact.email}`}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {currentContact.email}
                                    </a>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        Belum ada email
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Telepon */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <PiPhoneDuotone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Telepon</p>
                                {currentContact?.phone ? (
                                    <a
                                        href={`tel:${currentContact.phone}`}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {currentContact.phone}
                                    </a>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        Belum ada nomor telepon
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* WhatsApp */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <PiWhatsappLogoDuotone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">WhatsApp</p>
                                {currentContact?.whatsapp ? (
                                    <a
                                        href={getWhatsAppLink(
                                            currentContact.whatsapp
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {currentContact.whatsapp}
                                    </a>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        Belum ada nomor WhatsApp
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Website */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <PiGlobeDuotone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Website</p>
                                {currentContact?.website ? (
                                    <a
                                        href={
                                            currentContact.website.startsWith(
                                                "http"
                                            )
                                                ? currentContact.website
                                                : `https://${currentContact.website}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {currentContact.website}
                                    </a>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        Belum ada website
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Instagram */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <PiInstagramLogoDuotone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Instagram</p>
                                {currentContact?.instagram ? (
                                    <a
                                        href={getInstagramLink(
                                            currentContact.instagram
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {currentContact.instagram}
                                    </a>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        Belum ada akun Instagram
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* YouTube */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <PiYoutubeLogoDuotone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">YouTube</p>
                                {currentContact?.youtube ? (
                                    <a
                                        href={getYouTubeLink(
                                            currentContact.youtube
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {currentContact.youtube}
                                    </a>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        Belum ada channel YouTube
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Alamat */}
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <PiMapPinDuotone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Alamat</p>
                                {currentContact?.address ? (
                                    <p className="text-sm">
                                        {currentContact.address}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">
                                        Belum ada alamat
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Modal edit kontak */}
            {isModalOpen && (
                <EditContactModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleSuccess}
                    studyProgramId={studyProgramId}
                    contact={currentContact}
                />
            )}
        </div>
    );
};

export default ContactsTab;
