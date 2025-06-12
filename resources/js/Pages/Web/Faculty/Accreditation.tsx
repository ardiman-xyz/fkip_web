// pages/Web/Faculty/Accreditation.tsx
import { Head } from "@inertiajs/react";
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import {
    Award,
    Calendar,
    Download,
    ExternalLink,
    FileText,
    Star,
    CheckCircle2,
} from "lucide-react";
import { ProfileSidebar } from "@/Pages/Web/_components/ProfileSidebar";
import { EmptyState } from "@/Pages/Web/_components/EmptyState";
import { useState } from "react";

interface AccreditationMedia {
    id: number;
    name: string;
    path: string;
    paths: Record<string, string>;
    url: string;
}

interface AccreditationTranslation {
    title: string;
    description: string;
}

interface Accreditation {
    id: number;
    media: AccreditationMedia | null;
    year: number;
    translations: {
        id: AccreditationTranslation;
        en: AccreditationTranslation;
    };
    created_at: string;
    updated_at: string;
}

interface AccreditationPageProps {
    accreditations: Accreditation[];
}

const AccreditationPage = ({ accreditations }: AccreditationPageProps) => {
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    // Group accreditations by year
    const groupedAccreditations = accreditations.reduce(
        (acc, accreditation) => {
            const year = accreditation.year;
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(accreditation);
            return acc;
        },
        {} as Record<number, Accreditation[]>
    );

    // Get unique years and sort them
    const years = Object.keys(groupedAccreditations)
        .map(Number)
        .sort((a, b) => b - a);

    const filteredAccreditations = selectedYear
        ? groupedAccreditations[selectedYear] || []
        : accreditations;

    const getAccreditationGrade = (title: string): string => {
        const upperTitle = title.toUpperCase();
        if (upperTitle.includes("UNGGUL") || upperTitle.includes("A"))
            return "A";
        if (upperTitle.includes("BAIK SEKALI") || upperTitle.includes("B"))
            return "B";
        if (upperTitle.includes("BAIK") || upperTitle.includes("C")) return "C";
        return "B"; // Default
    };

    const getGradeBadgeColor = (grade: string): string => {
        switch (grade) {
            case "A":
                return "bg-green-100 text-green-800 border-green-200";
            case "B":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "C":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const AccreditationCard = ({
        accreditation,
    }: {
        accreditation: Accreditation;
    }) => {
        const [imageLoaded, setImageLoaded] = useState(false);
        const translation = accreditation.translations.id;
        const grade = getAccreditationGrade(translation.title);

        console.info(accreditation);

        return (
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <Badge
                                variant="outline"
                                className={`${getGradeBadgeColor(
                                    grade
                                )} font-semibold`}
                            >
                                <Award className="w-3 h-3 mr-1" />
                                Akreditasi {grade}
                            </Badge>
                            <CardTitle className="text-xl leading-tight">
                                {translation.title}
                            </CardTitle>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center text-sm text-gray-500 mb-1">
                                <Calendar className="w-4 h-4 mr-1" />
                                {accreditation.year}
                            </div>
                            <Badge
                                variant="secondary"
                                className="bg-green-50 text-green-700"
                            >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Aktif
                            </Badge>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {translation.description && (
                        <p className="text-gray-600 leading-relaxed">
                            {translation.description}
                        </p>
                    )}

                    {accreditation.media && (
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900 flex items-center">
                                <FileText className="w-4 h-4 mr-2" />
                                Sertifikat Akreditasi
                            </h4>

                            <div className="border rounded-lg p-4 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-red-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {accreditation.media.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Sertifikat •{" "}
                                                {accreditation.year}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                window.open(
                                                    accreditation.media!.path,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            <ExternalLink className="w-4 h-4 mr-1" />
                                            Lihat
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                const link =
                                                    document.createElement("a");
                                                link.href =
                                                    accreditation.media!.path;
                                                link.download =
                                                    accreditation.media!.name;
                                                link.click();
                                            }}
                                        >
                                            <Download className="w-4 h-4 mr-1" />
                                            Unduh
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-2 border-t">
                        <p className="text-xs text-gray-500">
                            Terakhir diperbarui: {accreditation.updated_at}
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <Guest2>
            <Head title="Akreditasi - Fakultas Keguruan dan Ilmu Pendidikan" />

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
                                    <BreadcrumbLink href="/tentang-kami">
                                        Tentang Kami
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>Akreditasi</BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-9">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                        <Award className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">
                                            Akreditasi FKIP
                                        </h1>
                                        <p className="text-gray-600">
                                            Status akreditasi program studi dan
                                            fakultas
                                        </p>
                                    </div>
                                </div>

                                {/* Year Filter */}
                                {years.length > 1 && (
                                    <div className="mb-6">
                                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                                            Filter berdasarkan tahun:
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                variant={
                                                    selectedYear === null
                                                        ? "default"
                                                        : "outline"
                                                }
                                                size="sm"
                                                onClick={() =>
                                                    setSelectedYear(null)
                                                }
                                            >
                                                Semua
                                            </Button>
                                            {years.map((year) => (
                                                <Button
                                                    key={year}
                                                    variant={
                                                        selectedYear === year
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    size="sm"
                                                    onClick={() =>
                                                        setSelectedYear(year)
                                                    }
                                                >
                                                    {year}
                                                    <Badge
                                                        variant="secondary"
                                                        className="ml-2 text-xs"
                                                    >
                                                        {
                                                            groupedAccreditations[
                                                                year
                                                            ].length
                                                        }
                                                    </Badge>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Accreditations List */}
                            {filteredAccreditations.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredAccreditations.map(
                                        (accreditation) => (
                                            <AccreditationCard
                                                key={accreditation.id}
                                                accreditation={accreditation}
                                            />
                                        )
                                    )}
                                </div>
                            ) : (
                                <EmptyState
                                    title="Tidak Ada Data Akreditasi"
                                    description={
                                        selectedYear
                                            ? `Tidak ada data akreditasi untuk tahun ${selectedYear}`
                                            : "Belum ada data akreditasi yang tersedia"
                                    }
                                    icon={Award}
                                />
                            )}
                        </div>
                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-3">
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default AccreditationPage;
