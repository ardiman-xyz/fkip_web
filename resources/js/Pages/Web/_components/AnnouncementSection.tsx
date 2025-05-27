import React from "react";
import {
    PiMegaphoneDuotone,
    PiArrowRightDuotone,
    PiDownloadDuotone,
    PiEyeDuotone,
    PiCheckCircleDuotone,
    PiCalendarDuotone,
} from "react-icons/pi";

interface Announcement {
    id: number;
    title: string;
    content?: string;
    excerpt?: string;
    image?: string;
    priority: "low" | "normal" | "high" | "urgent";
    date: string;
    formatted_date: string;
    isNew: boolean;
    action?: {
        type: "download" | "view" | "register";
        url: string;
        label: string;
    };
    translations: {
        id?: {
            title: string;
            content: string;
            excerpt: string;
        };
        en?: {
            title: string;
            content: string;
            excerpt: string;
        };
    };
}

interface AnnouncementSectionProps {
    announcements: Announcement[];
}

const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({
    announcements,
}) => {
    // Get priority badge style
    const getPriorityStyle = (
        priority: "low" | "normal" | "high" | "urgent"
    ) => {
        const styles: Record<
            "low" | "normal" | "high" | "urgent",
            { color: string; bgColor: string; label: string }
        > = {
            urgent: {
                color: "text-red-600",
                bgColor: "bg-red-100",
                label: "Penting",
            },
            high: {
                color: "text-orange-600",
                bgColor: "bg-orange-100",
                label: "Tinggi",
            },
            normal: {
                color: "text-blue-600",
                bgColor: "bg-blue-100",
                label: "Normal",
            },
            low: {
                color: "text-gray-600",
                bgColor: "bg-gray-100",
                label: "Biasa",
            },
        };
        return styles[priority] || styles.normal;
    };

    // Get content for display (prioritize Indonesian, fallback to English)
    const getDisplayContent = (
        announcement: Announcement,
        field: "title" | "content" | "excerpt"
    ) => {
        return (
            announcement.translations?.id?.[field] ||
            announcement.translations?.en?.[field] ||
            announcement[field] ||
            ""
        );
    };

    // Generate slug for URL
    const generateSlug = (title: string, id: number) => {
        const slug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // Remove special characters
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/-+/g, "-") // Replace multiple hyphens with single
            .trim();
        return `${slug}-${id}`;
    };

    return (
        <section className="py-12 bg-gray-50">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Pengumuman
                        </h2>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Informasi terkini dan pengumuman penting dari Fakultas
                        Keguruan dan Ilmu Pendidikan
                    </p>
                </div>

                {/* Check if announcements exist */}
                {announcements && announcements.length > 0 ? (
                    <>
                        {/* Announcements Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                            {announcements.map((announcement) => {
                                const priorityStyle = getPriorityStyle(
                                    announcement.priority
                                );
                                const displayTitle = getDisplayContent(
                                    announcement,
                                    "title"
                                );
                                const displayExcerpt = getDisplayContent(
                                    announcement,
                                    "excerpt"
                                );
                                const slug = generateSlug(
                                    displayTitle,
                                    announcement.id
                                );

                                return (
                                    <div
                                        key={announcement.id}
                                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group"
                                    >
                                        {/* Image */}
                                        {announcement.image && (
                                            <div className="relative h-48 overflow-hidden">
                                                <a href={`/pengumuman/${slug}`}>
                                                    <img
                                                        src={announcement.image}
                                                        alt={displayTitle}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                </a>
                                                {announcement.isNew && (
                                                    <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                        BARU
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="p-6">
                                            {/* Priority Badge & Date */}
                                            <div className="flex items-center justify-between mb-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${priorityStyle.bgColor} ${priorityStyle.color}`}
                                                >
                                                    {priorityStyle.label}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    {announcement.isNew &&
                                                        !announcement.image && (
                                                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                                BARU
                                                            </span>
                                                        )}
                                                    <span className="text-gray-500 text-xs flex items-center gap-1">
                                                        <PiCalendarDuotone className="w-3 h-3" />
                                                        {
                                                            announcement.formatted_date
                                                        }
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                                                <a
                                                    href={`/pengumuman/${slug}`}
                                                    className="hover:text-blue-600"
                                                >
                                                    {displayTitle}
                                                </a>
                                            </h3>

                                            {/* Excerpt */}
                                            {displayExcerpt && (
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                    {displayExcerpt}
                                                </p>
                                            )}

                                            {/* Footer */}
                                            <div className="flex items-center justify-between">
                                                {announcement.action && (
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        {announcement.action
                                                            .type ===
                                                            "download" && (
                                                            <PiDownloadDuotone className="w-3 h-3" />
                                                        )}
                                                        {announcement.action
                                                            .type ===
                                                            "view" && (
                                                            <PiEyeDuotone className="w-3 h-3" />
                                                        )}
                                                        {announcement.action
                                                            .type ===
                                                            "register" && (
                                                            <PiCheckCircleDuotone className="w-3 h-3" />
                                                        )}
                                                        {
                                                            announcement.action
                                                                .label
                                                        }
                                                    </span>
                                                )}
                                                <a
                                                    href={`/pengumuman/${slug}`}
                                                    className="flex items-center gap-1 text-blue-600 hover:gap-2 transition-all duration-200 text-sm hover:text-blue-700"
                                                >
                                                    <span>
                                                        Baca selengkapnya
                                                    </span>
                                                    <PiArrowRightDuotone className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* View All Button */}
                        <div className="text-center mt-12">
                            <a
                                href="/pengumuman"
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                            >
                                Lihat Semua Pengumuman
                                <PiArrowRightDuotone className="w-5 h-5" />
                            </a>
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-12">
                        <PiMegaphoneDuotone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-500 mb-2">
                            Belum Ada Pengumuman
                        </h3>
                        <p className="text-gray-400">
                            Pengumuman terbaru akan ditampilkan di sini
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AnnouncementSection;
