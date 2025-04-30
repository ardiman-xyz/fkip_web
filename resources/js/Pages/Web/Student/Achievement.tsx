import Guest2 from "@/Layouts/GuestLayout2";
import { StudentSidebar } from "../_components/StudentSidebar";
import { Card, CardContent } from "@/Components/ui/card";
import { Trophy } from "lucide-react";
import { UnderDevelopment } from "@/Components/UnderDevelopment";

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

                                <UnderDevelopment />
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
