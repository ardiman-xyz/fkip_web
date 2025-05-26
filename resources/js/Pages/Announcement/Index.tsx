// File: resources/js/Pages/Announcement/Index.tsx

import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { toast } from "sonner";
import axios from "axios";
import AnnouncementHeader from "./_components/AnnouncementHeader";
import AnnouncementTableRow from "./_components/AnnouncementTableRow";
import { AnnouncementIndexProps, Announcement } from "./_types/announcement";

export default function Index({
    announcements: initialAnnouncements = [],
}: AnnouncementIndexProps) {
    const [announcements, setAnnouncements] =
        useState<Announcement[]>(initialAnnouncements);
    const [deletingIds, setDeletingIds] = useState<number[]>([]);

    const [togglingPinIds, setTogglingPinIds] = useState<number[]>([]);

    const handleDelete = async (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
            try {
                // Set loading state
                setDeletingIds((prev) => [...prev, id]);

                const response = await axios.delete(
                    route("admin.announcements.destroy", id)
                );

                if (response.data.status) {
                    // Real-time update: Remove from UI immediately
                    setAnnouncements((prev) =>
                        prev.filter((announcement) => announcement.id !== id)
                    );
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const errorMessage =
                        error.response?.data?.message ||
                        "Gagal menghapus pengumuman";
                    toast.error(errorMessage);
                } else {
                    toast.error("Terjadi kesalahan tidak terduga");
                }
            } finally {
                // Remove loading state
                setDeletingIds((prev) =>
                    prev.filter((deletingId) => deletingId !== id)
                );
            }
        }
    };

    // Tambahkan fungsi ini di Index.tsx
    const handlePin = async (
        id: number,
        data: { pinned_start_date: string; pinned_end_date: string }
    ) => {
        try {
            setTogglingPinIds((prev) => [...prev, id]);

            const response = await axios.patch(
                route("admin.announcements.toggle-pin", id),
                {
                    is_pinned: true,
                    pinned_start_date: data.pinned_start_date,
                    pinned_end_date: data.pinned_end_date,
                }
            );

            if (response.data.status) {
                setAnnouncements((prev) =>
                    prev.map((announcement) =>
                        announcement.id === id
                            ? {
                                  ...announcement,
                                  is_pinned: true,
                                  pinned_start_date: data.pinned_start_date,
                                  pinned_end_date: data.pinned_end_date,
                              }
                            : announcement
                    )
                );
                toast.success("Pengumuman berhasil di-pin");
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage =
                    error.response?.data?.message || "Gagal pin pengumuman";
                toast.error(errorMessage);
            } else {
                toast.error("Terjadi kesalahan tidak terduga");
            }
        } finally {
            setTogglingPinIds((prev) =>
                prev.filter((togglingId) => togglingId !== id)
            );
        }
    };

    const handleUnpin = async (id: number) => {
        try {
            setTogglingPinIds((prev) => [...prev, id]);

            const response = await axios.patch(
                route("admin.announcements.toggle-pin", id),
                { is_pinned: false }
            );

            if (response.data.status) {
                setAnnouncements((prev) =>
                    prev.map((announcement) =>
                        announcement.id === id
                            ? {
                                  ...announcement,
                                  is_pinned: false,
                                  pinned_start_date: null,
                                  pinned_end_date: null,
                              }
                            : announcement
                    )
                );
                toast.success("Pengumuman berhasil di-unpin");
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage =
                    error.response?.data?.message || "Gagal unpin pengumuman";
                toast.error(errorMessage);
            } else {
                toast.error("Terjadi kesalahan tidak terduka");
            }
        } finally {
            setTogglingPinIds((prev) =>
                prev.filter((togglingId) => togglingId !== id)
            );
        }
    };
    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-black">Kelola Pengumuman</h2>}
        >
            <Head title="Kelola Pengumuman" />

            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <Card>
                    <AnnouncementHeader />
                    <CardContent>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Prioritas</TableHead>
                                        <TableHead>Views</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead className="w-[70px]">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {announcements.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center py-8"
                                            >
                                                Belum ada pengumuman
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        announcements.map((announcement) => (
                                            <AnnouncementTableRow
                                                key={announcement.id}
                                                announcement={announcement}
                                                onDelete={handleDelete}
                                                onPin={handlePin}
                                                onUnpin={handleUnpin}
                                                isDeleting={deletingIds.includes(
                                                    announcement.id
                                                )}
                                                isTogglingPin={togglingPinIds.includes(
                                                    announcement.id
                                                )}
                                            />
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
