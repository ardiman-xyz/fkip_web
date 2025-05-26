import React, { useState } from "react";
import {
    PiMegaphoneDuotone,
    PiXDuotone,
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
    const [selectedAnnouncement, setSelectedAnnouncement] =
        useState<Announcement | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Format tanggal
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

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

    // Handle announcement click
    const handleAnnouncementClick = (announcement: Announcement) => {
        setSelectedAnnouncement(announcement);
        setIsModalOpen(true);
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

    return (
        <section className="py-12 bg-gray-50">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
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

                                return (
                                    <div
                                        key={announcement.id}
                                        onClick={() =>
                                            handleAnnouncementClick(
                                                announcement
                                            )
                                        }
                                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
                                    >
                                        {/* Image */}
                                        {announcement.image && (
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={announcement.image}
                                                    alt={displayTitle}
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
                                                {displayTitle}
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
                                                <div className="flex items-center gap-1 text-blue-600 group-hover:gap-2 transition-all duration-200 text-sm">
                                                    <span>
                                                        Baca selengkapnya
                                                    </span>
                                                    <PiArrowRightDuotone className="w-4 h-4" />
                                                </div>
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

            {/* Modal */}
            {isModalOpen && selectedAnnouncement && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                                getPriorityStyle(
                                                    selectedAnnouncement.priority
                                                ).bgColor
                                            } ${
                                                getPriorityStyle(
                                                    selectedAnnouncement.priority
                                                ).color
                                            }`}
                                        >
                                            {
                                                getPriorityStyle(
                                                    selectedAnnouncement.priority
                                                ).label
                                            }
                                        </span>
                                        {selectedAnnouncement.isNew && (
                                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                                BARU
                                            </span>
                                        )}
                                        <span className="text-gray-500 text-xs flex items-center gap-1">
                                            <PiCalendarDuotone className="w-3 h-3" />
                                            {
                                                selectedAnnouncement.formatted_date
                                            }
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                        {getDisplayContent(
                                            selectedAnnouncement,
                                            "title"
                                        )}
                                    </h2>
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
                                        alt={getDisplayContent(
                                            selectedAnnouncement,
                                            "title"
                                        )}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="mb-6">
                                <div className="prose prose-gray max-w-none">
                                    <div
                                        className="text-gray-700 leading-relaxed"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                getDisplayContent(
                                                    selectedAnnouncement,
                                                    "content"
                                                ) ||
                                                getDisplayContent(
                                                    selectedAnnouncement,
                                                    "excerpt"
                                                ) ||
                                                "Tidak ada konten tersedia.",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Action Button */}
                            {selectedAnnouncement.action && (
                                <div className="flex justify-center pt-4 border-t border-gray-200">
                                    <a
                                        href={selectedAnnouncement.action.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
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
