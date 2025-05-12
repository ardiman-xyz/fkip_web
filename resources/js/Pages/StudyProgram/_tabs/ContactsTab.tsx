import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
    PiPlusDuotone,
    PiGlobe,
    PiEnvelope,
    PiPhone,
    PiWhatsappLogo,
    PiInstagramLogo,
    PiYoutubeLogo,
    PiMapPin,
} from "react-icons/pi";

interface StudyProgramContact {
    id: number;
    study_program_id: number;
    website: string | null;
    email: string | null;
    phone: string | null;
    whatsapp: string | null;
    instagram: string | null;
    youtube: string | null;
    address: string | null;
}

interface ContactsTabProps {
    contact?: StudyProgramContact | null;
}

const ContactsTab = ({ contact }: ContactsTabProps) => {
    if (!contact) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <p className="text-gray-500 text-center">
                    Belum ada informasi kontak untuk program studi ini.
                </p>
                <Button className="gap-2">
                    <PiPlusDuotone className="h-4 w-4" />
                    Tambah Kontak
                </Button>
            </div>
        );
    }

    const hasWebsiteOrSocial =
        contact.website || contact.instagram || contact.youtube;
    const hasContactInfo = contact.email || contact.phone || contact.whatsapp;

    return (
        <div className="space-y-6">
            {hasWebsiteOrSocial && (
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Website & Media Sosial
                        </h3>

                        <div className="space-y-4">
                            {contact.website && (
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <PiGlobe className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-gray-500 font-medium">
                                            Website
                                        </h4>
                                        <a
                                            href={
                                                contact.website.startsWith(
                                                    "http"
                                                )
                                                    ? contact.website
                                                    : `https://${contact.website}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {contact.website}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {contact.instagram && (
                                <div className="flex items-center gap-2">
                                    <div className="bg-pink-100 p-2 rounded-full">
                                        <PiInstagramLogo className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-gray-500 font-medium">
                                            Instagram
                                        </h4>
                                        <a
                                            href={`https://instagram.com/${contact.instagram.replace(
                                                "@",
                                                ""
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-600 hover:underline"
                                        >
                                            {contact.instagram}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {contact.youtube && (
                                <div className="flex items-center gap-2">
                                    <div className="bg-red-100 p-2 rounded-full">
                                        <PiYoutubeLogo className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-gray-500 font-medium">
                                            YouTube
                                        </h4>
                                        <a
                                            href={
                                                contact.youtube.startsWith(
                                                    "http"
                                                )
                                                    ? contact.youtube
                                                    : `https://youtube.com/${contact.youtube}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-red-600 hover:underline"
                                        >
                                            {contact.youtube}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {hasContactInfo && (
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Informasi Kontak
                        </h3>

                        <div className="space-y-4">
                            {contact.email && (
                                <div className="flex items-center gap-2">
                                    <div className="bg-indigo-100 p-2 rounded-full">
                                        {" "}
                                        <PiEnvelope className="h-5 w-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-gray-500 font-medium">
                                            Email
                                        </h4>
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="text-indigo-600 hover:underline"
                                        >
                                            {contact.email}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {contact.phone && (
                                <div className="flex items-center gap-2">
                                    <div className="bg-orange-100 p-2 rounded-full">
                                        <PiPhone className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-gray-500 font-medium">
                                            Telepon
                                        </h4>
                                        <a
                                            href={`tel:${contact.phone}`}
                                            className="text-orange-600 hover:underline"
                                        >
                                            {contact.phone}
                                        </a>
                                    </div>
                                </div>
                            )}

                            {contact.whatsapp && (
                                <div className="flex items-center gap-2">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <PiWhatsappLogo className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-gray-500 font-medium">
                                            WhatsApp
                                        </h4>
                                        <a
                                            href={`https://wa.me/${contact.whatsapp.replace(
                                                /\D/g,
                                                ""
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-green-600 hover:underline"
                                        >
                                            {contact.whatsapp}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {contact.address && (
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Alamat</h3>

                        <div className="flex items-start gap-2">
                            <div className="bg-gray-100 p-2 rounded-full mt-0.5">
                                <PiMapPin className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                                <h4 className="text-sm text-gray-500 font-medium">
                                    Alamat Kantor
                                </h4>
                                <p className="text-base whitespace-pre-line">
                                    {contact.address}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="flex justify-end">
                <Button variant="outline" className="gap-2">
                    <PiPlusDuotone className="h-4 w-4" />
                    Edit Informasi Kontak
                </Button>
            </div>
        </div>
    );
};

export default ContactsTab;
