// pages/Lecturers/Index.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { UserSquare2 } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { useState, useEffect } from "react";
import { ProfileSidebar } from "../_components/ProfileSidebar";

interface Lecturer {
    id: number;
    nidn?: string;
    nip?: string;
    translations: {
        id: {
            full_name: string;
            position?: string;
        };
    };
    media?: {
        id: number;
        path: string;
    };
}

interface Props {
    lecturers: Lecturer[];
}

const LecturerDirectory = ({ lecturers = [] }: Props) => {
    const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const [selectedLetter, setSelectedLetter] = useState<string>("#"); // Default to "#" (all)
    const [availableLetters, setAvailableLetters] = useState<string[]>([]);
    const [displayedLecturers, setDisplayedLecturers] = useState<Lecturer[]>(
        []
    );

    // Group lecturers by first letter of name
    const [groupedLecturers, setGroupedLecturers] = useState<
        Record<string, Lecturer[]>
    >({});

    useEffect(() => {
        // Create groups by first letter
        const grouped = lecturers.reduce((acc, lecturer) => {
            const firstLetter = lecturer.translations.id.full_name
                .charAt(0)
                .toUpperCase();

            // If letter is not alphabetic, put in # group
            const groupKey = /[A-Z]/.test(firstLetter) ? firstLetter : "#";

            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(lecturer);
            return acc;
        }, {} as Record<string, Lecturer[]>);

        // Add "All" group under "#"
        grouped["#"] = [...lecturers];

        setGroupedLecturers(grouped);

        // Find which letters have lecturers
        const lettersWithLecturers = alphabet.filter(
            (letter) => letter === "#" || grouped[letter]?.length > 0
        );
        setAvailableLetters(lettersWithLecturers);

        // Set initial displayed lecturers to all
        setDisplayedLecturers(lecturers);
    }, [lecturers]);

    // Handle letter selection
    const handleLetterSelect = (letter: string) => {
        setSelectedLetter(letter);

        if (letter === "#") {
            // Show all lecturers
            setDisplayedLecturers(lecturers);
        } else {
            // Show lecturers for this letter
            setDisplayedLecturers(groupedLecturers[letter] || []);
        }
    };

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
                                                    className={`w-10 h-10 p-0 ${
                                                        !availableLetters.includes(
                                                            letter
                                                        ) && letter !== "#"
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        if (
                                                            letter === "#" ||
                                                            availableLetters.includes(
                                                                letter
                                                            )
                                                        ) {
                                                            handleLetterSelect(
                                                                letter
                                                            );
                                                        }
                                                    }}
                                                    disabled={
                                                        letter !== "#" &&
                                                        !availableLetters.includes(
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
                                    <div className="space-y-2">
                                        {displayedLecturers.length > 0 ? (
                                            displayedLecturers.map(
                                                (lecturer) => (
                                                    <Card
                                                        key={lecturer.id}
                                                        className="hover:shadow-md transition-shadow"
                                                    >
                                                        <CardContent className="p-4">
                                                            <a
                                                                href={`/fakultas/dosen/${lecturer.id}`}
                                                                className="flex items-center gap-4"
                                                            >
                                                                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden">
                                                                    {lecturer.media ? (
                                                                        <img
                                                                            src={
                                                                                lecturer
                                                                                    .media
                                                                                    .path
                                                                            }
                                                                            alt={
                                                                                lecturer
                                                                                    .translations
                                                                                    .id
                                                                                    .full_name
                                                                            }
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <UserSquare2 className="w-full h-full p-3 text-gray-400" />
                                                                    )}
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
                                                                            NIDN/NIP.{" "}
                                                                            {
                                                                                lecturer.nidn
                                                                            }
                                                                        </p>
                                                                    )}
                                                                    {lecturer
                                                                        .translations
                                                                        ?.id
                                                                        ?.position && (
                                                                        <p className="text-sm text-gray-600">
                                                                            {
                                                                                lecturer
                                                                                    .translations
                                                                                    .id
                                                                                    .position
                                                                            }
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </a>
                                                        </CardContent>
                                                    </Card>
                                                )
                                            )
                                        ) : (
                                            <div className="text-center text-gray-500 py-8">
                                                Tidak ada dosen yang tersedia
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
