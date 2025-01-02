// pages/Academic/Calendar.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { CalendarDays, BookOpen, Clock } from "lucide-react";
import { ProdiSidebar } from "./_components/ProdiSidebar";

interface Activity {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    icon?: React.ReactNode;
}

const Calendar = () => {
    const academicActivities: Activity[] = [
        {
            name: "Penerimaan Mahasiswa Baru",
            description:
                "Pendaftaran dan seleksi mahasiswa baru untuk tahun akademik 2025/2026",
            startDate: "1 April 2025",
            endDate: "31 Juli 2025",
            icon: <BookOpen className="h-5 w-5" />,
        },
        {
            name: "Registrasi & KRS",
            description: "Pembayaran UKT dan pengisian Kartu Rencana Studi",
            startDate: "15 Agustus 2025",
            endDate: "31 Agustus 2025",
            icon: <CalendarDays className="h-5 w-5" />,
        },
        // ... tambahkan aktivitas lainnya
    ];

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-8">
                            <div className="space-y-8">
                                {/* Header */}
                                <div>
                                    <h1 className="text-3xl font-bold mb-4">
                                        Kalender Akademik
                                    </h1>
                                    <p className="text-gray-600">
                                        Kalender akademik tahun 2025/2026 yang
                                        berisi jadwal kegiatan akademik di
                                        lingkungan FKIP Universitas Muhammadiyah
                                        Kendari.
                                    </p>
                                </div>

                                {/* Semester sections */}
                                <div className="space-y-6">
                                    {/* Ganjil */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Semester Ganjil 2025/2026
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {academicActivities.map(
                                                (activity, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                                                {activity.icon}
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h3 className="font-medium mb-1">
                                                                {activity.name}
                                                            </h3>
                                                            <p className="text-sm text-gray-600 mb-2">
                                                                {
                                                                    activity.description
                                                                }
                                                            </p>
                                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                                <Clock className="h-4 w-4" />
                                                                <span>
                                                                    {
                                                                        activity.startDate
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        activity.endDate
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Genap */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Semester Genap 2025/2026
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            {/* ... sama seperti ganjil ... */}
                                        </CardContent>
                                    </Card>
                                </div>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Catatan Penting</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                                            <li>
                                                Jadwal dapat berubah sesuai
                                                dengan kebijakan
                                                fakultas/universitas
                                            </li>
                                            <li>
                                                Mahasiswa wajib memperhatikan
                                                batas waktu setiap kegiatan
                                            </li>
                                            <li>
                                                Informasi lebih lanjut dapat
                                                dilihat di SIAKAD
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="col-span-4">
                            <ProdiSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Calendar;
