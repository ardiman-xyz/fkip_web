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

    console.info(announcements);

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
                                        <TableHead>Tags</TableHead>
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
                                                isDeleting={deletingIds.includes(
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
