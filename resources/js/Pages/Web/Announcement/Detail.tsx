// File: resources/js/Pages/Web/Announcement/Detail.tsx

import React from "react";
import { Head } from "@inertiajs/react";
import Guest2 from "@/Layouts/GuestLayout2";
import {
    PiArrowLeftDuotone,
    PiCalendarDuotone,
    PiUserDuotone,
    PiEyeDuotone,
    PiDownloadDuotone,
    PiCheckCircleDuotone,
    PiShareDuotone,
    PiClockDuotone,
} from "react-icons/pi";

interface AnnouncementDetailProps {
    announcement: {
        id: number;
        title: string;
        content: string;
        excerpt?: string;
        image?: string;
        priority: "low" | "normal" | "high" | "urgent";
        date: string;
        formatted_date: string;
        isNew: boolean;
        author: string;
        view_count: number;
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
    };
    meta?: {
        title: string;
        description: string;
        image?: string;
        url: string;
        type: string;
    };
}

export default function AnnouncementDetail({
    announcement,
    meta,
}: AnnouncementDetailProps) {
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
    const getDisplayContent = (field: "title" | "content" | "excerpt") => {
        return (
            announcement.translations?.id?.[field] ||
            announcement.translations?.en?.[field] ||
            announcement[field] ||
            ""
        );
    };

    const priorityStyle = getPriorityStyle(announcement.priority);
    const displayTitle = getDisplayContent("title");
    const displayContent = getDisplayContent("content");

    // Share function
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: displayTitle,
                    text: announcement.excerpt || "",
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Error sharing:", err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link berhasil disalin ke clipboard!");
        }
    };

    return (
        <Guest2>
            <Head
                title={meta?.title || displayTitle}
                // meta={[
                //     { name: 'description', content: meta?.description || announcement.excerpt || '' },
                //     { property: 'og:title', content: meta?.title || displayTitle },
                //     { property: 'og:description', content: meta?.description || announcement.excerpt || '' },
                //     { property: 'og:image', content: meta?.image || announcement.image || '' },
                //     { property: 'og:url', content: meta?.url || '' },
                //     { property: 'og:type', content: meta?.type || 'article' },
                //     { name: 'twitter:card', content: 'summary_large_image' },
                //     { name: 'twitter:title', content: meta?.title || displayTitle },
                //     { name: 'twitter:description', content: meta?.description || announcement.excerpt || '' },
                //     { name: 'twitter:image', content: meta?.image || announcement.image || '' },
                // ]}
            />

            <div className="min-h-screen bg-gray-50">
                {/* Header with Back Button */}
                <div className="bg-white border-b border-gray-200">
                    <div className="container max-w-4xl mx-auto px-4 py-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            >
                                <PiArrowLeftDuotone className="w-5 h-5" />
                                <span>Kembali</span>
                            </button>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <nav className="text-sm text-gray-500">
                                <a href="/" className="hover:text-gray-700">
                                    Beranda
                                </a>
                                <span className="mx-2">/</span>
                                <a
                                    href="/pengumuman"
                                    className="hover:text-gray-700"
                                >
                                    Pengumuman
                                </a>
                                <span className="mx-2">/</span>
                                <span className="text-gray-800">Detail</span>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <article className="container max-w-4xl mx-auto px-4 py-8">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        {/* Article Header */}
                        <div className="p-6 md:p-8 border-b border-gray-200">
                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span
                                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${priorityStyle.bgColor} ${priorityStyle.color}`}
                                >
                                    {priorityStyle.label}
                                </span>
                                {announcement.isNew && (
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        BARU
                                    </span>
                                )}
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <PiCalendarDuotone className="w-4 h-4" />
                                        {announcement.formatted_date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <PiUserDuotone className="w-4 h-4" />
                                        {announcement.author}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <PiEyeDuotone className="w-4 h-4" />
                                        {announcement.view_count.toLocaleString()}{" "}
                                        views
                                    </span>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                                {displayTitle}
                            </h1>

                            {/* Share Button */}
                            <div className="flex items-center justify-between">
                                <div className="text-gray-500 text-sm flex items-center gap-1">
                                    <PiClockDuotone className="w-4 h-4" />
                                    <span>
                                        Diperbarui {announcement.formatted_date}
                                    </span>
                                </div>
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                >
                                    <PiShareDuotone className="w-5 h-5" />
                                    <span>Bagikan</span>
                                </button>
                            </div>
                        </div>

                        {/* Featured Image */}
                        {announcement.image && (
                            <div className="aspect-video md:aspect-[21/9] overflow-hidden">
                                <img
                                    src={announcement.image}
                                    alt={displayTitle}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Article Content */}
                        <div className="p-6 md:p-8">
                            <div className="prose prose-lg prose-gray max-w-none">
                                <div
                                    className="text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            displayContent ||
                                            "Tidak ada konten tersedia.",
                                    }}
                                />
                            </div>

                            {/* Action Button */}
                            {announcement.action && (
                                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            Tindak Lanjut
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {announcement.action.type ===
                                                "download" &&
                                                "Unduh dokumen terkait"}
                                            {announcement.action.type ===
                                                "view" &&
                                                "Lihat informasi lebih lanjut"}
                                            {announcement.action.type ===
                                                "register" &&
                                                "Daftar atau ikuti kegiatan ini"}
                                        </p>
                                        <a
                                            href={announcement.action.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                                        >
                                            {announcement.action.type ===
                                                "download" && (
                                                <PiDownloadDuotone className="w-5 h-5" />
                                            )}
                                            {announcement.action.type ===
                                                "view" && (
                                                <PiEyeDuotone className="w-5 h-5" />
                                            )}
                                            {announcement.action.type ===
                                                "register" && (
                                                <PiCheckCircleDuotone className="w-5 h-5" />
                                            )}
                                            {announcement.action.label}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Back to List */}
                    <div className="mt-8 text-center">
                        <a
                            href="/pengumuman"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                        >
                            <PiArrowLeftDuotone className="w-4 h-4" />
                            Kembali ke Daftar Pengumuman
                        </a>
                    </div>
                </article>
            </div>
        </Guest2>
    );
}
