import Guest2 from "@/Layouts/GuestLayout2";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import {
    Users,
    Calendar,
    Instagram,
    Medal,
    GraduationCap,
    ChevronRight,
    ArrowRight,
    Search,
} from "lucide-react";
import { StudentSidebar } from "../_components/StudentSidebar";
import { Input } from "@/Components/ui/input";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { useState } from "react";

interface OrganizationProps {
    organizations?: Array<{
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
            };
        } | null;
        cover_image?: {
            id: number;
            path: string;
            paths?: {
                thumbnail: string;
            };
        } | null;
    }>;
}

const OrganisasiKemahasiswaan = ({ organizations = [] }: OrganizationProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Contoh data organisasi jika tidak ada data dari props
    const sampleOrganizations =
        organizations.length > 0
            ? organizations
            : [
                  {
                      id: 1,
                      name: "Ikatan Mahasiswa Muhammadiyah (IMM)",
                      slug: "imm",
                      description:
                          "Organisasi otonom Muhammadiyah yang berfokus pada pengembangan kepemimpinan, keilmuan, dan dakwah di kalangan mahasiswa perguruan tinggi.",
                      founding_year: "1964",
                      email: "imm.pusat@gmail.com",
                      instagram: "immpusat",
                      is_active: true,
                      is_featured: true,
                      logo: {
                          id: 1,
                          path: "/placeholder.svg",
                          paths: {
                              thumbnail: "/placeholder.svg",
                          },
                      },
                      cover_image: null,
                  },
                  {
                      id: 2,
                      name: "Pemuda Muhammadiyah",
                      slug: "pemuda-muhammadiyah",
                      description:
                          "Organisasi otonom untuk membina dan menggerakkan potensi pemuda Muhammadiyah dalam berbagai aspek kehidupan bermasyarakat.",
                      founding_year: "1932",
                      email: "pemuda.muhammadiyah@gmail.com",
                      instagram: "pemudamuhammadiyah_official",
                      is_active: true,
                      is_featured: false,
                      logo: {
                          id: 2,
                          path: "/placeholder.svg",
                          paths: {
                              thumbnail: "/placeholder.svg",
                          },
                      },
                      cover_image: null,
                  },
                  {
                      id: 3,
                      name: "Hizbul Wathan (HW)",
                      slug: "hizbul-wathan",
                      description:
                          "Gerakan kepanduan Islam dalam Muhammadiyah yang bertujuan menyiapkan dan membina anak, remaja, dan pemuda untuk menjadi manusia muslim yang berkarakter.",
                      founding_year: "1918",
                      email: "kwarpushw@gmail.com",
                      instagram: "hizbulwathan_official",
                      is_active: true,
                      is_featured: false,
                      logo: {
                          id: 3,
                          path: "/placeholder.svg",
                          paths: {
                              thumbnail: "/placeholder.svg",
                          },
                      },
                      cover_image: null,
                  },
                  {
                      id: 4,
                      name: "Tapak Suci Putera Muhammadiyah",
                      slug: "tapak-suci",
                      description:
                          "Perguruan seni beladiri pencak silat yang bernaung di bawah Muhammadiyah dengan tujuan memelihara kesehatan dan mengajarkan nilai-nilai keislaman.",
                      founding_year: "1963",
                      email: "tapaksuci.pusat@gmail.com",
                      instagram: "tapaksuci.id",
                      is_active: true,
                      is_featured: false,
                      logo: {
                          id: 4,
                          path: "/placeholder.svg",
                          paths: {
                              thumbnail: "/placeholder.svg",
                          },
                      },
                      cover_image: null,
                  },
                  {
                      id: 5,
                      name: "KOKAM (Komando Kesiapsiagaan Angkatan Muda Muhammadiyah)",
                      slug: "kokam",
                      description:
                          "Organisasi tanggap bencana di bawah Pemuda Muhammadiyah yang fokus pada penanggulangan bencana dan bantuan kemanusiaan.",
                      founding_year: "2004",
                      email: "kokam.muhammadiyah@gmail.com",
                      instagram: "kokampusat",
                      is_active: true,
                      is_featured: false,
                      logo: {
                          id: 5,
                          path: "/placeholder.svg",
                          paths: {
                              thumbnail: "/placeholder.svg",
                          },
                      },
                      cover_image: null,
                  },
              ];

    // Filter organisasi berdasarkan pencarian
    const filteredOrganizations = sampleOrganizations.filter(
        (org) =>
            org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (org.description &&
                org.description
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()))
    );

    // Filter untuk organisasi unggulan
    const featuredOrgs = sampleOrganizations.filter((org) => org.is_featured);

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
                                    <BreadcrumbPage>
                                        Organisasi Kemahasiswaan
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-8 md:gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold mb-4">
                                    Organisasi Kemahasiswaan
                                </h1>
                                <p className="text-gray-600">
                                    Informasi tentang berbagai organisasi
                                    kemahasiswaan yang ada di FKIP Universitas
                                    Muhammadiyah Kendari.
                                </p>
                            </div>

                            {/* Search Bar */}
                            <div className="mb-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <Input
                                        placeholder="Cari organisasi..."
                                        className="pl-10"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Featured Organizations if any */}
                            {featuredOrgs.length > 0 && (
                                <div className="mb-10">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Organisasi Unggulan
                                    </h2>
                                    <div className="space-y-6">
                                        {featuredOrgs.map((org) => (
                                            <Card
                                                key={org.id}
                                                className="overflow-hidden hover:shadow-md transition-shadow"
                                            >
                                                <CardContent className="p-0">
                                                    <div className="grid md:grid-cols-12 gap-6">
                                                        {/* Logo */}
                                                        <div className="md:col-span-4 p-4 flex items-center justify-center bg-gray-50">
                                                            <div className="w-32 h-32 relative rounded-full overflow-hidden bg-white flex items-center justify-center border">
                                                                {org.logo ? (
                                                                    <img
                                                                        src={
                                                                            org
                                                                                .logo
                                                                                .paths
                                                                                ?.thumbnail ||
                                                                            org
                                                                                .logo
                                                                                .path
                                                                        }
                                                                        alt={`Logo ${org.name}`}
                                                                        className="object-contain w-full h-full p-2"
                                                                    />
                                                                ) : (
                                                                    <Users className="w-16 h-16 text-gray-300" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="md:col-span-8 p-6">
                                                            <div className="flex flex-wrap gap-2 mb-2">
                                                                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                                                    Unggulan
                                                                </Badge>
                                                                {org.founding_year && (
                                                                    <div className="flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                                        <Calendar className="w-3 h-3" />
                                                                        <span>
                                                                            Berdiri{" "}
                                                                            {
                                                                                org.founding_year
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <h3 className="text-xl font-semibold mb-2">
                                                                {org.name}
                                                            </h3>

                                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                                {
                                                                    org.description
                                                                }
                                                            </p>

                                                            <div className="flex flex-wrap gap-4 mb-6">
                                                                {org.email && (
                                                                    <span className="text-sm text-gray-500">
                                                                        {
                                                                            org.email
                                                                        }
                                                                    </span>
                                                                )}
                                                                {org.instagram && (
                                                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                                                        <Instagram className="w-4 h-4" />
                                                                        @
                                                                        {
                                                                            org.instagram
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <Button asChild>
                                                                <a
                                                                    href={`/kemahasiswaan/organisasi/${org.slug}`}
                                                                >
                                                                    Lihat Detail{" "}
                                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                                </a>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All Organizations */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">
                                    Semua Organisasi
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {filteredOrganizations.length > 0 ? (
                                        filteredOrganizations.map((org) => (
                                            <Card
                                                key={org.id}
                                                className="hover:shadow-md transition-shadow"
                                            >
                                                <CardContent className="p-4">
                                                    <div className="flex gap-4">
                                                        {/* Logo */}
                                                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border">
                                                            {org.logo ? (
                                                                <img
                                                                    src={
                                                                        org.logo
                                                                            .paths
                                                                            ?.thumbnail ||
                                                                        org.logo
                                                                            .path
                                                                    }
                                                                    alt={`Logo ${org.name}`}
                                                                    className="object-contain w-full h-full p-1"
                                                                />
                                                            ) : (
                                                                <Users className="w-8 h-8 text-gray-300" />
                                                            )}
                                                        </div>

                                                        {/* Content */}
                                                        <div className="flex-grow">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h3 className="font-semibold">
                                                                    {org.name}
                                                                </h3>
                                                                {org.is_featured && (
                                                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                                                        Unggulan
                                                                    </Badge>
                                                                )}
                                                            </div>

                                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                                {org.description ||
                                                                    "Tidak ada deskripsi"}
                                                            </p>

                                                            <div className="flex flex-wrap gap-4">
                                                                {org.founding_year && (
                                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                        <Calendar className="w-3 h-3" />
                                                                        Berdiri{" "}
                                                                        {
                                                                            org.founding_year
                                                                        }
                                                                    </span>
                                                                )}
                                                                {org.instagram && (
                                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                        <Instagram className="w-3 h-3" />
                                                                        @
                                                                        {
                                                                            org.instagram
                                                                        }
                                                                    </span>
                                                                )}
                                                                <a
                                                                    href={`/kemahasiswaan/organisasi/${org.slug}`}
                                                                    className="text-xs text-blue-600 hover:underline flex items-center gap-1 ml-auto"
                                                                >
                                                                    Detail{" "}
                                                                    <ArrowRight className="w-3 h-3" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                                            <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                            <h3 className="text-lg font-medium">
                                                Tidak ada organisasi ditemukan
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {searchTerm
                                                    ? "Tidak ada hasil yang cocok dengan pencarian Anda"
                                                    : "Belum ada data organisasi tersedia"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Bergabung Dengan Organisasi CTA */}
                            <div className="mt-12 bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="md:flex-grow">
                                        <h3 className="text-xl font-semibold mb-2">
                                            Tertarik bergabung?
                                        </h3>
                                        <p className="text-gray-700">
                                            Jadilah bagian dari organisasi
                                            mahasiswa dan kembangkan soft skill,
                                            jaringan, serta pengalaman Anda
                                            selama kuliah.
                                        </p>
                                    </div>
                                    <div>
                                        <Button>
                                            Lihat Panduan Bergabung{" "}
                                            <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <div className="sticky top-20">
                                <StudentSidebar />

                                {/* Info Card */}
                                <Card className="mt-6">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">
                                            Manfaat Berorganisasi
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3">
                                                <GraduationCap className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                <span className="text-sm text-gray-600">
                                                    Pengembangan soft skill dan
                                                    leadership
                                                </span>
                                            </li>
                                            <li className="flex gap-3">
                                                <Users className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                <span className="text-sm text-gray-600">
                                                    Memperluas jaringan dan
                                                    koneksi
                                                </span>
                                            </li>
                                            <li className="flex gap-3">
                                                <Medal className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                <span className="text-sm text-gray-600">
                                                    Pengalaman dan prestasi
                                                    tambahan
                                                </span>
                                            </li>
                                        </ul>
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

export default OrganisasiKemahasiswaan;
