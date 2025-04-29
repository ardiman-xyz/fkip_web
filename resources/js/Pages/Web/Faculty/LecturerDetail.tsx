// pages/Lecturers/Show.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import {
    UserSquare2,
    Mail,
    Phone,
    Globe,
    MapPin,
    Book,
    Award,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

const dummyLecturer = {
    id: 1,
    nidn: "0012058501",
    translations: {
        id: {
            full_name: "Dr. Ahmad Rizali, M.Pd",
            academic_title: "Ph.D in Mathematics Education",
            bio: "Dr. Ahmad Rizali adalah dosen Pendidikan Matematika dengan pengalaman lebih dari 10 tahun dalam pengembangan model pembelajaran matematika berbasis teknologi. Fokus penelitiannya adalah pada inovasi pembelajaran matematika dan pengembangan media pembelajaran digital.",
            education_history: `
                <ul>
                    <li>S3 Pendidikan Matematika, Universitas Negeri Malang (2015-2019)</li>
                    <li>S2 Pendidikan Matematika, Universitas Negeri Yogyakarta (2009-2011)</li>
                    <li>S1 Pendidikan Matematika, Universitas Negeri Surabaya (2003-2007)</li>
                </ul>
            `,
            research_interests: `
                <ul>
                    <li>Pengembangan Media Pembelajaran Matematika</li>
                    <li>Teknologi dalam Pendidikan Matematika</li>
                    <li>Pembelajaran Kolaboratif berbasis Proyek</li>
                    <li>Analisis Kesulitan Belajar Matematika</li>
                </ul>
            `,
            teaching_experience: `
                <ul>
                    <li>Kalkulus Lanjut</li>
                    <li>Metode Penelitian</li>
                    <li>Pembelajaran Matematika Inovatif</li>
                    <li>Teknologi Pembelajaran Matematika</li>
                    <li>Statistika Pendidikan</li>
                </ul>
            `,
            publications: `
                <ul>
                    <li>Rizali, A. (2023). "Pengembangan Model Pembelajaran Matematika Berbasis Proyek". Jurnal Pendidikan Matematika, Vol. 15(2), 112-125.</li>
                    <li>Rizali, A. (2022). "Implementasi Teknologi AR dalam Pembelajaran Geometri". International Journal of Mathematics Education, Vol. 8(1), 45-58.</li>
                    <li>Rizali, A. & Santoso, B. (2021). "Efektivitas Media Digital dalam Pembelajaran Jarak Jauh". Jurnal Teknologi Pendidikan, Vol. 10(3), 78-92.</li>
                </ul>
            `,
            awards: `
                <ul>
                    <li>Best Paper Award pada International Conference on Mathematics Education (ICME) 2023</li>
                    <li>Dosen Berprestasi Tingkat Fakultas 2022</li>
                    <li>Peneliti Muda Terbaik Bidang Pendidikan 2021</li>
                </ul>
            `,
        },
    },
    academic_position: {
        translations: {
            id: {
                name: "Lektor Kepala",
            },
        },
    },
    study_program: {
        translations: {
            id: {
                name: "Pendidikan Matematika",
            },
        },
    },
    contacts: {
        email: "ahmad.rizali@umk.ac.id",
        phone: "081234567890",
        website: "https://rizali.web.id",
    },
};

interface LecturerDetailProps {
    lecturer: {
        id: number;
        nidn: string;
        translations: {
            id: {
                full_name: string;
                academic_title: string;
                bio: string;
                education_history: string;
                research_interests: string;
                teaching_experience: string;
                publications: string;
                awards: string;
            };
        };
        academic_position: {
            translations: {
                id: {
                    name: string;
                };
            };
        };
        study_program: {
            translations: {
                id: {
                    name: string;
                };
            };
        };
        media?: {
            path: string;
        };
        contacts: {
            email: string;
            phone: string;
            website: string;
        };
    };
}

const LecturerDetail = () => {
    const lecturer = dummyLecturer;

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
                                            {/* {lecturer.media ? (
                                                <img 
                                                    src={lecturer.media.path} 
                                                    alt={lecturer.translations.id.full_name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : ( */}
                                            <UserSquare2 className="w-full h-full p-6 text-gray-400" />
                                            {/* )} */}
                                        </div>
                                        <h1 className="text-xl font-bold mb-1">
                                            {lecturer.translations.id.full_name}
                                        </h1>
                                        <p className="text-gray-600 mb-2">
                                            NIDN. {lecturer.nidn}
                                        </p>
                                        <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                            {
                                                lecturer.academic_position
                                                    .translations.id.name
                                            }
                                        </div>
                                        <p className="text-gray-600 mt-2">
                                            {
                                                lecturer.study_program
                                                    .translations.id.name
                                            }
                                        </p>

                                        {/* Contact Info */}
                                        <div className="w-full mt-6 space-y-3">
                                            {lecturer.contacts.email && (
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <Mail className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {
                                                            lecturer.contacts
                                                                .email
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                            {lecturer.contacts.phone && (
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <Phone className="w-4 h-4" />
                                                    <span className="text-sm">
                                                        {
                                                            lecturer.contacts
                                                                .phone
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                            {lecturer.contacts.website && (
                                                <div className="flex items-center gap-3 text-gray-600">
                                                    <Globe className="w-4 h-4" />
                                                    <a
                                                        href={
                                                            lecturer.contacts
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
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8 space-y-8">
                            {/* Bio */}
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Biografi
                                    </h2>
                                    <p className="text-gray-600">
                                        {lecturer.translations.id.bio}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Education */}
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

                            {/* Teaching and Research */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
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
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Publications and Awards */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
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
                                        <div>
                                            <h2 className="text-xl font-semibold mb-4">
                                                Penghargaan
                                            </h2>
                                            <div
                                                className="prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{
                                                    __html: lecturer
                                                        .translations.id.awards,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default LecturerDetail;
