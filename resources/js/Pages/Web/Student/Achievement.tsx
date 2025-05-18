import Guest2 from "@/Layouts/GuestLayout2";
import { StudentSidebar } from "../_components/StudentSidebar";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
    Trophy,
    Search,
    Calendar,
    User,
    Award,
    Medal,
    Tag,
    MapPin,
    ExternalLink,
    ArrowRight,
    ChevronRight,
    Filter,
} from "lucide-react";
import { useState } from "react";

interface AchievementProps {
    achievements?: Array<{
        id: number;
        title: string;
        slug: string;
        content: string;
        event: string;
        level: string;
        date: string;
        students: string[];
        category: string;
        image?: {
            id: number;
            path: string;
            paths?: {
                thumbnail: string;
                original: string;
            };
        } | null;
    }>;
}

const Achievement = ({ achievements = [] }: AchievementProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [levelFilter, setLevelFilter] = useState("all");

    // Data dummy prestasi mahasiswa
    const dummyAchievements =
        achievements.length > 0
            ? achievements
            : [
                  {
                      id: 1,
                      title: "Juara 1 Lomba Karya Tulis Ilmiah Nasional",
                      slug: "juara-1-lktin-2025",
                      content:
                          'Tim mahasiswa FKIP UMK berhasil meraih juara pertama dalam Lomba Karya Tulis Ilmiah Nasional (LKTIN) 2025 yang diselenggarakan oleh Universitas Gadjah Mada. Karya tulis berjudul "Inovasi Model Pembelajaran Berbasis Kearifan Lokal" berhasil menyisihkan 150 tim dari seluruh Indonesia.',
                      event: "Lomba Karya Tulis Ilmiah Nasional (LKTIN) 2025",
                      level: "Nasional",
                      date: "2025-03-15",
                      students: ["Maria Putri", "Ahmad Fadli"],
                      category: "Akademik",
                      image: {
                          id: 1,
                          path: "/images/achievements/academic.jpg",
                          paths: {
                              thumbnail: "/images/achievements/academic.jpg",
                              original: "/images/achievements/academic.jpg",
                          },
                      },
                  },
                  {
                      id: 2,
                      title: "Medali Emas Kejuaraan Karate Pekan Olahraga Mahasiswa Nasional",
                      slug: "medali-emas-karate-pomnas-2024",
                      content:
                          "Mahasiswa FKIP UMK, Budi Santoso, berhasil meraih medali emas dalam cabang olahraga karate kategori kumite -67kg pada Pekan Olahraga Mahasiswa Nasional (POMNAS) XVII yang diselenggarakan di Surabaya. Prestasi ini merupakan yang pertama bagi Universitas Muhammadiyah Kendari dalam ajang POMNAS untuk cabang karate.",
                      event: "Pekan Olahraga Mahasiswa Nasional (POMNAS) XVII",
                      level: "Nasional",
                      date: "2025-02-20",
                      students: ["Budi Santoso"],
                      category: "Non-Akademik",
                      image: {
                          id: 2,
                          path: "/images/achievements/sports.jpg",
                          paths: {
                              thumbnail: "/images/achievements/sports.jpg",
                              original: "/images/achievements/sports.jpg",
                          },
                      },
                  },
                  {
                      id: 3,
                      title: "Best Paper Award di International Conference on Education",
                      slug: "best-paper-award-ice-2025",
                      content:
                          'Penelitian berjudul "Pengembangan Model Pembelajaran Interaktif untuk Anak Berkebutuhan Khusus di Daerah 3T" yang diajukan oleh mahasiswa FKIP UMK, Rina Wijaya, berhasil mendapatkan penghargaan Best Paper Award dalam International Conference on Education (ICE) 2025 yang diselenggarakan di Kuala Lumpur, Malaysia.',
                      event: "International Conference on Education (ICE) 2025",
                      level: "Internasional",
                      date: "2025-01-25",
                      students: ["Dr. Susilo (Pembimbing)", "Rina Wijaya"],
                      category: "Penelitian",
                      image: {
                          id: 3,
                          path: "/images/achievements/research.jpg",
                          paths: {
                              thumbnail: "/images/achievements/research.jpg",
                              original: "/images/achievements/research.jpg",
                          },
                      },
                  },
                  {
                      id: 4,
                      title: "Juara 2 Kompetisi Debat Bahasa Inggris Tingkat Regional",
                      slug: "juara-2-debat-bahasa-inggris-regional-2025",
                      content:
                          "Tim Debat Bahasa Inggris FKIP UMK berhasil meraih juara 2 dalam Kompetisi Debat Bahasa Inggris Tingkat Regional Sulawesi 2025. Tim yang terdiri dari tiga mahasiswa Program Studi Pendidikan Bahasa Inggris ini berhasil menunjukkan kemampuan berpikir kritis dan berbahasa Inggris yang memukau para juri.",
                      event: "Kompetisi Debat Bahasa Inggris Tingkat Regional Sulawesi 2025",
                      level: "Regional",
                      date: "2025-04-05",
                      students: [
                          "Dina Amalia",
                          "Reza Pratama",
                          "Siti Nurhaliza",
                      ],
                      category: "Akademik",
                      image: {
                          id: 4,
                          path: "/images/achievements/debate.jpg",
                          paths: {
                              thumbnail: "/images/achievements/debate.jpg",
                              original: "/images/achievements/debate.jpg",
                          },
                      },
                  },
                  {
                      id: 5,
                      title: "Juara 1 Musikalisasi Puisi Festival Sastra Mahasiswa",
                      slug: "juara-1-musikalisasi-puisi-2025",
                      content:
                          "UKM Sastra FKIP UMK berhasil meraih juara pertama dalam kategori Musikalisasi Puisi pada Festival Sastra Mahasiswa Nasional 2025 yang diselenggarakan oleh Kementerian Pendidikan dan Kebudayaan. Penampilan musikalisasi puisi berjudul 'Tanah Air Mata' karya Sutardji Calzoum Bachri mendapat apresiasi tinggi dari dewan juri.",
                      event: "Festival Sastra Mahasiswa Nasional 2025",
                      level: "Nasional",
                      date: "2025-05-12",
                      students: [
                          "Fajar Anugrah",
                          "Dewi Lestari",
                          "Randi Pratama",
                          "Melati Putri",
                      ],
                      category: "Seni Budaya",
                      image: {
                          id: 5,
                          path: "/images/achievements/arts.jpg",
                          paths: {
                              thumbnail: "/images/achievements/arts.jpg",
                              original: "/images/achievements/arts.jpg",
                          },
                      },
                  },
                  {
                      id: 6,
                      title: "Runner-up Kompetisi Inovasi Pembelajaran Digital",
                      slug: "runner-up-inovasi-pembelajaran-digital-2025",
                      content:
                          "Tim mahasiswa Program Studi Teknologi Pendidikan FKIP UMK berhasil menjadi runner-up dalam Kompetisi Inovasi Pembelajaran Digital yang diselenggarakan oleh Telkom Indonesia. Aplikasi pembelajaran interaktif 'LearnFun' yang dikembangkan tim dinilai memiliki potensi besar untuk meningkatkan kualitas pembelajaran di daerah terpencil.",
                      event: "Kompetisi Inovasi Pembelajaran Digital 2025",
                      level: "Nasional",
                      date: "2025-06-08",
                      students: ["Arief Wicaksono", "Putri Ramadani"],
                      category: "Inovasi",
                      image: {
                          id: 6,
                          path: "/images/achievements/innovation.jpg",
                          paths: {
                              thumbnail: "/images/achievements/innovation.jpg",
                              original: "/images/achievements/innovation.jpg",
                          },
                      },
                  },
              ];

    // Filter berdasarkan pencarian dan kategori
    const filteredAchievements = dummyAchievements.filter((achievement) => {
        const matchesSearch =
            achievement.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            achievement.content
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            achievement.event.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            categoryFilter === "all" || achievement.category === categoryFilter;

        const matchesLevel =
            levelFilter === "all" || achievement.level === levelFilter;

        return matchesSearch && matchesCategory && matchesLevel;
    });

    // Extract unique categories for filter
    const categories = [
        "all",
        ...new Set(dummyAchievements.map((a) => a.category)),
    ];

    // Extract unique levels for filter
    const levels = ["all", ...new Set(dummyAchievements.map((a) => a.level))];

    // Helper function to format date
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-8">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="space-y-8">
                                {/* Header */}
                                <div>
                                    <h1 className="text-3xl font-bold mb-4">
                                        Prestasi Mahasiswa
                                    </h1>
                                    <p className="text-gray-600">
                                        Pencapaian dan prestasi membanggakan
                                        dari mahasiswa FKIP UMK di berbagai
                                        bidang.
                                    </p>
                                </div>

                                {/* Search & Filter */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="relative flex-grow">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                        <Input
                                            placeholder="Cari prestasi..."
                                            className="pl-10"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Select
                                            value={categoryFilter}
                                            onValueChange={setCategoryFilter}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem
                                                        key={category}
                                                        value={category}
                                                    >
                                                        {category === "all"
                                                            ? "Semua Kategori"
                                                            : category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select
                                            value={levelFilter}
                                            onValueChange={setLevelFilter}
                                        >
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Tingkat" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {levels.map((level) => (
                                                    <SelectItem
                                                        key={level}
                                                        value={level}
                                                    >
                                                        {level === "all"
                                                            ? "Semua Tingkat"
                                                            : `Tingkat ${level}`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Achievement Cards */}
                                <div className="space-y-6">
                                    {filteredAchievements.length > 0 ? (
                                        filteredAchievements.map(
                                            (achievement) => (
                                                <Card
                                                    key={achievement.id}
                                                    className="overflow-hidden hover:shadow-md transition-all"
                                                >
                                                    <div className="grid md:grid-cols-12 gap-4">
                                                        {/* Achievement Image */}
                                                        <div className="md:col-span-4">
                                                            <div className="h-48 md:h-full bg-gray-100">
                                                                {achievement.image ? (
                                                                    <img
                                                                        src={
                                                                            achievement
                                                                                .image
                                                                                .path
                                                                        }
                                                                        alt={
                                                                            achievement.title
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                                        <Trophy className="w-16 h-16 text-gray-400" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Achievement Details */}
                                                        <div className="md:col-span-8 p-5">
                                                            <div className="flex flex-wrap gap-2 mb-2">
                                                                <Badge className="bg-green-100 text-green-800">
                                                                    {
                                                                        achievement.category
                                                                    }
                                                                </Badge>
                                                                <Badge className="bg-blue-100 text-blue-800">
                                                                    Tingkat{" "}
                                                                    {
                                                                        achievement.level
                                                                    }
                                                                </Badge>
                                                            </div>

                                                            <h2 className="text-xl font-bold mb-2">
                                                                {
                                                                    achievement.title
                                                                }
                                                            </h2>

                                                            <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                                                                <Calendar className="w-4 h-4" />
                                                                <span>
                                                                    {formatDate(
                                                                        achievement.date
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                                {
                                                                    achievement.content
                                                                }
                                                            </p>

                                                            <div className="mb-4">
                                                                <p className="text-sm font-medium mb-1">
                                                                    Mahasiswa:
                                                                </p>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {achievement.students.map(
                                                                        (
                                                                            student,
                                                                            idx
                                                                        ) => (
                                                                            <Badge
                                                                                variant="outline"
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                className="text-xs font-normal"
                                                                            >
                                                                                <User className="w-3 h-3 mr-1" />
                                                                                {
                                                                                    student
                                                                                }
                                                                            </Badge>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-between items-center">
                                                                <span className="text-sm text-gray-500">
                                                                    {
                                                                        achievement.event
                                                                    }
                                                                </span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    asChild
                                                                >
                                                                    <a
                                                                        href={`/kemahasiswaan/prestasi/${achievement.slug}`}
                                                                    >
                                                                        Selengkapnya{" "}
                                                                        <ChevronRight className="w-4 h-4 ml-1" />
                                                                    </a>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            )
                                        )
                                    ) : (
                                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                                            <Trophy className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                                            <h3 className="text-lg font-medium">
                                                Tidak ada prestasi ditemukan
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {searchTerm ||
                                                categoryFilter !== "all" ||
                                                levelFilter !== "all"
                                                    ? "Tidak ada hasil yang cocok dengan filter yang diterapkan"
                                                    : "Belum ada data prestasi tersedia"}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <div className="sticky top-20 space-y-6">
                                <StudentSidebar />

                                {/* Stats Card */}
                                {/* <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Ringkasan Prestasi
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <Trophy className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span>Total Prestasi</span>
                                            </div>
                                            <span className="font-bold text-lg">
                                                {dummyAchievements.length}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <Medal className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span>Tingkat Nasional</span>
                                            </div>
                                            <span className="font-bold text-lg">
                                                {
                                                    dummyAchievements.filter(
                                                        (a) =>
                                                            a.level ===
                                                            "Nasional"
                                                    ).length
                                                }
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                    <Award className="w-4 h-4 text-purple-600" />
                                                </div>
                                                <span>
                                                    Tingkat Internasional
                                                </span>
                                            </div>
                                            <span className="font-bold text-lg">
                                                {
                                                    dummyAchievements.filter(
                                                        (a) =>
                                                            a.level ===
                                                            "Internasional"
                                                    ).length
                                                }
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card> */}

                                {/* Top Category Card */}
                                {/* <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            Kategori Prestasi
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {categories
                                            .filter((c) => c !== "all")
                                            .map((category) => {
                                                const count =
                                                    dummyAchievements.filter(
                                                        (a) =>
                                                            a.category ===
                                                            category
                                                    ).length;
                                                return (
                                                    <div
                                                        key={category}
                                                        className="flex justify-between items-center"
                                                    >
                                                        <button
                                                            className={`flex items-center gap-2 hover:text-green-600 transition-colors ${
                                                                categoryFilter ===
                                                                category
                                                                    ? "text-green-600 font-medium"
                                                                    : ""
                                                            }`}
                                                            onClick={() =>
                                                                setCategoryFilter(
                                                                    category
                                                                )
                                                            }
                                                        >
                                                            <Tag className="w-4 h-4" />
                                                            <span>
                                                                {category}
                                                            </span>
                                                        </button>
                                                        <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                                                            {count}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                    </CardContent>
                                </Card> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Achievement;
