import Guest2 from "@/Layouts/GuestLayout2";
import { StudentSidebar } from "../_components/StudentSidebar";
import { Card, CardContent } from "@/Components/ui/card";
import { Trophy } from "lucide-react";

// pages/Student/Achievement.tsx
const Achievement = () => {
    const achievements = [
        {
            category: "Akademik",
            items: [
                {
                    title: "Juara 1 Lomba Karya Tulis Ilmiah Nasional",
                    students: ["Maria Putri", "Ahmad Fadli"],
                    event: "LKTIN 2024",
                    level: "Nasional",
                    date: "Maret 2024",
                    image: "/images/achievements/lktin.jpg",
                },
                // ... more academic achievements
            ],
        },
        {
            category: "Non-Akademik",
            items: [
                {
                    title: "Medali Emas Kejuaraan Karate",
                    students: ["Budi Santoso"],
                    event: "POMNAS 2024",
                    level: "Nasional",
                    date: "Februari 2024",
                    image: "/images/achievements/karate.jpg",
                },
                // ... more non-academic achievements
            ],
        },
        {
            category: "Penelitian",
            items: [
                {
                    title: "Best Paper Award",
                    students: ["Dr. Susilo (Pembimbing)", "Rina Wijaya"],
                    event: "International Conference on Education",
                    level: "Internasional",
                    date: "Januari 2024",
                    image: "/images/achievements/paper.jpg",
                },
                // ... more research achievements
            ],
        },
    ];

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-8">
                            <div className="space-y-12">
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

                                {/* Achievement Categories */}
                                {achievements.map((category, idx) => (
                                    <div key={idx} className="space-y-6">
                                        <h2 className="text-2xl font-semibold">
                                            {category.category}
                                        </h2>
                                        <div className="grid gap-6">
                                            {category.items.map(
                                                (item, index) => (
                                                    <Card key={index}>
                                                        <CardContent className="p-6">
                                                            <div className="flex flex-col md:flex-row gap-6">
                                                                {/* Badge & Level */}
                                                                <div className="md:w-64 flex-shrink-0">
                                                                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                                                        <Trophy className="h-12 w-12 text-yellow-500" />
                                                                    </div>
                                                                    <div className="mt-4 text-center">
                                                                        <span
                                                                            className={`px-3 py-1 rounded-full text-sm font-medium
                                                                        ${
                                                                            item.level ===
                                                                            "Internasional"
                                                                                ? "bg-purple-100 text-purple-700"
                                                                                : item.level ===
                                                                                  "Nasional"
                                                                                ? "bg-blue-100 text-blue-700"
                                                                                : "bg-green-100 text-green-700"
                                                                        }`}
                                                                        >
                                                                            Tingkat{" "}
                                                                            {
                                                                                item.level
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Achievement Details */}
                                                                <div className="flex-grow space-y-4">
                                                                    <div>
                                                                        <h3 className="text-lg font-semibold">
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </h3>
                                                                        <p className="text-gray-600">
                                                                            {
                                                                                item.event
                                                                            }
                                                                        </p>
                                                                    </div>

                                                                    <div>
                                                                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                                                                            Mahasiswa/i
                                                                        </h4>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {item.students.map(
                                                                                (
                                                                                    student,
                                                                                    i
                                                                                ) => (
                                                                                    <span
                                                                                        key={
                                                                                            i
                                                                                        }
                                                                                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                                                                                    >
                                                                                        {
                                                                                            student
                                                                                        }
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <div className="text-sm text-gray-500">
                                                                        {
                                                                            item.date
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-4">
                            <StudentSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Achievement;
