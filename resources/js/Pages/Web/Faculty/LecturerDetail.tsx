// pages/Lecturers/Show.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import { UserSquare2, Mail, Phone, Globe } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

interface LecturerDetailProps {
    lecturer: {
        id: number;
        nidn?: string;
        nip?: string;
        academic_title?: string;
        translations: {
            id: {
                full_name: string;
                academic_title?: string;
                biography?: string;
                bio?: string; // For compatibility with both field names
                education_history?: string;
                research_interests?: string;
                teaching_experience?: string;
                publications?: string;
                awards?: string;
            };
        };
        academic_position?: {
            translations: {
                id: {
                    name: string;
                };
            };
        };
        media?: {
            path: string;
        };
        contact?: {
            email?: string;
            phone?: string;
            website?: string;
            whatsapp?: string;
        };
        google_scholar_id?: string;
        scopus_id?: string;
        sinta_id?: string;
    };
}

const LecturerDetail = ({ lecturer }: LecturerDetailProps) => {
    // Handle the case where bio might be stored as biography in some cases
    const biography =
        lecturer.translations.id.biography ||
        lecturer.translations.id.bio ||
        "";

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">
                                        Beranda
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/fakultas/dosen">
                                        Direktori Dosen
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {lecturer.translations.id.full_name}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        {/* Profile Section */}
                        <div className="col-span-12 lg:col-span-4">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden mb-4">
                                            {lecturer.media ? (
                                                <img
                                                    src={lecturer.media.path}
                                                    alt={
                                                        lecturer.translations.id
                                                            .full_name
                                                    }
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <UserSquare2 className="w-full h-full p-6 text-gray-400" />
                                            )}
                                        </div>
                                        <h1 className="text-xl font-bold mb-1">
                                            {lecturer.translations.id.full_name}
                                        </h1>
                                        {lecturer.nidn && (
                                            <p className="text-gray-600 mb-2">
                                                NIDN. {lecturer.nidn}
                                            </p>
                                        )}
                                        {lecturer.academic_position && (
                                            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                                {
                                                    lecturer.academic_position
                                                        .translations.id.name
                                                }
                                            </div>
                                        )}
                                        {lecturer.academic_title && (
                                            <p className="text-gray-600 mt-2">
                                                {lecturer.academic_title}
                                            </p>
                                        )}

                                        {/* Contact Info */}
                                        {lecturer.contact && (
                                            <div className="w-full mt-6 space-y-3">
                                                {lecturer.contact.email && (
                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <Mail className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            {
                                                                lecturer.contact
                                                                    .email
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                                {lecturer.contact.phone && (
                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <Phone className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            {
                                                                lecturer.contact
                                                                    .phone
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                                {lecturer.contact.website && (
                                                    <div className="flex items-center gap-3 text-gray-600">
                                                        <Globe className="w-4 h-4" />
                                                        <a
                                                            href={
                                                                lecturer.contact
                                                                    .website
                                                            }
                                                            target="_blank"
                                                            className="text-sm text-blue-600 hover:underline"
                                                        >
                                                            Lihat Website
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Scholar IDs */}
                                        <div className="w-full mt-6 space-y-3">
                                            {lecturer.google_scholar_id && (
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <a
                                                        href={`https://scholar.google.com/citations?user=${lecturer.google_scholar_id}`}
                                                        target="_blank"
                                                        className="text-sm text-blue-600 hover:underline"
                                                    >
                                                        Google Scholar
                                                    </a>
                                                </div>
                                            )}
                                            {lecturer.scopus_id && (
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <a
                                                        href={`https://www.scopus.com/authid/detail.uri?authorId=${lecturer.scopus_id}`}
                                                        target="_blank"
                                                        className="text-sm text-blue-600 hover:underline"
                                                    >
                                                        Scopus
                                                    </a>
                                                </div>
                                            )}
                                            {lecturer.sinta_id && (
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <a
                                                        href={`https://sinta.kemdikbud.go.id/authors/profile/${lecturer.sinta_id}`}
                                                        target="_blank"
                                                        className="text-sm text-blue-600 hover:underline"
                                                    >
                                                        SINTA
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8 space-y-8">
                            {/* Bio */}
                            {biography && (
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-semibold mb-4">
                                            Biografi
                                        </h2>
                                        <p className="text-gray-600">
                                            {biography}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Education */}
                            {lecturer.translations.id.education_history && (
                                <Card>
                                    <CardContent className="p-6">
                                        <h2 className="text-xl font-semibold mb-4">
                                            Riwayat Pendidikan
                                        </h2>
                                        <div
                                            className="prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: lecturer.translations.id
                                                    .education_history,
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            )}

                            {/* Teaching and Research */}
                            {(lecturer.translations.id.teaching_experience ||
                                lecturer.translations.id
                                    .research_interests) && (
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-6">
                                            {lecturer.translations.id
                                                .teaching_experience && (
                                                <div>
                                                    <h2 className="text-xl font-semibold mb-4">
                                                        Pengalaman Mengajar
                                                    </h2>
                                                    <div
                                                        className="prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{
                                                            __html: lecturer
                                                                .translations.id
                                                                .teaching_experience,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            {lecturer.translations.id
                                                .research_interests && (
                                                <div>
                                                    <h2 className="text-xl font-semibold mb-4">
                                                        Bidang Penelitian
                                                    </h2>
                                                    <div
                                                        className="prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{
                                                            __html: lecturer
                                                                .translations.id
                                                                .research_interests,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Publications and Awards */}
                            {(lecturer.translations.id.publications ||
                                lecturer.translations.id.awards) && (
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-6">
                                            {lecturer.translations.id
                                                .publications && (
                                                <div>
                                                    <h2 className="text-xl font-semibold mb-4">
                                                        Publikasi
                                                    </h2>
                                                    <div
                                                        className="prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{
                                                            __html: lecturer
                                                                .translations.id
                                                                .publications,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            {lecturer.translations.id
                                                .awards && (
                                                <div>
                                                    <h2 className="text-xl font-semibold mb-4">
                                                        Penghargaan
                                                    </h2>
                                                    <div
                                                        className="prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{
                                                            __html: lecturer
                                                                .translations.id
                                                                .awards,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default LecturerDetail;
