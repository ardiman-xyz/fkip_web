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
    const dummyAchievements = achievements;

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

                                                            <div className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: achievement.content,
                                                                    }}
                                                                />
                                                            </div>

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
                                                                        href={`/berita/${achievement.slug}`}
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
