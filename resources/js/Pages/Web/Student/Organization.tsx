// pages/Student/Organization.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Users, Target, Award, Calendar } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { StudentSidebar } from "../_components/StudentSidebar";

interface Organization {
    name: string;
    description: string;
    logo?: string;
    yearFounded: string;
    stats: {
        members: number;
        activities: number;
        achievements: number;
    };
    programs: string[];
}

const Organization = () => {
    const organizations = [
        {
            name: "Badan Eksekutif Mahasiswa (BEM)",
            description:
                "Organisasi mahasiswa intra kampus yang merupakan lembaga eksekutif di tingkat fakultas.",
            stats: {
                members: 45,
                activities: 24,
                achievements: 12,
            },
            programs: [
                "Program Kerja Tahunan",
                "Kegiatan Kemahasiswaan",
                "Advokasi Mahasiswa",
                "Pengembangan Minat & Bakat",
            ],
        },
        {
            name: "Himpunan Mahasiswa Program Studi (HMPS)",
            description:
                "Organisasi mahasiswa tingkat program studi yang fokus pada pengembangan akademik dan profesi.",
            stats: {
                members: 120,
                activities: 18,
                achievements: 8,
            },
            programs: [
                "Studi Akademik",
                "Pengabdian Masyarakat",
                "Pelatihan & Workshop",
                "Kolaborasi Antar Prodi",
            ],
        },
    ];

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-8">
                            {/* Header */}
                            <div className="mb-12">
                                <h1 className="text-3xl font-bold mb-4">
                                    Organisasi Kemahasiswaan
                                </h1>
                                <p className="text-gray-600">
                                    Organisasi kemahasiswaan FKIP UMK adalah
                                    wadah pengembangan diri mahasiswa untuk
                                    memperluas wawasan, meningkatkan
                                    kecendekiawanan, dan mengembangkan
                                    kepribadian.
                                </p>
                            </div>

                            {/* Organizations */}
                            <div className="space-y-8">
                                {organizations.map((org, index) => (
                                    <Card key={index}>
                                        <CardContent className="p-6">
                                            <div className="space-y-6">
                                                {/* Header */}
                                                <div>
                                                    <h2 className="text-xl font-semibold mb-2">
                                                        {org.name}
                                                    </h2>
                                                    <p className="text-gray-600">
                                                        {org.description}
                                                    </p>
                                                </div>

                                                {/* Stats */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                        <Users className="h-6 w-6 mb-2 mx-auto text-blue-600" />
                                                        <div className="font-semibold">
                                                            {org.stats.members}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            Anggota Aktif
                                                        </div>
                                                    </div>
                                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                        <Target className="h-6 w-6 mb-2 mx-auto text-green-600" />
                                                        <div className="font-semibold">
                                                            {
                                                                org.stats
                                                                    .activities
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            Program Kerja
                                                        </div>
                                                    </div>
                                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                        <Award className="h-6 w-6 mb-2 mx-auto text-orange-600" />
                                                        <div className="font-semibold">
                                                            {
                                                                org.stats
                                                                    .achievements
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            Prestasi
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Programs */}
                                                <div>
                                                    <h3 className="font-medium mb-3">
                                                        Program Unggulan
                                                    </h3>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {org.programs.map(
                                                            (program, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="flex items-center gap-2"
                                                                >
                                                                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                                                    <span className="text-sm text-gray-600">
                                                                        {
                                                                            program
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <Button
                                                    className="w-full"
                                                    disabled
                                                >
                                                    Gabung Organisasi
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
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

export default Organization;
