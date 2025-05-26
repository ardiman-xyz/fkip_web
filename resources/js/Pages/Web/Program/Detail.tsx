import Guest2 from "@/Layouts/GuestLayout2";
import {
    BookOpen,
    GraduationCap,
    Users,
    Calendar,
    Mail,
    Phone,
    Globe,
    MapPin,
    Instagram,
    Youtube,
    Clock,
    ArrowRight,
    Clock4,
    Award,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { ProdiSidebar } from "../_components/ProdiSidebar";
import { Badge } from "@/Components/ui/badge";

type ProgramDetailProps = {
    program: {
        id: number;
        name: string;
        slug: string;
        code?: string;
        level?: {
            id: number;
            name: string;
            code: string;
        };
        faculty: string;
        department: string;
        status: string;
        description?: {
            description: string;
            vision?: string;
            mission?: string;
            accreditation?: string;
            accreditation_date?: string;
        };
        contact?: {
            email?: string;
            phone?: string;
            whatsapp?: string;
            website?: string;
            instagram?: string;
            youtube?: string;
            address?: string;
        };
        system_info: {
            id: number;
            updated_at: string;
        };
    };
    dosen: Array<{
        id: number;
        name: string;
        nidn?: string;
        position?: string;
    }>;
};

const ProgramDetail = ({ program, dosen }: ProgramDetailProps) => {
    console.info(program);

    return (
        <Guest2>
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm mb-6 text-gray-600">
                        <a
                            href="/"
                            className="hover:text-green-600 transition-colors"
                        >
                            Beranda
                        </a>
                        <span>&gt;</span>
                        <a
                            href={
                                program.level?.code === "s1"
                                    ? "/program/sarjana"
                                    : "/program/magister"
                            }
                            className="hover:text-green-600 transition-colors"
                        >
                            {program.level?.code === "s1"
                                ? "Program Sarjana"
                                : "Program Magister"}
                        </a>
                        <span>&gt;</span>
                        <span className="text-gray-800 font-medium">
                            {program.name}
                        </span>
                    </div>

                    {/* Header dengan banner yang dinamis berdasarkan jenjang pendidikan */}
                    <div className="bg-green-700 rounded-xl overflow-hidden mb-8 relative">
                        <div className="absolute inset-0 opacity-10 bg-[url('/images/patterns/pattern-dots.svg')] bg-repeat"></div>
                        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-3/4">
                                <Badge className="bg-blue-100 text-blue-800 mb-4 px-3 py-1 text-sm">
                                    Akreditasi{" "}
                                    {program.description?.accreditation || "B"}
                                </Badge>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    {program.name}
                                </h1>
                                <p className="text-green-100 mb-6">
                                    {program.description?.description
                                        ?.substring(0, 200)
                                        ?.replace(/<[^>]*>/g, "") ||
                                        `Program studi ${
                                            program.level?.code === "s1"
                                                ? "sarjana"
                                                : "magister"
                                        } yang mempersiapkan pendidik profesional dengan pendekatan inovatif dan berbasis teknologi.`}
                                    ...
                                </p>

                                {/* Informasi tambahan berdasarkan jenjang */}
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                                        <Clock4 className="w-4 h-4" />
                                        <span>
                                            Durasi{" "}
                                            {program.level?.code === "s1"
                                                ? "4"
                                                : "2"}{" "}
                                            Tahun
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                                        <GraduationCap className="w-4 h-4" />
                                        <span>
                                            Gelar{" "}
                                            {program.level?.code === "s1"
                                                ? "S.Pd"
                                                : "M.Pd"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                                        <Award className="w-4 h-4" />
                                        <span>{program.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/4 flex items-center justify-center">
                                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                                    <GraduationCap className="w-16 h-16 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-8">
                            {/* Informasi Dasar */}
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                                <div className="border-b border-gray-100">
                                    <h2 className="text-xl font-bold p-6">
                                        Informasi Dasar
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Nama Program Studi
                                                </p>
                                                <p className="font-medium">
                                                    {program.name}
                                                </p>
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Jenjang Pendidikan
                                                </p>
                                                <p className="font-medium capitalize">
                                                    {program.level
                                                        ? `${program.level.name} (${program.level.code})`
                                                        : "-"}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Fakultas
                                                </p>
                                                <p className="font-medium">
                                                    {program.faculty}
                                                </p>
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">
                                                    Status
                                                </p>
                                                <Badge className="bg-green-100 text-green-800 font-normal">
                                                    {program.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Deskripsi & Visi Misi - Hanya ditampilkan jika ada data */}
                            {(program.description?.description ||
                                program.description?.vision ||
                                program.description?.mission) && (
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                                    <div className="border-b border-gray-100">
                                        <h2 className="text-xl font-bold p-6">
                                            Deskripsi & Visi Misi
                                        </h2>
                                    </div>
                                    <div className="p-6">
                                        {program.description?.description && (
                                            <div className="prose prose-green max-w-none mb-8">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: program
                                                            .description
                                                            .description,
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {program.description?.vision && (
                                            <div className="mb-8">
                                                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                                                        <Award className="w-5 h-5 mr-2" />
                                                        Visi
                                                    </h3>
                                                    <div className="prose prose-green max-w-none">
                                                        <p>
                                                            {
                                                                program
                                                                    .description
                                                                    .vision
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {program.description?.mission && (
                                            <div>
                                                <h3 className="text-lg font-semibold mb-4">
                                                    Misi
                                                </h3>
                                                <div className="prose prose-green max-w-none">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: program
                                                                .description
                                                                .mission,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Dosen Program Studi - Hanya ditampilkan jika ada data */}
                            {dosen.length > 0 && (
                                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                                    <div className="border-b border-gray-100">
                                        <h2 className="text-xl font-bold p-6">
                                            Dosen Program Studi
                                        </h2>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {dosen.map((lecturer) => (
                                                <div
                                                    key={lecturer.id}
                                                    className="flex items-center gap-4 p-4 border rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
                                                >
                                                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                        <Users className="w-6 h-6 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">
                                                            {lecturer.name}
                                                        </h3>
                                                        {lecturer.nidn && (
                                                            <p className="text-sm text-gray-500">
                                                                NIDN:{" "}
                                                                {lecturer.nidn}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Informasi Kontak - Hanya ditampilkan jika ada data kontak */}
                            {program.contact &&
                                Object.values(program.contact).some(
                                    (value) => value
                                ) && (
                                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                        <div className="border-b border-gray-100">
                                            <h2 className="text-xl font-bold p-6">
                                                Informasi Kontak
                                            </h2>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {program.contact.email && (
                                                    <div className="flex items-start gap-4">
                                                        <div className="bg-green-100 p-2 rounded-md">
                                                            <Mail className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500 mb-1">
                                                                Email
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    program
                                                                        .contact
                                                                        .email
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {program.contact.phone && (
                                                    <div className="flex items-start gap-4">
                                                        <div className="bg-green-100 p-2 rounded-md">
                                                            <Phone className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500 mb-1">
                                                                Telepon
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    program
                                                                        .contact
                                                                        .phone
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Konten WhatsApp, website, Instagram, YouTube tetap sama... */}
                                            </div>

                                            {program.contact.address && (
                                                <div className="mt-6 pt-6 border-t">
                                                    <div className="flex items-start gap-4">
                                                        <div className="bg-green-100 p-2 rounded-md">
                                                            <MapPin className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500 mb-1">
                                                                Alamat
                                                            </p>
                                                            <p className="font-medium">
                                                                {
                                                                    program
                                                                        .contact
                                                                        .address
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>

                        <div className="md:col-span-4">
                            <div className="sticky top-20">
                                {/* CTA Pendaftaran */}
                                <div className="bg-green-700 rounded-xl p-6 mb-6 shadow-md">
                                    <h3 className="text-xl font-bold text-white mb-4">
                                        Tertarik Mendaftar?
                                    </h3>
                                    <p className="text-green-100 mb-6">
                                        Jadilah bagian dari FKIP Universitas
                                        Muhammadiyah Kendari dan mulai langkah
                                        pendidikan anda bersama kami.
                                    </p>
                                    <Button className="w-full bg-white text-green-700 hover:bg-green-50">
                                        Daftar Sekarang{" "}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>

                                {/* Sidebar Components */}
                                <ProdiSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default ProgramDetail;
