import React from "react";
import { Head, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    PiMegaphoneDuotone,
    PiPlusDuotone,
    PiDotsThreeDuotone,
    PiPencilDuotone,
    PiTrashDuotone,
    PiStarDuotone,
    PiPingPongDuotone,
} from "react-icons/pi";

interface Announcement {
    id: number;
    title: string;
    status: "draft" | "published" | "archived";
    priority: "low" | "normal" | "high" | "urgent";
    is_featured: boolean;
    is_pinned: boolean;
    published_at: string | null;
    view_count: number;
    author: string;
    tags: string[];
    created_at: string;
}

interface Props {
    announcements: Announcement[];
}

export default function Index({ announcements = [] }: Props) {
    const getStatusBadge = (status: string) => {
        const colors = {
            draft: "bg-gray-100 text-gray-800",
            published: "bg-green-100 text-green-800",
            archived: "bg-red-100 text-red-800",
        };

        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                    colors[status as keyof typeof colors]
                }`}
            >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getPriorityBadge = (priority: string) => {
        const colors = {
            low: "bg-gray-100 text-gray-800",
            normal: "bg-blue-100 text-blue-800",
            high: "bg-orange-100 text-orange-800",
            urgent: "bg-red-100 text-red-800",
        };

        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                    colors[priority as keyof typeof colors]
                }`}
            >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
        );
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
            router.delete(route("admin.announcements.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-black">Kelola Pengumuman</h2>}
        >
            <Head title="Kelola Pengumuman" />

            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between text-2xl font-bold">
                            <div className="flex items-center gap-x-2">
                                <PiMegaphoneDuotone className="size-7" />
                                <span>Pengumuman</span>
                            </div>
                            <Button
                                onClick={() =>
                                    router.get(
                                        route("admin.announcements.create")
                                    )
                                }
                                className="flex items-center gap-2"
                            >
                                <PiPlusDuotone className="size-4" />
                                Buat Pengumuman
                            </Button>
                        </CardTitle>
                    </CardHeader>
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
                                            <TableRow key={announcement.id}>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            {announcement.is_pinned && (
                                                                <PiPingPongDuotone className="size-4 text-orange-500" />
                                                            )}
                                                            {announcement.is_featured && (
                                                                <PiStarDuotone className="size-4 text-yellow-500" />
                                                            )}
                                                            <span className="font-medium line-clamp-1">
                                                                {
                                                                    announcement.title
                                                                }
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-gray-500">
                                                            by{" "}
                                                            {
                                                                announcement.author
                                                            }
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        announcement.status
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {getPriorityBadge(
                                                        announcement.priority
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {announcement.tags
                                                            .slice(0, 2)
                                                            .map(
                                                                (
                                                                    tag,
                                                                    index
                                                                ) => (
                                                                    <Badge
                                                                        key={
                                                                            index
                                                                        }
                                                                        variant="outline"
                                                                        className="text-xs"
                                                                    >
                                                                        {tag}
                                                                    </Badge>
                                                                )
                                                            )}
                                                        {announcement.tags
                                                            .length > 2 && (
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                +
                                                                {announcement
                                                                    .tags
                                                                    .length - 2}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {announcement.view_count.toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {
                                                            announcement.created_at
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            >
                                                                <PiDotsThreeDuotone className="size-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    router.get(
                                                                        route(
                                                                            "admin.announcements.edit",
                                                                            announcement.id
                                                                        )
                                                                    )
                                                                }
                                                                className="cursor-pointer"
                                                            >
                                                                <PiPencilDuotone className="size-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        announcement.id
                                                                    )
                                                                }
                                                                className="cursor-pointer text-red-600"
                                                            >
                                                                <PiTrashDuotone className="size-4 mr-2" />
                                                                Hapus
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
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
