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

const Undergraduate = () => {
    const [showAdmission, setShowAdmission] = useState(false);

    const programs = [
        {
            name: "Pendidikan Bahasa dan Sastra Indonesia",
            description:
                "Program studi yang fokus pada pengembangan kompetensi dalam bidang pengajaran bahasa dan sastra Indonesia.",
            akreditasi: "B",
            stats: {
                dosen: 15,
                mahasiswa: 350,
                publikasi: 45,
                prestasi: 18,
            },
        },
        {
            name: "Pendidikan Matematika",
            description:
                "Mempersiapkan pendidik profesional yang memiliki kompetensi dalam pengajaran matematika modern.",
            akreditasi: "B",
            stats: {
                dosen: 12,
                mahasiswa: 280,
                publikasi: 38,
                prestasi: 15,
            },
        },
    ];

    return (
        <Guest2>
            {showAdmission && (
                <div className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div className="container max-w-6xl mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="hidden md:block">
                                    <GraduationCap className="h-8 w-8" />
                                </div>
                                <div>
                                    <h3 className="font-medium">
                                        Penerimaan Mahasiswa Baru 2025/2026
                                        Telah Dibuka!
                                    </h3>
                                    <p className="text-sm text-blue-100">
                                        Daftar sekarang dan raih masa depanmu
                                        bersama kami
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
                                    Daftar Sekarang
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <button onClick={() => setShowAdmission(false)}>
                                    <X className="h-5 w-5 text-blue-100 hover:text-white" />
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
                            <div className="mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                    Program Sarjana (S1)
                                </h1>
                                <p className="text-gray-600">
                                    Program Sarjana FKIP Universitas
                                    Muhammadiyah Kendari menawarkan berbagai
                                    program studi yang terakreditasi dan
                                    berkualitas untuk menghasilkan tenaga
                                    pendidik profesional.
                                </p>
                            </div>

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
                                                        <div className="bg-blue-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                                                            <Users className="h-6 w-6 text-blue-600" />
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
                                                                Dosen
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
                                                        <div className="bg-purple-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2">
                                                            <BookOpen className="h-6 w-6 text-purple-600" />
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
                                                    Lihat Detail
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

export default Undergraduate;
