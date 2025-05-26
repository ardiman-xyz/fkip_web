import React, { useState } from "react";
import {
    PiMegaphoneDuotone,
    PiBellDuotone,
    PiInfoDuotone,
    PiImageDuotone,
    PiCalendarDuotone,
    PiXDuotone,
    PiArrowRightDuotone,
    PiDownloadDuotone,
    PiEyeDuotone,
    PiWarningDuotone,
    PiCheckCircleDuotone,
} from "react-icons/pi";

interface Announcement {
    id: number;
    title: string;
    content?: string;
    image?: string;
    category: "info" | "urgent" | "event" | "document" | "image";
    date: string;
    action?: {
        type: "download" | "view" | "register";
        url: string;
        label: string;
    };
    isNew?: boolean;
}

interface AnnouncementCategory {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

const AnnouncementSection = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedAnnouncement, setSelectedAnnouncement] =
        useState<Announcement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Kategori pengumuman
    const categories: AnnouncementCategory[] = [
        {
            id: "all",
            name: "Semua",
            icon: <PiMegaphoneDuotone className="w-5 h-5" />,
            color: "text-gray-600",
            bgColor: "bg-gray-100",
        },
        {
            id: "info",
            name: "Informasi",
            icon: <PiInfoDuotone className="w-5 h-5" />,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            id: "urgent",
            name: "Penting",
            icon: <PiWarningDuotone className="w-5 h-5" />,
            color: "text-red-600",
            bgColor: "bg-red-100",
        },
        {
            id: "event",
            name: "Acara",
            icon: <PiCalendarDuotone className="w-5 h-5" />,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            id: "document",
            name: "Dokumen",
            icon: <PiDownloadDuotone className="w-5 h-5" />,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            id: "image",
            name: "Gallery",
            icon: <PiImageDuotone className="w-5 h-5" />,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
    ];

    // Data dummy pengumuman
    const announcements: Announcement[] = [
        {
            id: 1,
            title: "Pengumuman Jadwal Ujian Tengah Semester Genap 2024/2025",
            content:
                "Kepada seluruh mahasiswa FKIP UMK, dengan ini disampaikan jadwal Ujian Tengah Semester (UTS) Genap tahun akademik 2024/2025 akan dilaksanakan mulai tanggal 15 Maret - 25 Maret 2025. Harap mempersiapkan diri dengan baik dan mengikuti protokol kesehatan yang berlaku.",
            category: "urgent",
            date: "2025-01-15",
            isNew: true,
            action: {
                type: "view",
                url: "https://fkip.umkendari.ac.id/jadwal-uts",
                label: "Lihat Jadwal Lengkap",
            },
        },
        {
            id: 2,
            title: "Pendaftaran Beasiswa Prestasi Tahun 2025",
            content:
                "FKIP UMK membuka pendaftaran beasiswa prestasi untuk mahasiswa berprestasi. Persyaratan: IPK minimal 3.5, surat rekomendasi dosen, dan sertifikat prestasi. Pendaftaran dibuka hingga 28 Februari 2025.",
            category: "info",
            date: "2025-01-10",
            action: {
                type: "register",
                url: "https://beasiswa.umkendari.ac.id",
                label: "Daftar Sekarang",
            },
        },
        {
            id: 3,
            title: "Seminar Nasional Pendidikan 2025",
            content:
                "FKIP UMK mengundang seluruh civitas akademika untuk menghadiri Seminar Nasional Pendidikan dengan tema 'Inovasi Pembelajaran di Era Digital'. Acara akan diselenggarakan pada 20 Februari 2025 di Auditorium Utama.",
            category: "event",
            date: "2025-01-08",
            image: "https://via.placeholder.com/400x200/10b981/ffffff?text=Seminar+Nasional",
            action: {
                type: "register",
                url: "https://seminar.fkip.umkendari.ac.id",
                label: "Daftar Peserta",
            },
        },
        {
            id: 4,
            title: "Download Panduan Skripsi Terbaru",
            content:
                "Panduan penulisan skripsi telah diperbarui sesuai dengan standar terbaru. Silakan download panduan terbaru untuk referensi penulisan skripsi Anda.",
            category: "document",
            date: "2025-01-05",
            action: {
                type: "download",
                url: "https://fkip.umkendari.ac.id/download/panduan-skripsi.pdf",
                label: "Download PDF",
            },
        },
        {
            id: 5,
            title: "Galeri Wisuda Periode Januari 2025",
            image: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Wisuda+2025",
            category: "image",
            date: "2025-01-20",
            isNew: true,
            action: {
                type: "view",
                url: "https://gallery.fkip.umkendari.ac.id/wisuda-2025",
                label: "Lihat Galeri",
            },
        },
        {
            id: 6,
            title: "Workshop Penelitian Tindakan Kelas",
            content:
                "Dosen dan mahasiswa diundang mengikuti workshop PTK yang akan membahas metodologi penelitian tindakan kelas untuk meningkatkan kualitas pembelajaran.",
            category: "event",
            date: "2025-01-03",
            action: {
                type: "register",
                url: "https://workshop.fkip.umkendari.ac.id",
                label: "Daftar Workshop",
            },
        },
    ];

    // Filter pengumuman berdasarkan kategori
    const filteredAnnouncements =
        selectedCategory === "all"
            ? announcements
            : announcements.filter((ann) => ann.category === selectedCategory);

    // Format tanggal
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // Get category style
    const getCategoryStyle = (category: string) => {
        const cat = categories.find((c) => c.id === category);
        return cat
            ? { color: cat.color, bgColor: cat.bgColor }
            : { color: "text-gray-600", bgColor: "bg-gray-100" };
    };

    // Handle announcement click
    const handleAnnouncementClick = (announcement: Announcement) => {
        setSelectedAnnouncement(announcement);
        setIsModalOpen(true);
    };

    return (
        <section className="py-12 bg-gray-50">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <PiMegaphoneDuotone className="w-8 h-8 text-blue-600" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Pengumuman
                        </h2>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Informasi terkini dan pengumuman penting dari Fakultas
                        Keguruan dan Ilmu Pendidikan
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                                selectedCategory === category.id
                                    ? `${category.bgColor} ${category.color} font-semibold`
                                    : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {category.icon}
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>

                {/* Announcements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  mx-auto">
                    {filteredAnnouncements.map((announcement) => {
                        const categoryStyle = getCategoryStyle(
                            announcement.category
                        );

                        return (
                            <div
                                key={announcement.id}
                                onClick={() =>
                                    handleAnnouncementClick(announcement)
                                }
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
                            >
                                {/* Image for gallery type */}
                                {announcement.image && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={announcement.image}
                                            alt={announcement.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {announcement.isNew && (
                                            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                BARU
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Category Badge & Date */}
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${categoryStyle.bgColor} ${categoryStyle.color}`}
                                        >
                                            {
                                                categories.find(
                                                    (c) =>
                                                        c.id ===
                                                        announcement.category
                                                )?.icon
                                            }
                                            {
                                                categories.find(
                                                    (c) =>
                                                        c.id ===
                                                        announcement.category
                                                )?.name
                                            }
                                        </span>
                                        {announcement.isNew &&
                                            !announcement.image && (
                                                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                    BARU
                                                </span>
                                            )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                        {announcement.title}
                                    </h3>

                                    {/* Content Preview */}
                                    {announcement.content && (
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                            {announcement.content}
                                        </p>
                                    )}

                                    {/* Footer */}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">
                                            {formatDate(announcement.date)}
                                        </span>
                                        <div className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all duration-200">
                                            <span>Baca selengkapnya</span>
                                            <PiArrowRightDuotone className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* View All Button */}
                <div className="text-center mt-8">
                    <a
                        href="https://pengumuman.fkip.umkendari.ac.id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                    >
                        Lihat Semua Pengumuman
                        <PiArrowRightDuotone className="w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedAnnouncement && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                                getCategoryStyle(
                                                    selectedAnnouncement.category
                                                ).bgColor
                                            } ${
                                                getCategoryStyle(
                                                    selectedAnnouncement.category
                                                ).color
                                            }`}
                                        >
                                            {
                                                categories.find(
                                                    (c) =>
                                                        c.id ===
                                                        selectedAnnouncement.category
                                                )?.icon
                                            }
                                            {
                                                categories.find(
                                                    (c) =>
                                                        c.id ===
                                                        selectedAnnouncement.category
                                                )?.name
                                            }
                                        </span>
                                        {selectedAnnouncement.isNew && (
                                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                BARU
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        {selectedAnnouncement.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        {formatDate(selectedAnnouncement.date)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="ml-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                >
                                    <PiXDuotone className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Image */}
                            {selectedAnnouncement.image && (
                                <div className="mb-6">
                                    <img
                                        src={selectedAnnouncement.image}
                                        alt={selectedAnnouncement.title}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            {selectedAnnouncement.content && (
                                <div className="mb-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedAnnouncement.content}
                                    </p>
                                </div>
                            )}

                            {/* Action Button */}
                            {selectedAnnouncement.action && (
                                <div className="flex justify-center">
                                    <a
                                        href={selectedAnnouncement.action.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        {selectedAnnouncement.action.type ===
                                            "download" && (
                                            <PiDownloadDuotone className="w-5 h-5" />
                                        )}
                                        {selectedAnnouncement.action.type ===
                                            "view" && (
                                            <PiEyeDuotone className="w-5 h-5" />
                                        )}
                                        {selectedAnnouncement.action.type ===
                                            "register" && (
                                            <PiCheckCircleDuotone className="w-5 h-5" />
                                        )}
                                        {selectedAnnouncement.action.label}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AnnouncementSection;
