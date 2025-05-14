import Guest2 from "@/Layouts/GuestLayout2";
import { ProdiSidebar } from "../_components/ProdiSidebar";
import {
    Award,
    BookOpen,
    GraduationCap,
    Users,
    Building,
    ArrowRight,
    Clock4,
} from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { useState } from "react";

interface ProgramProps {
    programs: Array<{
        id: number;
        name: string;
        slug: string;
        description?: string;
        accreditation: string;
        level: string;
        dosen_count: number;
    }>;
}

const Magister = ({ programs = [] }: ProgramProps) => {
    console.info(programs);

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Header Banner */}
                    <div className="bg-green-700 rounded-xl overflow-hidden mb-12 relative">
                        <div className="absolute inset-0 opacity-10 bg-[url('/images/patterns/pattern-dots.svg')] bg-repeat"></div>
                        <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="md:w-3/4">
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Program Magister (S2)
                                </h1>
                                <p className="text-green-100 mb-6">
                                    Program Magister FKIP Universitas
                                    Muhammadiyah Kendari menawarkan berbagai
                                    program studi yang terakreditasi dan
                                    berkualitas untuk menghasilkan tenaga
                                    pendidik profesional.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                                        <Clock4 className="w-4 h-4" />
                                        <span>Durasi 2 Tahun</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm">
                                        <GraduationCap className="w-4 h-4" />
                                        <span>Gelar M.Pd</span>
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
                            <div className="grid gap-6">
                                {programs.map((program) => (
                                    <Card
                                        key={program.id}
                                        className="overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex flex-col">
                                                {/* Header dengan nama prodi dan badge akreditasi */}
                                                <div className="flex justify-between items-start mb-5">
                                                    <h3 className="text-xl font-bold text-gray-900 pr-20 md:pr-0">
                                                        {program.name}
                                                    </h3>
                                                    <Badge className="whitespace-nowrap px-3 py-1 text-sm bg-blue-100 text-blue-800">
                                                        Akreditasi{" "}
                                                        {program.accreditation ||
                                                            "B"}
                                                    </Badge>
                                                </div>

                                                {/* Deskripsi program studi */}
                                                <div className="mb-6">
                                                    <p className="text-gray-600 text-sm">
                                                        {program.description ||
                                                            "<p>Deskripsi program studi akan ditampilkan di sini.</p><p></p>"}
                                                    </p>
                                                </div>

                                                {/* Icon dan Statistics dengan layout mirip screenshot */}
                                                <div className="flex flex-col sm:flex-row gap-6">
                                                    {/* Icon section */}
                                                    <div className="flex-shrink-0 bg-green-50 p-4 rounded-lg w-16 h-16 flex items-center justify-center self-center sm:self-start">
                                                        <BookOpen className="w-8 h-8 text-green-600" />
                                                    </div>

                                                    {/* Statistics grid dengan 2x2 layout */}
                                                    <div className="grid grid-cols-2 gap-4 flex-grow">
                                                        <div className="flex items-center gap-2 text-gray-700">
                                                            <Users className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm">
                                                                10 Dosen
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-700">
                                                            <GraduationCap className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm">
                                                                100+ Alumni
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-700">
                                                            <BookOpen className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm">
                                                                30 MK
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-700">
                                                            <Award className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm">
                                                                Aktif
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* CTA Button */}
                                                <div className="mt-6">
                                                    <Button
                                                        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
                                                        asChild
                                                    >
                                                        <a
                                                            href={`/program/detail/${program.slug}`}
                                                        >
                                                            <span>
                                                                Lihat Detail
                                                                Program
                                                            </span>
                                                            <ArrowRight className="w-4 h-4 ml-2" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}

                                {programs.length === 0 && (
                                    <div className="text-center py-12 text-gray-500 border rounded-lg p-8">
                                        <GraduationCap className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                        <h3 className="text-lg font-medium">
                                            Belum ada program studi
                                        </h3>
                                        <p className="text-sm">
                                            Program studi magister belum
                                            tersedia saat ini
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* CTA Section */}
                            <div className="mt-10 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-green-100">
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <div className="md:w-2/3">
                                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                                            Tertarik dengan Program Magister?
                                        </h3>
                                        <p className="text-gray-600">
                                            Program Magister FKIP UMK membuka
                                            pendaftaran untuk tahun akademik
                                            2025/2026. Dapatkan kesempatan untuk
                                            melanjutkan studi dengan dosen-dosen
                                            berkualitas.
                                        </p>
                                    </div>
                                    <div className="md:w-1/3 flex justify-center">
                                        <Button
                                            size="lg"
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Daftar Sekarang
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-4">
                            <div className="sticky top-20">
                                <ProdiSidebar />

                                {/* Benefit Program Magister */}
                                <Card className="mt-6 border-2 border-green-100 bg-green-50">
                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-lg mb-4 text-green-800">
                                            Keunggulan Program Magister
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5 flex-shrink-0">
                                                    <span className="text-xs font-bold">
                                                        1
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700">
                                                    Dosen dengan kualifikasi
                                                    Doktor dan Profesor
                                                </p>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5 flex-shrink-0">
                                                    <span className="text-xs font-bold">
                                                        2
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700">
                                                    Kelas perkuliahan yang
                                                    fleksibel (weekend dan
                                                    weekday)
                                                </p>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5 flex-shrink-0">
                                                    <span className="text-xs font-bold">
                                                        3
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700">
                                                    Akses ke perpustakaan
                                                    digital dan jurnal ilmiah
                                                    internasional
                                                </p>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mt-0.5 flex-shrink-0">
                                                    <span className="text-xs font-bold">
                                                        4
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700">
                                                    Peluang publikasi di jurnal
                                                    nasional dan internasional
                                                </p>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Info Card */}
                                <Card className="mt-6">
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">
                                            Informasi Pendaftaran
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center pb-2 border-b border-dashed">
                                                <span className="text-gray-700">
                                                    Gelombang I
                                                </span>
                                                <span className="text-sm font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                                                    Januari - Maret
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-dashed">
                                                <span className="text-gray-700">
                                                    Gelombang II
                                                </span>
                                                <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                                    April - Juni
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">
                                                    Gelombang III
                                                </span>
                                                <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 rounded">
                                                    Juli - Agustus
                                                </span>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-full mt-4 border-green-600 text-green-700 hover:bg-green-50"
                                        >
                                            Download Brosur
                                        </Button>
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

export default Magister;
