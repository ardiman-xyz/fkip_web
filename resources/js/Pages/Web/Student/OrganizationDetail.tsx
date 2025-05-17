import Guest2 from "@/Layouts/GuestLayout2";
import { StudentSidebar } from "../_components/StudentSidebar";
import {
    Users,
    Calendar,
    Instagram,
    Mail,
    MapPin,
    Globe,
    Share2,
    FileText,
    Award,
    Clock,
    ChevronLeft,
    ExternalLink,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useState } from "react";

interface OrganizationDetailProps {
    organization: {
        id: number;
        name: string;
        slug: string;
        description: string | null;
        founding_year: string | null;
        email: string | null;
        instagram: string | null;
        is_active: boolean;
        is_featured: boolean;
        logo?: {
            id: number;
            path: string;
            paths?: {
                thumbnail: string;
                original: string;
            };
        } | null;
        cover_image?: {
            id: number;
            path: string;
            paths?: {
                thumbnail: string;
                original: string;
            };
        } | null;
        translations?: {
            vision?: string | null;
            mission?: string | null;
        };
        officers?: Array<{
            id: number;
            name: string;
            position: string;
            period: string;
            image?: {
                id: number;
                path: string;
                paths?: {
                    thumbnail: string;
                };
            } | null;
        }>;
    };
}

