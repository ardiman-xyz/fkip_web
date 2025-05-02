import Guest2 from "@/Layouts/GuestLayout2";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    ChevronLeft,
    Users,
    BookOpen,
    Award,
    ExternalLink,
    Mail,
    Phone,
    Globe,
} from "lucide-react";

interface ProgramStudi {
    id: string;
    name: string;
    level: "S1" | "S2" | "S3";
    akreditasi: string;
    deskripsi: string;
    ketuaProdi: {
        nama: string;
        foto: string;
        email: string;
        telp: string;
    };
    stats: {
        dosen: number;
        mahasiswa: number;
        publikasi: number;
        prestasi: number;
    };
    website: string;
}

const dummyPrograms: ProgramStudi[] = [
    {
        id: "pbsi",
        name: "Pendidikan Bahasa dan Sastra Indonesia",
        level: "S1",
        akreditasi: "B",
        deskripsi:
            "Program studi yang fokus pada pengembangan kompetensi dalam bidang pengajaran bahasa dan sastra Indonesia. Lulusan dipersiapkan untuk menjadi tenaga pendidik profesional di bidang bahasa Indonesia.",
        ketuaProdi: {
            nama: "Dr. Hasna Nurjaya, M.Pd.",
            foto: "/placeholder-female.png",
            email: "hasna.nurjaya@umkendari.ac.id",
            telp: "0813-4444-5555",
        },
        stats: {
            dosen: 15,
            mahasiswa: 350,
            publikasi: 45,
            prestasi: 18,
        },
        website: "https://pbsi.fkip.umkendari.ac.id",
    },
    {
        id: "pmat",
        name: "Pendidikan Matematika",
        level: "S1",
        akreditasi: "B",
        deskripsi:
            "Program studi yang mempersiapkan pendidik profesional yang memiliki kompetensi dalam pengajaran matematika modern dengan pendekatan inovatif dan berbasis teknologi.",
        ketuaProdi: {
            nama: "Dr. Abdul Hamid, M.Si.",
            foto: "/placeholder-male.png",
            email: "abdul.hamid@umkendari.ac.id",
            telp: "0823-4618-7255",
        },
        stats: {
            dosen: 12,
            mahasiswa: 280,
            publikasi: 38,
            prestasi: 15,
        },
        website: "https://pmat.fkip.umkendari.ac.id",
    },
    // ... data lainnya
];

