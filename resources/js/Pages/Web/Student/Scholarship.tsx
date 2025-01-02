import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import Guest2 from "@/Layouts/GuestLayout2";
import { StudentSidebar } from "../_components/StudentSidebar";

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

                                {/* Scholarship List */}
                                <div className="space-y-6">
                                    {scholarships.map((scholarship, index) => (
                                        <Card key={index}>
                                            <CardContent className="p-6">
                                                <div className="space-y-4">
                                                    {/* Header */}
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h2 className="text-xl font-semibold">
                                                                {
                                                                    scholarship.name
                                                                }
                                                            </h2>
                                                            <p className="text-gray-500">
                                                                {
                                                                    scholarship.provider
                                                                }
                                                            </p>
                                                        </div>
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                                scholarship.status ===
                                                                "open"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                        >
                                                            {scholarship.status ===
                                                            "open"
                                                                ? "Dibuka"
                                                                : "Ditutup"}
                                                        </span>
                                                    </div>

                                                    <p className="text-gray-600">
                                                        {
                                                            scholarship.description
                                                        }
                                                    </p>

                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        {/* Benefits */}
                                                        <div>
                                                            <h3 className="font-medium mb-2">
                                                                Manfaat Beasiswa
                                                            </h3>
                                                            <ul className="space-y-2">
                                                                {scholarship.benefits.map(
                                                                    (
                                                                        benefit,
                                                                        idx
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="flex items-center gap-2 text-gray-600"
                                                                        >
                                                                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                                                                            <span className="text-sm">
                                                                                {
                                                                                    benefit
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>

                                                        {/* Requirements */}
                                                        <div>
                                                            <h3 className="font-medium mb-2">
                                                                Persyaratan
                                                            </h3>
                                                            <ul className="space-y-2">
                                                                {scholarship.requirements.map(
                                                                    (
                                                                        req,
                                                                        idx
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="flex items-center gap-2 text-gray-600"
                                                                        >
                                                                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                                                            <span className="text-sm">
                                                                                {
                                                                                    req
                                                                                }
                                                                            </span>
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-4 border-t">
                                                        <div className="text-sm text-gray-500">
                                                            Deadline:{" "}
                                                            {
                                                                scholarship.deadline
                                                            }
                                                        </div>
                                                        <Button disabled>
                                                            Daftar Sekarang
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
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