const OrganizationDetail = ({ organization }: OrganizationDetailProps) => {
    // Dummy data untuk officers jika tidak ada data dari props
    const sampleOfficers = [
        {
            id: 1,
            name: "Ahmad Fauzan",
            position: "Ketua Umum",
            period: "2024-2025",
            image: null,
        },
        {
            id: 2,
            name: "Siti Nurhaliza",
            position: "Sekretaris Umum",
            period: "2024-2025",
            image: null,
        },
        {
            id: 3,
            name: "Budi Santoso",
            position: "Bendahara Umum",
            period: "2024-2025",
            image: null,
        },
        {
            id: 4,
            name: "Dewi Indah",
            position: "Ketua Divisi Kaderisasi",
            period: "2024-2025",
            image: null,
        },
        {
            id: 5,
            name: "Rizki Pratama",
            position: "Ketua Divisi Penelitian",
            period: "2024-2025",
            image: null,
        },
        {
            id: 6,
            name: "Anisa Fitriani",
            position: "Ketua Divisi Dakwah",
            period: "2024-2025",
            image: null,
        },
    ];

    // Dummy data untuk activities
    const activities = [
        {
            id: 1,
            title: "Pelatihan Kepemimpinan Dasar",
            date: "21 Juni 2025",
            description:
                "Pelatihan untuk kader baru sebagai pengenalan organisasi dan pengembangan skill dasar kepemimpinan.",
            image: "/placeholder.svg",
        },
        {
            id: 2,
            title: "Seminar Nasional Pendidikan",
            date: "15 Juli 2025",
            description:
                "Seminar dengan mengundang pembicara nasional membahas isu pendidikan terkini.",
            image: "/placeholder.svg",
        },
        {
            id: 3,
            title: "Bakti Sosial",
            date: "28 Agustus 2025",
            description:
                "Kegiatan bakti sosial di panti asuhan dan sekolah-sekolah di daerah tertinggal.",
            image: "/placeholder.svg",
        },
    ];

    // Menggunakan data dari props atau data dummy jika tidak tersedia
    const officers = organization.officers || sampleOfficers;
    const coverImageUrl = organization.cover_image
        ? organization.cover_image.paths?.original ||
          organization.cover_image.path
        : "/images/bg/campus-bg.jpg";
    const logoUrl = organization.logo
        ? organization.logo.paths?.thumbnail || organization.logo.path
        : "/placeholder.svg";

    return (
        <Guest2>
            <div className="min-h-screen bg-white">
                {/* Hero Section dengan Cover Image */}
                <div
                    className="relative h-80 bg-cover bg-center"
                    style={{ backgroundImage: `url('${coverImageUrl}')` }}
                >
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>

                    {/* Back button */}
                    <div className="absolute top-4 left-4">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="bg-white/20 border-white/20 text-white hover:bg-white/30 hover:text-white"
                        >
                            <a href="/kemahasiswaan/organisasi">
                                <ChevronLeft className="w-4 h-4 mr-1" /> Kembali
                            </a>
                        </Button>
                    </div>

                    {/* Organization Info */}
                    <div className="container max-w-6xl mx-auto px-4 relative h-full flex flex-col justify-end pb-8">
                        <div className="flex items-end gap-6">
                            {/* Logo */}
                            <div className="w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center p-1 flex-shrink-0">
                                <img
                                    src={logoUrl}
                                    alt={`Logo ${organization.name}`}
                                    className="object-contain max-w-full max-h-full"
                                />
                            </div>

                            {/* Name & Info */}
                            <div className="text-white">
                                <h1 className="text-3xl font-bold">
                                    {organization.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 mt-2">
                                    {organization.founding_year && (
                                        <div className="flex items-center gap-1 text-sm">
                                            <Calendar className="w-4 h-4" />
                                            <span>
                                                Berdiri sejak{" "}
                                                {organization.founding_year}
                                            </span>
                                        </div>
                                    )}
                                    {organization.is_featured && (
                                        <Badge className="bg-green-500 text-white">
                                            Organisasi Unggulan
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container max-w-6xl mx-auto px-4 py-8">
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
                                    <BreadcrumbLink href="/kemahasiswaan/organisasi">
                                        Organisasi
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {organization.name}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        {/* Main Column */}
                        <div className="col-span-12 lg:col-span-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Tentang {organization.name}
                                    </CardTitle>
                                    <CardDescription>
                                        Sejarah dan informasi mengenai
                                        organisasi
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Description */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">
                                            Deskripsi
                                        </h3>
                                        <div className="prose prose-green max-w-none">
                                            <p>
                                                {organization.description ||
                                                    "Tidak ada deskripsi tersedia."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Vision & Mission */}
                                    {(organization.translations?.vision ||
                                        organization.translations?.mission) && (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Vision */}
                                            {organization.translations
                                                ?.vision && (
                                                <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                                    <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                                                        <Award className="w-5 h-5 mr-2" />
                                                        Visi
                                                    </h3>
                                                    <div className="prose prose-sm prose-green max-w-none">
                                                        <p>
                                                            {
                                                                organization
                                                                    .translations
                                                                    .vision
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Mission */}
                                            {organization.translations
                                                ?.mission && (
                                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                                    <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                                                        <FileText className="w-5 h-5 mr-2" />
                                                        Misi
                                                    </h3>
                                                    <div className="prose prose-sm prose-blue max-w-none">
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: organization
                                                                    .translations
                                                                    .mission,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Contact Information */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Informasi Kontak
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {organization.email && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <Mail className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Email
                                                        </p>
                                                        <p className="font-medium">
                                                            {organization.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {organization.instagram && (
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                                                        <Instagram className="w-5 h-5 text-pink-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Instagram
                                                        </p>
                                                        <a
                                                            href={`https://instagram.com/${organization.instagram}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-medium text-pink-600 hover:underline flex items-center gap-1"
                                                        >
                                                            @
                                                            {
                                                                organization.instagram
                                                            }
                                                            <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tab: Officers */}
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4">
                            <div className="sticky top-20 space-y-6">
                                <StudentSidebar />

                                {/* Join Organization CTA */}
                                <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-100">
                                    <CardHeader>
                                        <CardTitle className="text-green-800">
                                            Tertarik bergabung?
                                        </CardTitle>
                                        <CardDescription>
                                            Kembangkan potensi dan jaringan Anda
                                            bersama organisasi
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button className="w-full">
                                            Gabung Sekarang{" "}
                                            <Users className="w-4 h-4 ml-2" />
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Share Organization */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">
                                            Bagikan Informasi
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                <Share2 className="w-4 h-4 mr-2" />{" "}
                                                Bagikan
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1"
                                            >
                                                <Globe className="w-4 h-4 mr-2" />{" "}
                                                Website
                                            </Button>
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

export default OrganizationDetail;