const ProgramStudiPage = () => {
    const [selectedProdi, setSelectedProdi] = useState<ProgramStudi | null>(
        null
    );
    const [selectedLevel, setSelectedLevel] = useState<
        "S1" | "S2" | "S3" | null
    >(null);

    const filteredPrograms = selectedLevel
        ? dummyPrograms.filter((p) => p.level === selectedLevel)
        : dummyPrograms;

    const handleSelectProdi = (prodi: ProgramStudi) => {
        setSelectedProdi(prodi);
    };

    const handleBack = () => {
        setSelectedProdi(null);
    };

    const StatItem = ({
        icon,
        value,
        label,
        color,
    }: {
        icon: React.ReactNode;
        value: number;
        label: string;
        color: string;
    }) => (
        <div className="text-center">
            <div
                className={`${color} w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2`}
            >
                {icon}
            </div>
            <div className="text-sm">
                <p className="font-semibold">{value}</p>
                <p className="text-gray-600">{label}</p>
            </div>
        </div>
    );

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Program Studi FKIP
                        </h1>
                        <p className="text-gray-600">
                            FKIP Universitas Muhammadiyah Kendari menawarkan
                            berbagai program studi yang terakreditasi dan
                            berkualitas untuk menghasilkan tenaga pendidik
                            profesional.
                        </p>
                    </div>

                    {/* Level Filter */}
                    <div className="flex gap-2 mb-8">
                        <button
                            className={`px-4 py-2 rounded-md transition-colors ${
                                selectedLevel === null
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedLevel(null)}
                        >
                            Semua
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md transition-colors ${
                                selectedLevel === "S1"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedLevel("S1")}
                        >
                            Program Sarjana (S1)
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md transition-colors ${
                                selectedLevel === "S2"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedLevel("S2")}
                        >
                            Program Magister (S2)
                        </button>
                    </div>

                    <div className="relative overflow-hidden min-h-[60vh]">
                        <AnimatePresence mode="wait">
                            {!selectedProdi ? (
                                <motion.div
                                    key="program-list"
                                    initial={{ opacity: 1, x: 0 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: "-100%" }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                                >
                                    {filteredPrograms.map((program) => (
                                        <motion.div
                                            key={program.id}
                                            whileHover={{ scale: 1.03 }}
                                            className="bg-white border rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-all"
                                            onClick={() =>
                                                handleSelectProdi(program)
                                            }
                                        >
                                            <div className="p-5">
                                                <div className="flex flex-col h-full">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                            {program.level}
                                                        </span>
                                                        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                                            Akreditasi{" "}
                                                            {program.akreditasi}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg font-medium mb-auto">
                                                        {program.name}
                                                    </h3>
                                                    <div className="mt-4 flex items-center text-sm text-blue-600">
                                                        <span>
                                                            Lihat Detail
                                                        </span>
                                                        <ChevronRight
                                                            size={16}
                                                            className="ml-1"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="program-detail"
                                    initial={{ opacity: 0, x: "100%" }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: "100%" }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full bg-white rounded-lg shadow-md"
                                >
                                    <div className="p-6">
                                        <button
                                            onClick={handleBack}
                                            className="flex items-center text-blue-600 mb-6 hover:underline"
                                        >
                                            <ChevronLeft
                                                size={16}
                                                className="mr-1"
                                            />
                                            Kembali ke daftar program studi
                                        </button>

                                        <div className="flex flex-col lg:flex-row gap-8">
                                            {/* Program Info */}
                                            <div className="lg:w-2/3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                        {selectedProdi.level}
                                                    </span>
                                                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                                        Akreditasi{" "}
                                                        {
                                                            selectedProdi.akreditasi
                                                        }
                                                    </span>
                                                </div>

                                                <h2 className="text-2xl font-bold mb-4">
                                                    {selectedProdi.name}
                                                </h2>
                                                <p className="text-gray-700 mb-6">
                                                    {selectedProdi.deskripsi}
                                                </p>

                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                                    <StatItem
                                                        icon={
                                                            <Users className="h-6 w-6 text-blue-600" />
                                                        }
                                                        value={
                                                            selectedProdi.stats
                                                                .dosen
                                                        }
                                                        label="Dosen"
                                                        color="bg-blue-50"
                                                    />
                                                    <StatItem
                                                        icon={
                                                            <Users className="h-6 w-6 text-green-600" />
                                                        }
                                                        value={
                                                            selectedProdi.stats
                                                                .mahasiswa
                                                        }
                                                        label="Mahasiswa"
                                                        color="bg-green-50"
                                                    />
                                                    <StatItem
                                                        icon={
                                                            <BookOpen className="h-6 w-6 text-purple-600" />
                                                        }
                                                        value={
                                                            selectedProdi.stats
                                                                .publikasi
                                                        }
                                                        label="Publikasi"
                                                        color="bg-purple-50"
                                                    />
                                                    <StatItem
                                                        icon={
                                                            <Award className="h-6 w-6 text-orange-600" />
                                                        }
                                                        value={
                                                            selectedProdi.stats
                                                                .prestasi
                                                        }
                                                        label="Prestasi"
                                                        color="bg-orange-50"
                                                    />
                                                </div>

                                                <a
                                                    href={selectedProdi.website}
                                                    target="_blank"
                                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                                >
                                                    Kunjungi Website Program
                                                    Studi
                                                    <ExternalLink
                                                        size={16}
                                                        className="ml-2"
                                                    />
                                                </a>
                                            </div>

                                            {/* Ketua Prodi */}
                                            <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg">
                                                <h3 className="text-lg font-semibold mb-4">
                                                    Ketua Program Studi
                                                </h3>
                                                <div className="flex flex-col items-center text-center">
                                                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-3 overflow-hidden">
                                                        <img
                                                            src={
                                                                selectedProdi
                                                                    .ketuaProdi
                                                                    .foto
                                                            }
                                                            alt={
                                                                selectedProdi
                                                                    .ketuaProdi
                                                                    .nama
                                                            }
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                const target =
                                                                    e.target as HTMLImageElement;
                                                                target.src =
                                                                    "https://via.placeholder.com/150";
                                                            }}
                                                        />
                                                    </div>
                                                    <h4 className="font-medium">
                                                        {
                                                            selectedProdi
                                                                .ketuaProdi.nama
                                                        }
                                                    </h4>
                                                    <p className="text-sm text-gray-500 mb-4">
                                                        Ketua Program Studi
                                                    </p>

                                                    <div className="w-full space-y-2 text-left">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Mail
                                                                size={16}
                                                                className="text-gray-500"
                                                            />
                                                            <span>
                                                                {
                                                                    selectedProdi
                                                                        .ketuaProdi
                                                                        .email
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Phone
                                                                size={16}
                                                                className="text-gray-500"
                                                            />
                                                            <span>
                                                                {
                                                                    selectedProdi
                                                                        .ketuaProdi
                                                                        .telp
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Globe
                                                                size={16}
                                                                className="text-gray-500"
                                                            />
                                                            <a
                                                                href={
                                                                    selectedProdi.website
                                                                }
                                                                target="_blank"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                Website
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default ProgramStudiPage;
