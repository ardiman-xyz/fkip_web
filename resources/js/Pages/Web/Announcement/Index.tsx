import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import Guest2 from "@/Layouts/GuestLayout2";
import {
    PiMegaphoneDuotone,
    PiMagnifyingGlassDuotone,
    PiCalendarDuotone,
    PiDownloadDuotone,
    PiEyeDuotone,
    PiCheckCircleDuotone,
    PiArrowRightDuotone,
    PiXDuotone,
    PiFunnelDuotone,
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

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedAnnouncements {
    data: Announcement[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

interface AllAnnouncementsProps {
    announcements: PaginatedAnnouncements;
    filters: {
        priority?: string;
        search?: string;
    };
}

export default function AllAnnouncements({
    announcements,
    filters,
}: AllAnnouncementsProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [selectedPriority, setSelectedPriority] = useState(
        filters.priority || ""
    );
    const [showFilters, setShowFilters] = useState(false);

    // Priority options
    const priorityOptions = [
        { value: "", label: "Semua Prioritas" },
        {
            value: "urgent",
            label: "Penting",
            color: "text-red-600",
            bgColor: "bg-red-100",
        },
        {
            value: "high",
            label: "Tinggi",
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
        {
            value: "normal",
            label: "Normal",
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            value: "low",
            label: "Biasa",
            color: "text-gray-600",
            bgColor: "bg-gray-100",
        },
    ];

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

    // Get content for display
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
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
        return `${slug}-${id}`;
    };

    // Handle search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            "/pengumuman",
            {
                search: searchQuery,
                priority: selectedPriority,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Handle filter change
    const handleFilterChange = (priority: string) => {
        setSelectedPriority(priority);
        router.get(
            "/pengumuman",
            {
                search: searchQuery,
                priority: priority,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    // Clear filters
    const clearFilters = () => {
        setSearchQuery("");
        setSelectedPriority("");
        router.get(
            "/pengumuman",
            {},
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    return (
        <Guest2>
            <Head title="Semua Pengumuman" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-gradient-to-r  from-green-600 to-blue-600 border-b border-gray-200">
                    <div className="container max-w-6xl mx-auto px-4 py-8">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <h1 className="text-3xl md:text-4xl font-bold text-white">
                                    Semua Pengumuman
                                </h1>
                            </div>
                            <p className="text-white max-w-2xl mx-auto">
                                Informasi lengkap dan pengumuman terkini dari
                                Fakultas Keguruan dan Ilmu Pendidikan
                            </p>
                        </div>

                        {/* Search and Filter */}
                        <div className="space-y-4">
                            {/* Search Bar */}
                            <div className="relative max-w-xl mx-auto">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === "Enter" && handleSearch(e)
                                    }
                                    placeholder="Cari pengumuman..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <PiMagnifyingGlassDuotone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Cari
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container max-w-6xl mx-auto px-4 py-8">
                    {/* Results Info */}
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-600">
                            Menampilkan {announcements.from}-{announcements.to}{" "}
                            dari {announcements.total} pengumuman
                        </p>
                        {(searchQuery || selectedPriority) && (
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Filter aktif:</span>
                                {searchQuery && (
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        "{searchQuery}"
                                    </span>
                                )}
                                {selectedPriority && (
                                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                                        {
                                            priorityOptions.find(
                                                (p) =>
                                                    p.value === selectedPriority
                                            )?.label
                                        }
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Announcements Grid */}
                    {announcements.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {announcements.data.map((announcement) => {
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
                                                    <a
                                                        href={`/pengumuman/${slug}`}
                                                    >
                                                        <img
                                                            src={
                                                                announcement.image
                                                            }
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
                                                                announcement
                                                                    .action
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

                            {/* Pagination */}
                            {announcements.last_page > 1 && (
                                <div className="flex items-center justify-center space-x-2">
                                    {announcements.links.map((link, index) => {
                                        if (link.label === "&laquo; Previous") {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        link.url &&
                                                        router.get(link.url)
                                                    }
                                                    disabled={!link.url}
                                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                        link.url
                                                            ? "text-gray-700 hover:bg-gray-100"
                                                            : "text-gray-400 cursor-not-allowed"
                                                    }`}
                                                >
                                                    Sebelumnya
                                                </button>
                                            );
                                        }

                                        if (link.label === "Next &raquo;") {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        link.url &&
                                                        router.get(link.url)
                                                    }
                                                    disabled={!link.url}
                                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                        link.url
                                                            ? "text-gray-700 hover:bg-gray-100"
                                                            : "text-gray-400 cursor-not-allowed"
                                                    }`}
                                                >
                                                    Selanjutnya
                                                </button>
                                            );
                                        }

                                        if (link.label === "...") {
                                            return (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 text-gray-400"
                                                >
                                                    ...
                                                </span>
                                            );
                                        }

                                        return (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    link.url &&
                                                    router.get(link.url)
                                                }
                                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                                    link.active
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                }`}
                                            >
                                                {link.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-12">
                            <PiMegaphoneDuotone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-500 mb-2">
                                {searchQuery || selectedPriority
                                    ? "Tidak ada pengumuman yang sesuai"
                                    : "Belum ada pengumuman"}
                            </h3>
                            <p className="text-gray-400 mb-4">
                                {searchQuery || selectedPriority
                                    ? "Coba ubah kata kunci pencarian atau filter yang digunakan"
                                    : "Pengumuman akan ditampilkan di sini ketika tersedia"}
                            </p>
                            {(searchQuery || selectedPriority) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Hapus semua filter
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Guest2>
    );
}
