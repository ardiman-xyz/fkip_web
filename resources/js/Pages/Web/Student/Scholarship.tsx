import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Input } from "@/Components/ui/input";
import Guest2 from "@/Layouts/GuestLayout2";
import { StudentSidebar } from "../_components/StudentSidebar";
import {
    Calendar,
    Search,
    Users,
    BookOpen,
    Award,
    GraduationCap,
    Coins,
    Clock,
    ExternalLink,
    FileCheck,
    ArrowRight,
    AlertCircle,
} from "lucide-react";
import { useState } from "react";

interface ScholarshipProps {
    scholarships?: Array<{
        id: number;
        name: string;
        slug: string;
        provider: string;
        description: string | null;
        amount: string | null;
        requirements: string | null;
        start_date: string;
        end_date: string;
        application_deadline: string;
        quota: number | null;
        contact_person: string | null;
        contact_email: string | null;
        contact_phone: string | null;
        is_active: boolean;
        is_featured: boolean;
        cover_image?: {
            id: number;
            path: string;
            paths?: {
                thumbnail: string;
                original: string;
            };
        } | null;
    }>;
}

const Scholarship = ({ scholarships = [] }: ScholarshipProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // Contoh data beasiswa jika tidak ada dari props
    const sampleScholarships = scholarships;

    // Filter berdasarkan pencarian
    const filteredScholarships = sampleScholarships.filter(
        (scholarship) =>
            scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            scholarship.provider
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            (scholarship.description &&
                scholarship.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    // Filter berdasarkan tab
    const tabFilteredScholarships = filteredScholarships.filter(
        (scholarship) => {
            if (activeTab === "all") return true;
            if (activeTab === "active")
                return (
                    scholarship.is_active &&
                    new Date(scholarship.application_deadline) >= new Date()
                );
            if (activeTab === "featured") return scholarship.is_featured;
            return true;
        }
    );

    // Helper function to format date
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };
    const isDeadlinePassed = (deadlineDate: string): boolean => {
        return new Date(deadlineDate) < new Date();
    };

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="space-y-8">
                                {/* Header */}
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold mb-4">
                                        Program Beasiswa
                                    </h1>
                                    <p className="text-gray-600">
                                        Informasi mengenai program beasiswa yang
                                        tersedia untuk mahasiswa FKIP UMK.
                                    </p>
                                </div>

                                {/* Search and Tabs */}
                                <div className="space-y-5">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                        <Input
                                            placeholder="Cari beasiswa..."
                                            className="pl-10"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>

                                    <Tabs
                                        defaultValue="all"
                                        value={activeTab}
                                        onValueChange={setActiveTab}
                                        className="w-full"
                                    >
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="all">
                                                Semua Beasiswa
                                            </TabsTrigger>
                                            <TabsTrigger value="active">
                                                Beasiswa Aktif
                                            </TabsTrigger>
                                            <TabsTrigger value="featured">
                                                Beasiswa Unggulan
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>

                                {/* Scholarship List */}
                                <div className="space-y-6">
                                    {tabFilteredScholarships.length > 0 ? (
                                        tabFilteredScholarships.map(
                                            (scholarship) => (
                                                <Card
                                                    key={scholarship.id}
                                                    className={`overflow-hidden transition-all hover:shadow-md ${
                                                        !scholarship.is_active ||
                                                        isDeadlinePassed(
                                                            scholarship.application_deadline
                                                        )
                                                            ? "opacity-70"
                                                            : ""
                                                    }`}
                                                >
                                                    <CardContent className="p-0">
                                                        <div className="p-6">
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <h2 className="text-xl font-semibold">
                                                                        {
                                                                            scholarship.name
                                                                        }
                                                                    </h2>
                                                                    <p className="text-gray-500">
                                                                        {
                                                                            scholarship.provider
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    {scholarship.is_featured && (
                                                                        <Badge className="bg-green-100 text-green-800">
                                                                            Unggulan
                                                                        </Badge>
                                                                    )}
                                                                    <Badge
                                                                        className={
                                                                            isDeadlinePassed(
                                                                                scholarship.application_deadline
                                                                            )
                                                                                ? "bg-red-100 text-red-700"
                                                                                : "bg-blue-100 text-blue-700"
                                                                        }
                                                                    >
                                                                        {isDeadlinePassed(
                                                                            scholarship.application_deadline
                                                                        )
                                                                            ? "Pendaftaran Ditutup"
                                                                            : "Pendaftaran Dibuka"}
                                                                    </Badge>
                                                                </div>
                                                            </div>

                                                            <p className="text-gray-600 mb-5">
                                                                {
                                                                    scholarship.description
                                                                }
                                                            </p>

                                                            <div className="grid md:grid-cols-2 gap-5 mb-6">
                                                                {/* Nilai Beasiswa */}
                                                                {scholarship.amount && (
                                                                    <div className="flex gap-3 items-start">
                                                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                            <Coins className="w-5 h-5 text-green-600" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm text-gray-500">
                                                                                Nilai
                                                                                Beasiswa
                                                                            </p>
                                                                            <p className="font-medium">
                                                                                {
                                                                                    scholarship.amount
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Deadline */}
                                                                <div className="flex gap-3 items-start">
                                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                        <Calendar className="w-5 h-5 text-blue-600" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm text-gray-500">
                                                                            Deadline
                                                                            Pendaftaran
                                                                        </p>
                                                                        <p className="font-medium">
                                                                            {formatDate(
                                                                                scholarship.application_deadline
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {/* Kuota */}
                                                                {scholarship.quota && (
                                                                    <div className="flex gap-3 items-start">
                                                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                            <Users className="w-5 h-5 text-purple-600" />
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-sm text-gray-500">
                                                                                Kuota
                                                                            </p>
                                                                            <p className="font-medium">
                                                                                {
                                                                                    scholarship.quota
                                                                                }{" "}
                                                                                penerima
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Periode */}
                                                                <div className="flex gap-3 items-start">
                                                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                        <Clock className="w-5 h-5 text-amber-600" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm text-gray-500">
                                                                            Periode
                                                                            Beasiswa
                                                                        </p>
                                                                        <p className="font-medium">
                                                                            {formatDate(
                                                                                scholarship.start_date
                                                                            )}{" "}
                                                                            -{" "}
                                                                            {formatDate(
                                                                                scholarship.end_date
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Persyaratan */}
                                                            {scholarship.requirements && (
                                                                <div className="mb-6">
                                                                    <h3 className="text-md font-semibold mb-2 flex items-center">
                                                                        <FileCheck className="w-5 h-5 mr-2 text-gray-500" />
                                                                        Persyaratan
                                                                    </h3>
                                                                    <div className="pl-7">
                                                                        <ul className="list-disc text-gray-600 text-sm space-y-1 pl-5">
                                                                            {scholarship.requirements
                                                                                .split(
                                                                                    ","
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        requirement,
                                                                                        index
                                                                                    ) => (
                                                                                        <li
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                        >
                                                                                            {requirement.trim()}
                                                                                        </li>
                                                                                    )
                                                                                )}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Contact Info & CTA */}
                                                            <div className="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-gray-100">
                                                                <div className="text-sm text-gray-500 mb-4 md:mb-0">
                                                                    {scholarship.contact_person && (
                                                                        <div className="mb-1">
                                                                            Kontak:{" "}
                                                                            {
                                                                                scholarship.contact_person
                                                                            }
                                                                        </div>
                                                                    )}
                                                                    {scholarship.contact_email && (
                                                                        <div className="mb-1">
                                                                            Email:{" "}
                                                                            {
                                                                                scholarship.contact_email
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <Button
                                                                    disabled={
                                                                        !scholarship.is_active ||
                                                                        isDeadlinePassed(
                                                                            scholarship.application_deadline
                                                                        )
                                                                    }
                                                                    asChild={
                                                                        scholarship.is_active &&
                                                                        !isDeadlinePassed(
                                                                            scholarship.application_deadline
                                                                        )
                                                                    }
                                                                >
                                                                    {/* {scholarship.is_active &&
                                                                    !isDeadlinePassed(
                                                                        scholarship.application_deadline
                                                                    ) ? (
                                                                        <a
                                                                            href={`/kemahasiswaan/beasiswa/${scholarship.slug}`}
                                                                        >
                                                                            Detail
                                                                            &
                                                                            Daftar{" "}
                                                                            <ArrowRight className="w-4 h-4 ml-2" />
                                                                        </a>
                                                                    ) : (
                                                                        <span>
                                                                            Pendaftaran
                                                                            Ditutup
                                                                        </span>
                                                                    )} */}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )
                                        )
                                    ) : (
                                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                                            <AlertCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                            <h3 className="text-lg font-medium">
                                                Tidak ada beasiswa ditemukan
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {searchTerm
                                                    ? `Tidak ada hasil yang cocok dengan pencarian "${searchTerm}"`
                                                    : "Belum ada program beasiswa tersedia saat ini"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <div className="sticky top-20 space-y-6">
                                <StudentSidebar />

                                {/* Info Card - Tips Mendapatkan Beasiswa */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Tips Mendapatkan Beasiswa
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex gap-3">
                                            <GraduationCap className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">
                                                    Jaga IPK
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Pertahankan nilai akademik
                                                    yang baik, sebagian besar
                                                    beasiswa mensyaratkan IPK
                                                    minimal 3.00.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <Award className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">
                                                    Aktif Berorganisasi
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Terlibat dalam kegiatan
                                                    kampus akan menambah poin
                                                    pada seleksi beasiswa.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <FileCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">
                                                    Persiapkan Dokumen
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Siapkan semua persyaratan
                                                    administrasi dengan baik dan
                                                    lengkap sebelum deadline.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <BookOpen className="w-5 h-5 text-green-600 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium">
                                                    Essay yang Menarik
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Buat essay yang berkualitas
                                                    dan menunjukkan motivasi
                                                    serta tujuan yang jelas.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Info Kontak Kemahasiswaan */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Butuh Bantuan?</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Untuk informasi lebih lanjut tentang
                                            program beasiswa, silakan hubungi
                                            Bagian Kemahasiswaan FKIP UMK.
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <Calendar className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <p className="text-sm">
                                                    Senin - Jumat: 08.00 - 16.00
                                                    WITA
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <ExternalLink className="w-4 h-4 text-green-600" />
                                                </div>
                                                <a
                                                    href="https://kemahasiswaan.umkendari.ac.id"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    kemahasiswaan.umkendari.ac.id
                                                </a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Scholarship;
