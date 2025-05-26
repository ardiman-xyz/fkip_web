// File: resources/js/Pages/Admin/Announcement/Create.tsx

import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Checkbox } from "@/Components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { TiptapEditor } from "@/Components/TiptapEditor";
import { MediaModal } from "@/Components/MediaModal";
import { toast } from "sonner";
import axios from "axios";
import {
    PiArrowLeftDuotone,
    PiMegaphoneDuotone,
    PiImageDuotone,
    PiArchiveDuotone,
    PiCheckFatDuotone,
} from "react-icons/pi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

// Form validation schema
const announcementSchema = z.object({
    title: z
        .string()
        .min(1, "Judul wajib diisi")
        .max(255, "Judul maksimal 255 karakter"),
    content: z.string().optional(),
    excerpt: z.string().max(500, "Ringkasan maksimal 500 karakter").optional(),
    status: z.enum(["draft", "published", "archived"]),
    priority: z.enum(["low", "normal", "high", "urgent"]),
    is_featured: z.boolean().default(false),
    is_pinned: z.boolean().default(false),
    media_id: z.number().optional(),
    published_at: z.string().optional(),
    expires_at: z.string().optional(),
    action_type: z.enum(["download", "view", "register"]).optional(),
    action_url: z.string().url("URL tidak valid").optional(),
    action_label: z.string().max(100, "Label maksimal 100 karakter").optional(),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

interface Media {
    id: number;
    name: string;
    path: string;
    paths?: any;
}

export default function Create() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

    const form = useForm<AnnouncementFormData>({
        resolver: zodResolver(announcementSchema),
        defaultValues: {
            title: "",
            content: "",
            excerpt: "",
            status: "draft",
            priority: "normal",
            is_featured: false,
            is_pinned: false,
            published_at: "",
            expires_at: "",
            action_type: undefined,
            action_url: "",
            action_label: "",
        },
    });

    const onSubmit = async (data: AnnouncementFormData, status?: string) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            // Prepare form data
            const formData = {
                ...data,
                status: status || data.status,
                media_id: selectedMedia?.id || null,
                // Only include action if all fields are filled
                action:
                    data.action_type && data.action_url
                        ? {
                              type: data.action_type,
                              url: data.action_url,
                              label: data.action_label || "Lihat Selengkapnya",
                          }
                        : null,
            };

            const response = await axios.post(
                route("admin.announcements.store"),
                formData
            );

            if (response.data.status) {
                toast.success(response.data.message);
                router.get(route("admin.announcements.index"));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message ||
                    "Gagal menyimpan pengumuman";
                toast.error(errorMessage);

                if (error.response?.status === 422) {
                    const errors = error.response.data.errors;
                    Object.keys(errors).forEach((key) => {
                        form.setError(key as keyof AnnouncementFormData, {
                            type: "manual",
                            message: errors[key][0],
                        });
                    });
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={() =>
                            router.get(route("admin.announcements.index"))
                        }
                        size="icon"
                    >
                        <PiArrowLeftDuotone className="size-4" />
                    </Button>
                    <h2 className="text-2xl font-black ml-2">
                        Buat Pengumuman
                    </h2>
                </div>
            }
        >
            <Head title="Buat Pengumuman" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => onSubmit(data))}
                    className="flex flex-col gap-4 p-4"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                <div className="flex items-center gap-x-2">
                                    <PiMegaphoneDuotone className="size-7" />
                                    <span>Pengumuman Baru</span>
                                </div>
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button disabled={isSubmitting}>
                                                Simpan Sebagai
                                                <ChevronDown className="size-4 ml-1" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    form.handleSubmit((data) =>
                                                        onSubmit(
                                                            data,
                                                            "published"
                                                        )
                                                    )();
                                                }}
                                            >
                                                <PiCheckFatDuotone className="size-4 mr-2" />
                                                Simpan & Publikasikan
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    form.handleSubmit((data) =>
                                                        onSubmit(data, "draft")
                                                    )();
                                                }}
                                            >
                                                <PiArchiveDuotone className="size-4 mr-2" />
                                                Simpan sebagai Draft
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-6">
                                {/* Main Content */}
                                <div className="col-span-2 space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Judul Pengumuman *
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Masukkan judul pengumuman"
                                                        className="text-lg"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="excerpt"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ringkasan</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Ringkasan singkat pengumuman (opsional)"
                                                        rows={3}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Konten</FormLabel>
                                                <FormControl>
                                                    <TiptapEditor
                                                        content={
                                                            field.value || ""
                                                        }
                                                        onChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">
                                        Pengaturan Pengumuman
                                    </h3>

                                    {/* Featured Image */}
                                    <div>
                                        <Label className="text-sm font-medium">
                                            Gambar Unggulan
                                        </Label>
                                        <div className="mt-2">
                                            {selectedMedia ? (
                                                <div className="relative group">
                                                    <img
                                                        src={selectedMedia.path}
                                                        alt="Featured"
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="secondary"
                                                            onClick={() =>
                                                                setIsMediaModalOpen(
                                                                    true
                                                                )
                                                            }
                                                            type="button"
                                                        >
                                                            Ganti
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => {
                                                                setSelectedMedia(
                                                                    null
                                                                );
                                                                form.setValue(
                                                                    "media_id",
                                                                    undefined
                                                                );
                                                            }}
                                                            type="button"
                                                        >
                                                            Hapus
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsMediaModalOpen(
                                                            true
                                                        )
                                                    }
                                                    className="w-full h-32"
                                                    type="button"
                                                >
                                                    <PiImageDuotone className="size-8 mr-2" />
                                                    Pilih Gambar
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="draft">
                                                            Draft
                                                        </SelectItem>
                                                        <SelectItem value="published">
                                                            Published
                                                        </SelectItem>
                                                        <SelectItem value="archived">
                                                            Archived
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Priority */}
                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prioritas</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih prioritas" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="low">
                                                            Low
                                                        </SelectItem>
                                                        <SelectItem value="normal">
                                                            Normal
                                                        </SelectItem>
                                                        <SelectItem value="high">
                                                            High
                                                        </SelectItem>
                                                        <SelectItem value="urgent">
                                                            Urgent
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Checkboxes */}
                                    <div className="space-y-3">
                                        <FormField
                                            control={form.control}
                                            name="is_featured"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            Featured
                                                        </FormLabel>
                                                        <p className="text-sm text-muted-foreground">
                                                            Tampilkan di section
                                                            unggulan
                                                        </p>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="is_pinned"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={
                                                                field.value
                                                            }
                                                            onCheckedChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                            Pinned
                                                        </FormLabel>
                                                        <p className="text-sm text-muted-foreground">
                                                            Sematkan di bagian
                                                            atas
                                                        </p>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Dates */}
                                    <FormField
                                        control={form.control}
                                        name="published_at"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Tanggal Publikasi
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="datetime-local"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="expires_at"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Tanggal Kadaluarsa
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="datetime-local"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Action Button */}
                                    <div className="space-y-3">
                                        <Label className="text-sm font-medium">
                                            Tombol Aksi (Opsional)
                                        </Label>

                                        <FormField
                                            control={form.control}
                                            name="action_type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        value={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Pilih tipe aksi" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="view">
                                                                Lihat
                                                            </SelectItem>
                                                            <SelectItem value="download">
                                                                Download
                                                            </SelectItem>
                                                            <SelectItem value="register">
                                                                Daftar
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="action_url"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="https://example.com"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="action_label"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Label tombol (opsional)"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>

            <MediaModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onSelect={(media) => {
                    setSelectedMedia(media);
                    form.setValue("media_id", media.id);
                    setIsMediaModalOpen(false);
                }}
            />
        </AuthenticatedLayout>
    );
}
