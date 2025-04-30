import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import Guest2 from "@/Layouts/GuestLayout2";
import { StudentSidebar } from "../_components/StudentSidebar";
import { UnderDevelopment } from "@/Components/UnderDevelopment";

const Scholarship = () => {
    const scholarships = [
        {
            name: "Beasiswa KIP-Kuliah",
            provider: "Kementerian Pendidikan",
            description:
                "Beasiswa untuk mahasiswa dari keluarga tidak mampu secara ekonomi namun memiliki potensi akademik yang baik.",
            benefits: [
                "Biaya kuliah/pendidikan",
                "Biaya hidup bulanan",
                "Biaya buku dan peralatan",
            ],
            requirements: [
                "Mahasiswa aktif S1",
                "IPK minimal 3.00",
                "Tidak mampu secara ekonomi",
            ],
            deadline: "30 Juni 2025",
            status: "close", // or "closed"
        },
        {
            name: "Beasiswa Unggulan Muhammadiyah",
            provider: "Muhammadiyah",
            description:
                "Program beasiswa untuk mahasiswa berprestasi dari perguruan tinggi Muhammadiyah.",
            benefits: [
                "Biaya kuliah penuh",
                "Tunjangan bulanan",
                "Asuransi kesehatan",
            ],
            requirements: [
                "Mahasiswa aktif S1/S2",
                "IPK minimal 3.50",
                "Aktif dalam organisasi",
            ],
            deadline: "15 Juli 2025",
            status: "close",
        },
        // ... more scholarships
    ];

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-8">
                            <div className="space-y-8">
                                {/* Header */}
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold mb-4">
                                        Program Beasiswa
                                    </h1>
                                    <p className="text-gray-600">
                                        Informasi mengenai program beasiswa yang
                                        tersedia untuk mahasiswa FKIP UMK.
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

export default Scholarship;
