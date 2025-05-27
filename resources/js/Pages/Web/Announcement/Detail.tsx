// File: resources/js/Pages/Web/Announcement/Detail.tsx

import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { ShareButtons } from "@/Components/web/ShareButtons";
import {
    PiCalendarDuotone,
    PiUserDuotone,
    PiEyeDuotone,
    PiDownloadDuotone,
    PiCheckCircleDuotone,
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
        media?: {
            id: number;
            file_name: string;
            mime_type: string;
            path: string;
            paths?: {
                blur?: string;
                thumbnail?: string;
                medium?: string;
                large?: string;
            };
            size: number;
            url: string;
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
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    // Get translation (prioritize Indonesian, fallback to English)
    const translation =
        announcement.translations?.id || announcement.translations?.en;

    if (!translation) return null;

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

    const priorityStyle = getPriorityStyle(announcement.priority);

    return (
        <Guest2>
            <Head title={meta?.title || translation.title} />

            <div className="min-h-screen bg-white py-12">
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
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/pengumuman">
                                        Pengumuman
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {translation.title}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8">
                            <Card>
                                <CardContent className="p-6">
                                    {/* Header */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            {/* Priority Badge */}
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${priorityStyle.bgColor} ${priorityStyle.color}`}
                                            >
                                                {priorityStyle.label}
                                            </span>

                                            {/* New Badge */}
                                            {announcement.isNew && (
                                                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                                                    BARU
                                                </span>
                                            )}

                                            {/* Date */}
                                            <time className="text-sm text-gray-500 flex items-center gap-1">
                                                <PiCalendarDuotone className="w-4 h-4" />
                                                {announcement.formatted_date}
                                            </time>
                                        </div>

                                        {/* Title */}
                                        <h1 className="text-3xl font-bold mb-4">
                                            {translation.title}
                                        </h1>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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

                                    {/* Featured Image with Preloader */}
                                    {announcement.media?.path && (
                                        <div className="mb-8 relative rounded-lg overflow-hidden">
                                            {/* Blur placeholder */}
                                            <img
                                                src={
                                                    announcement.media?.paths
                                                        ?.blur ||
                                                    "/placeholder.svg"
                                                }
                                                alt={translation.title}
                                                width={400}
                                                height={200}
                                                className={`w-full h-[400px] object-cover absolute transition-opacity duration-500 ${
                                                    imageLoaded
                                                        ? "opacity-0"
                                                        : "opacity-100"
                                                }`}
                                            />
                                            {/* Main image */}
                                            <img
                                                src={announcement.media.path}
                                                alt={translation.title}
                                                width={400}
                                                height={200}
                                                loading="lazy"
                                                className="w-full h-[400px] object-cover"
                                                onLoad={() =>
                                                    setImageLoaded(true)
                                                }
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div
                                        className="prose prose-lg max-w-none mb-8"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                translation.content ||
                                                translation.excerpt ||
                                                "Tidak ada konten tersedia.",
                                        }}
                                    />

                                    {/* Action Button */}
                                    {announcement.action && (
                                        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="text-center">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                    Tindak Lanjut
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    {announcement.action
                                                        .type === "download" &&
                                                        "Unduh dokumen terkait"}
                                                    {announcement.action
                                                        .type === "view" &&
                                                        "Lihat informasi lebih lanjut"}
                                                    {announcement.action
                                                        .type === "register" &&
                                                        "Daftar atau ikuti kegiatan ini"}
                                                </p>
                                                <a
                                                    href={
                                                        announcement.action.url
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
                                                >
                                                    {announcement.action
                                                        .type ===
                                                        "download" && (
                                                        <PiDownloadDuotone className="w-5 h-5" />
                                                    )}
                                                    {announcement.action
                                                        .type === "view" && (
                                                        <PiEyeDuotone className="w-5 h-5" />
                                                    )}
                                                    {announcement.action
                                                        .type ===
                                                        "register" && (
                                                        <PiCheckCircleDuotone className="w-5 h-5" />
                                                    )}
                                                    {announcement.action.label}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* Share Buttons */}
                                    <div className="pt-6 border-t">
                                        <ShareButtons
                                            url={window.location.href}
                                            title={translation.title}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4">
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Pengumuman Terkait
                                    </h2>
                                    <div className="text-sm text-gray-500">
                                        Belum ada pengumuman terkait
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Back to List */}
                    <div className="mt-8 text-center">
                        <Link
                            href="/pengumuman"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                        >
                            ← Kembali ke Daftar Pengumuman
                        </Link>
                    </div>
                </div>
            </div>
        </Guest2>
    );
}
