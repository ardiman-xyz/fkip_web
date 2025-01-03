// pages/Lecturers/Index.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { UserSquare2 } from "lucide-react";
import { ProdiSidebar } from "../_components/ProdiSidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { useState } from "react";
import { ProfileSidebar } from "../_components/ProfileSidebar";

interface Lecturer {
    id: number;
    nidn?: string;
    translations: {
        id: {
            full_name: string;
            position: string;
        };
    };
    study_program?: {
        translations: {
            id: {
                name: string;
            };
        };
    };
}

const dummyLecturers: Lecturer[] = [
    {
        id: 1,
        nidn: "0123456789",
        translations: {
            id: {
                full_name: "Abdul Rahman, M.Pd",
                position: "Dosen",
            },
        },
        study_program: {
            translations: {
                id: {
                    name: "Pendidikan Bahasa Indonesia",
                },
            },
        },
    },
    {
        id: 2,
        nidn: "0123456790",
        translations: {
            id: {
                full_name: "Budi Santoso, M.Pd",
                position: "Dosen",
            },
        },
        study_program: {
            translations: {
                id: {
                    name: "Pendidikan Matematika",
                },
            },
        },
    },
    {
        id: 3,
        nidn: "0123456791",
        translations: {
            id: {
                full_name: "Citra Dewi, M.Pd",
                position: "Dosen",
            },
        },
        study_program: {
            translations: {
                id: {
                    name: "Pendidikan Bahasa Inggris",
                },
            },
        },
    },
    {
        id: 4,
        nidn: "0123456792",
        translations: {
            id: {
                full_name: "Dian Puspita, M.Pd",
                position: "Dosen",
            },
        },
        study_program: {
            translations: {
                id: {
                    name: "Pendidikan Guru Sekolah Dasar",
                },
            },
        },
    },
];

const LecturerDirectory = () => {
    const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [selectedLetter, setSelectedLetter] = useState<string>("A");

    // Group lecturers by first letter of name
    const groupedLecturers = dummyLecturers.reduce((acc, lecturer) => {
        const firstLetter = lecturer.translations.id.full_name
            .charAt(0)
            .toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(lecturer);
        return acc;
    }, {} as Record<string, Lecturer[]>);

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
                                    <BreadcrumbPage className="text-muted-foreground">
                                        Profil
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Dosen</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            <Card>
                                <CardContent className="p-6">
                                    <h1 className="text-3xl font-bold mb-8">
                                        Direktori Dosen
                                    </h1>

                                    {/* Alphabet Navigation */}
                                    <div className="mb-8">
                                        <div className="flex flex-wrap gap-2">
                                            {alphabet.map((letter) => (
                                                <Button
                                                    key={letter}
                                                    variant={
                                                        selectedLetter ===
                                                        letter
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    className="w-10 h-10 p-0"
                                                    onClick={() =>
                                                        setSelectedLetter(
                                                            letter
                                                        )
                                                    }
                                                >
                                                    {letter}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lecturers List */}
                                    <div className="space-y-6">
                                        {groupedLecturers[selectedLetter]
                                            ?.length > 0 ? (
                                            groupedLecturers[
                                                selectedLetter
                                            ].map((lecturer) => (
                                                <Card
                                                    key={lecturer.id}
                                                    className="hover:shadow-md transition-shadow"
                                                >
                                                    <CardContent className="p-4">
                                                        <a
                                                            href={`/dosen/${lecturer.id}`}
                                                            className="flex items-center gap-4"
                                                        >
                                                            <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden">
                                                                <UserSquare2 className="w-full h-full p-3 text-gray-400" />
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold">
                                                                    {
                                                                        lecturer
                                                                            .translations
                                                                            .id
                                                                            .full_name
                                                                    }
                                                                </h3>
                                                                {lecturer.nidn && (
                                                                    <p className="text-sm text-gray-500">
                                                                        NIDN.{" "}
                                                                        {
                                                                            lecturer.nidn
                                                                        }
                                                                    </p>
                                                                )}
                                                                {lecturer.study_program && (
                                                                    <p className="text-sm text-gray-600">
                                                                        {
                                                                            lecturer
                                                                                .study_program
                                                                                .translations
                                                                                .id
                                                                                .name
                                                                        }
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </a>
                                                    </CardContent>
                                                </Card>
                                            ))
                                        ) : (
                                            <div className="text-center text-gray-500 py-8">
                                                Tidak ada dosen dengan awalan
                                                huruf {selectedLetter}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default LecturerDirectory;
