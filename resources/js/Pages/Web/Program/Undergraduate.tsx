import Guest2 from "@/Layouts/GuestLayout2";
import { ProdiSidebar } from "../_components/ProdiSidebar";
import {
    Award,
    BookOpen,
    GraduationCap,
    Users,
    Building,
    ArrowRight,
    Calendar,
} from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { motion } from "framer-motion";

interface ProgramProps {
    programs: Array<{
        id: number;
        name: string;
        slug: string;
        accreditation: string;
        description?: string;
    }>;
}

const Undergraduate = ({ programs = [] }: ProgramProps) => {
    console.info(programs);

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-green-700 to-green-900 border border-green-600">
                        <div className="absolute inset-0 opacity-20 bg-[url('/images/patterns/pattern-dots.svg')] bg-repeat"></div>
                        <div className="relative z-10 p-10 flex flex-col md:flex-row items-center">
                            <div className="md:w-2/3 mb-8 md:mb-0">
                                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                                    Program Sarjana (S1)
                                </h1>
                                <p className="text-green-100 text-lg">
                                    Program Sarjana FKIP Universitas
                                    Muhammadiyah Kendari menawarkan berbagai
                                    program studi yang terakreditasi dan
                                    berkualitas untuk menghasilkan tenaga
                                    pendidik profesional.
                                </p>
                                <div className="flex gap-4 mt-6">
                                    <Badge className="px-3 py-2 bg-green-200 text-green-900 hover:bg-green-300 transition-all">
                                        <Calendar className="w-4 h-4 mr-1" />{" "}
                                        Durasi 4 Tahun
                                    </Badge>
                                    <Badge className="px-3 py-2 bg-green-200 text-green-900 hover:bg-green-300 transition-all">
                                        <GraduationCap className="w-4 h-4 mr-1" />{" "}
                                        Gelar S.Pd
                                    </Badge>
                                </div>
                            </div>
                            <div className="md:w-1/3 hidden md:flex justify-center">
                                <div className="w-48 h-48 rounded-full bg-white/10 flex items-center justify-center animate-pulse-slow">
                                    <GraduationCap className="w-24 h-24 text-white" />
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
                                        className="overflow-hidden border border-gray-200"
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
                                                                Dosen
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-700">
                                                            <GraduationCap className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm">
                                                                Alumni
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-700">
                                                            <BookOpen className="w-4 h-4 text-green-600" />
                                                            <span className="text-sm">
                                                                Matakuliah
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
                                            Belum ada data program studi
                                        </h3>
                                        <p className="text-sm">
                                            Silakan cek kembali nanti untuk
                                            informasi program studi
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-4">
                            <div className="sticky top-20">
                                <ProdiSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Undergraduate;
