// pages/Web/Features.tsx
import { Head } from "@inertiajs/react";
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import {
    Star,
    Globe,
    Users,
    BookOpen,
    Calendar,
    Megaphone,
    Shield,
    Smartphone,
    Zap,
    Award,
} from "lucide-react";

const FeaturesPage = () => {
    const stats = [
        { number: "85+", label: "Total Fitur", icon: Star },
        { number: "12", label: "Kategori Utama", icon: BookOpen },
        { number: "100%", label: "Responsif Mobile", icon: Smartphone },
        { number: "2", label: "Bahasa (ID/EN)", icon: Globe },
    ];

    const features = [
        {
            category: "Beranda",
            icon: Globe,
            color: "bg-blue-100 text-blue-600",
            items: [
                {
                    name: "Carousel Hero",
                    desc: "Slider otomatis dengan berita unggulan & slide default",
                },
                { name: "Berita Terbaru", desc: "3 berita terbaru di beranda" },
                { name: "Agenda Terbaru", desc: "3 agenda terbaru di beranda" },
                {
                    name: "Pengumuman",
                    desc: "Pengumuman penting dengan sistem prioritas",
                },
                { name: "Program Unggulan", desc: "Program unggulan fakultas" },
                {
                    name: "Informasi Penting",
                    desc: "Informasi penting dengan modal & tautan",
                },
            ],
        },
        {
            category: "Berita",
            icon: BookOpen,
            color: "bg-green-100 text-green-600",
            items: [
                {
                    name: "Halaman Semua Berita",
                    desc: "Halaman semua berita dengan paginasi",
                },
                {
                    name: "Detail Berita",
                    desc: "Detail berita dengan fitur berbagi",
                },
                {
                    name: "Filter Kategori",
                    desc: "Filter berita berdasarkan kategori",
                },
                { name: "Sistem Tag", desc: "Sistem tag untuk berita" },
                { name: "Pencarian Berita", desc: "Fitur pencarian berita" },
                { name: "Berita Populer", desc: "Sidebar berita populer" },
                { name: "Berita Unggulan", desc: "Sistem berita unggulan" },
                {
                    name: "Multi Bahasa",
                    desc: "Dukungan bahasa Indonesia & Inggris",
                },
            ],
        },
        {
            category: "Agenda",
            icon: Calendar,
            color: "bg-purple-100 text-purple-600",
            items: [
                {
                    name: "Halaman Semua Agenda",
                    desc: "Halaman semua agenda dengan filter",
                },
                {
                    name: "Detail Agenda",
                    desc: "Detail agenda dengan info lengkap",
                },
                {
                    name: "Filter Kategori",
                    desc: "Filter agenda berdasarkan kategori",
                },
                { name: "Pencarian Agenda", desc: "Fitur pencarian agenda" },
                {
                    name: "Tampilan Kalender",
                    desc: "Kalender dengan indikator event",
                },
                {
                    name: "Status Agenda",
                    desc: "Status: akan datang, berlangsung, selesai",
                },
                { name: "Pendaftaran", desc: "Sistem pendaftaran event" },
                {
                    name: "Online/Offline",
                    desc: "Dukungan event online & offline",
                },
            ],
        },
        {
            category: "Pengumuman",
            icon: Megaphone,
            color: "bg-yellow-100 text-yellow-600",
            items: [
                { name: "Semua Pengumuman", desc: "Halaman semua pengumuman" },
                { name: "Detail Pengumuman", desc: "Detail pengumuman" },
                {
                    name: "Sistem Prioritas",
                    desc: "Prioritas: mendesak, tinggi, normal, rendah",
                },
                { name: "Pencarian", desc: "Pencarian pengumuman" },
                { name: "Tombol Aksi", desc: "Aksi unduh, lihat, daftar" },
                {
                    name: "Badge Baru",
                    desc: "Badge BARU untuk pengumuman terbaru",
                },
            ],
        },
        {
            category: "Profil Fakultas",
            icon: Award,
            color: "bg-red-100 text-red-600",
            items: [
                { name: "Sejarah", desc: "Sejarah fakultas" },
                { name: "Visi & Misi", desc: "Visi & misi fakultas" },
                { name: "Pimpinan", desc: "Profil pimpinan fakultas" },
                {
                    name: "Struktur Organisasi",
                    desc: "Struktur organisasi fakultas",
                },
                { name: "Informasi Kontak", desc: "Informasi kontak fakultas" },
                {
                    name: "Akreditasi",
                    desc: "Akreditasi dengan unduh sertifikat",
                },
            ],
        },
        {
            category: "Dosen",
            icon: Users,
            color: "bg-indigo-100 text-indigo-600",
            items: [
                { name: "Direktori Dosen", desc: "Direktori semua dosen" },
                { name: "Detail Dosen", desc: "Profil lengkap dosen" },
                {
                    name: "Sinkronisasi Eksternal",
                    desc: "Sinkronisasi data dari API SIMPEG",
                },
                { name: "Jabatan Akademik", desc: "Jabatan akademik dosen" },
                { name: "Manajemen Kontak", desc: "Kontak dosen" },
            ],
        },
        {
            category: "Tenaga Kependidikan",
            icon: Users,
            color: "bg-pink-100 text-pink-600",
            items: [
                {
                    name: "Direktori Staff",
                    desc: "Direktori semua tenaga kependidikan",
                },
                { name: "Detail Staff", desc: "Profil tenaga kependidikan" },
                { name: "Unit Kerja", desc: "Pembagian unit kerja" },
            ],
        },
        {
            category: "Program Studi",
            icon: BookOpen,
            color: "bg-cyan-100 text-cyan-600",
            items: [
                {
                    name: "Program per Jenjang",
                    desc: "Program studi berdasarkan jenjang (S1, S2, S3)",
                },
                {
                    name: "Detail Program",
                    desc: "Halaman detail program studi",
                },
                {
                    name: "Deskripsi Program",
                    desc: "Deskripsi & akreditasi program",
                },
                {
                    name: "Penugasan Dosen",
                    desc: "Penugasan dosen ke program studi",
                },
                {
                    name: "Kontak Program",
                    desc: "Informasi kontak per program",
                },
            ],
        },
        {
            category: "Kemahasiswaan",
            icon: Users,
            color: "bg-orange-100 text-orange-600",
            items: [
                {
                    name: "Organisasi Mahasiswa",
                    desc: "Daftar organisasi mahasiswa",
                },
                { name: "Beasiswa", desc: "Informasi beasiswa" },
                { name: "Prestasi Mahasiswa", desc: "Pencapaian mahasiswa" },
            ],
        },
        {
            category: "Fitur Sistem",
            icon: Zap,
            color: "bg-emerald-100 text-emerald-600",
            items: [
                { name: "Dukungan Multi Bahasa", desc: "Indonesia/Inggris" },
                { name: "Desain Responsif", desc: "Ramah mobile" },
                {
                    name: "Fungsi Pencarian",
                    desc: "Pencarian di seluruh situs",
                },
                { name: "Filter & Sorting", desc: "Penyaringan & pengurutan" },
                { name: "Paginasi", desc: "Sistem halaman" },
                { name: "Navigasi Breadcrumb", desc: "Jejak navigasi" },
                {
                    name: "Integrasi Media Sosial",
                    desc: "Berbagi ke media sosial",
                },
                { name: "Integrasi WhatsApp", desc: "Kontak WhatsApp" },
            ],
        },
        {
            category: "Manajemen Media",
            icon: Globe,
            color: "bg-violet-100 text-violet-600",
            items: [
                {
                    name: "Upload Media",
                    desc: "Sistem upload dengan multiple versi",
                },
                {
                    name: "Pemrosesan Gambar",
                    desc: "Versi: asli, thumbnail, blur",
                },
                { name: "Integrasi MinIO", desc: "Penyimpanan objek MinIO" },
                { name: "Galeri Media", desc: "Galeri media" },
                { name: "Upload Massal", desc: "Dukungan upload massal" },
            ],
        },
        {
            category: "Fitur Keamanan",
            icon: Shield,
            color: "bg-gray-100 text-gray-600",
            items: [
                { name: "Sistem Autentikasi", desc: "Sistem login" },
                { name: "Otorisasi & Izin", desc: "Hak akses pengguna" },
                { name: "Proteksi CSRF", desc: "Keamanan CSRF" },
                { name: "Proteksi XSS", desc: "Keamanan XSS" },
                { name: "Validasi Upload File", desc: "Validasi file upload" },
            ],
        },
    ];

    return (
        <Guest2>
            <Head title="Fitur Website - FKIP UMK" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">
                                        Beranda
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>Fitur Website</BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-left">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                    Fitur Website FKIP UMK
                                </h1>
                                <p className="text-xl text-gray-600">
                                    Sistem Informasi Digital Fakultas Keguruan
                                    dan Ilmu Pendidikan
                                </p>
                            </div>
                        </div>

                        {/* Highlight Box */}
                        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 mb-8">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold mb-4">
                                    🎯 Keunggulan Utama
                                </h2>
                                <p className="text-lg leading-relaxed">
                                    <strong>Solusi Digital Lengkap</strong> yang
                                    memungkinkan FKIP UMK mengelola dan
                                    menampilkan semua informasi (berita, agenda,
                                    profil, dosen, program studi) secara
                                    profesional dan mudah diakses oleh
                                    mahasiswa, dosen, dan masyarakat umum 24/7.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <Card
                                key={index}
                                className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                        <stat.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium">
                                        {stat.label}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-lg transition-shadow"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.color}`}
                                        >
                                            <feature.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {feature.category}
                                            </h3>
                                            <Badge
                                                variant="secondary"
                                                className="mt-1"
                                            >
                                                {feature.items.length} fitur
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {feature.items.map(
                                            (item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="border-l-2 border-gray-200 pl-4 py-2"
                                                >
                                                    <h4 className="font-semibold text-gray-900 mb-1">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-center">
                        <Card className="bg-gradient-to-r from-gray-900 to-gray-700 text-white border-0">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-2">
                                    Website FKIP UMK
                                </h3>
                                <p className="text-lg opacity-90">
                                    Solusi Digital Lengkap untuk Fakultas Modern
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default FeaturesPage;
