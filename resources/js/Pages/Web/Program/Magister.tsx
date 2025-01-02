import Guest2 from "@/Layouts/GuestLayout2";
import React, { useState } from "react";
import { EmptyState } from "../_components/EmptyState";
import { ProdiSidebar } from "../_components/ProdiSidebar";
import { Card, CardContent } from "@/Components/ui/card";
import {
    ArrowRight,
    Award,
    BookOpen,
    GraduationCap,
    Users,
    X,
} from "lucide-react";
import { Button } from "@headlessui/react";

const Graduate = () => {
    const [showAdmission, setShowAdmission] = useState(false);

    const programs = [
        {
            name: "Magister Pendidikan Bahasa dan Sastra Indonesia",
            description:
                "Program studi pascasarjana yang menyiapkan tenaga pendidik dan peneliti yang ahli dalam bidang pengajaran bahasa dan sastra Indonesia.",
            akreditasi: "B",
            stats: {
                dosen: 8,
                mahasiswa: 120,
                publikasi: 65,
                prestasi: 12,
            },
        },
        {
            name: "Magister Pendidikan Matematika",
            description:
                "Program pascasarjana yang fokus pada pengembangan kompetensi dalam penelitian dan pengajaran matematika tingkat lanjut.",
            akreditasi: "B",
            stats: {
                dosen: 6,
                mahasiswa: 85,
                publikasi: 48,
                prestasi: 8,
            },
        },
    ];

    return (
        <Guest2>
            {showAdmission && (
                <div className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    <div className="container max-w-6xl mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="hidden md:block">
                                    <GraduationCap className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="font-medium">
                                        Pendaftaran Program Magister 2025 Telah
                                        Dibuka!
                                    </h3>
                                    <p className="text-sm text-purple-100">
                                        Tingkatkan karirmu dengan pendidikan
                                        lanjut bersama kami
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    className="whitespace-nowrap"
                                    onClick={() =>
                                        window.open(
                                            "https://pmb.umkendari.ac.id",
                                            "_blank"
                                        )
                                    }
                                >
                                    Daftar S2
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <button onClick={() => setShowAdmission(false)}>
                                    <X className="h-5 w-5 text-purple-100 hover:text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`min-h-screen bg-white py-12 ${
                    showAdmission ? "pt-24" : ""
                }`}
            >
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-8">
                            {/* Header */}
                            <div className="mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                    Program Magister (S2)
                                </h1>
                                <p className="text-gray-600">
                                    Program Magister FKIP Universitas
                                    Muhammadiyah Kendari dirancang untuk
                                    menghasilkan pendidik profesional dan
                                    peneliti yang berkompeten dalam bidang
                                    pendidikan.
                                </p>
                            </div>

                            {/* Program List */}
                            <div className="grid gap-6">
                                {programs.map((program, index) => (
                                    <Card
                                        key={index}
                                        className="hover:shadow-lg transition-shadow"
                                    >
                                        <CardContent className="p-6">
                                            <div className="space-y-6">
                                                <div>
                                                    <div className="flex items-start justify-between">
                                                        <h2 className="text-xl font-semibold">
                                                            {program.name}
                                                        </h2>
                                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                            Akreditasi{" "}
                                                            {program.akreditasi}
                                                        </span>
                                                    </div>
                                                    <p className="mt-2 text-gray-600">
                                                        {program.description}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div className="text-center">
                                                        <div className="bg-purple-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                                                            <Users className="h-6 w-6 text-purple-600" />
                                                        </div>
                                                        <div className="text-sm">
                                                            <p className="font-semibold">
                                                                {
                                                                    program
                                                                        .stats
                                                                        .dosen
                                                                }
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Profesor &
                                                                Doktor
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="bg-green-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                                                            <GraduationCap className="h-6 w-6 text-green-600" />
                                                        </div>
                                                        <div className="text-sm">
                                                            <p className="font-semibold">
                                                                {
                                                                    program
                                                                        .stats
                                                                        .mahasiswa
                                                                }
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Mahasiswa
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="bg-blue-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                                                            <BookOpen className="h-6 w-6 text-blue-600" />
                                                        </div>
                                                        <div className="text-sm">
                                                            <p className="font-semibold">
                                                                {
                                                                    program
                                                                        .stats
                                                                        .publikasi
                                                                }
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Publikasi
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="bg-orange-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                                                            <Award className="h-6 w-6 text-orange-600" />
                                                        </div>
                                                        <div className="text-sm">
                                                            <p className="font-semibold">
                                                                {
                                                                    program
                                                                        .stats
                                                                        .prestasi
                                                                }
                                                            </p>
                                                            <p className="text-gray-600">
                                                                Prestasi
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button className="w-full">
                                                    Lihat Detail Program
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-4">
                            <ProdiSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Graduate;
