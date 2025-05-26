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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
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
import {
    PiArrowLeftDuotone,
    PiMegaphoneDuotone,
    PiImageDuotone,
    PiArchiveDuotone,
    PiCheckFatDuotone,
    PiFlagDuotone,
} from "react-icons/pi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import InfoTooltip from "@/Components/InfoTooltip";

// Form validation schema
const announcementSchema = z.object({
    title_id: z
        .string()
        .min(1, "Judul bahasa Indonesia wajib diisi")
        .max(255, "Judul maksimal 255 karakter"),
    content_id: z.string().optional(),
    excerpt_id: z
        .string()
        .max(500, "Ringkasan maksimal 500 karakter")
        .optional(),
    title_en: z
        .string()
        .min(1, "English title is required")
        .max(255, "Title maximum 255 characters"),
    content_en: z.string().optional(),
    excerpt_en: z
        .string()
        .max(500, "Excerpt maximum 500 characters")
        .optional(),
    status: z.enum(["draft", "published", "archived"]),
    priority: z.enum(["low", "normal", "high", "urgent"]),
    is_featured: z.boolean().default(false),
    is_pinned: z.boolean().default(false),
    media_id: z.number().optional(),
    published_at: z.string().optional(),
    pinned_start_date: z.string().optional(),
    pinned_end_date: z.string().optional(),
    action_type: z.enum(["download", "view", "register"]).optional(),
    action_url: z.string().url("URL tidak valid").optional().or(z.literal("")),
    action_label: z.string().max(100, "Label maksimal 100 karakter").optional(),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

interface Media {
    id: number;
    name: string;
    path: string;
    paths?: any;
}

interface AnnouncementAction {
    type: "download" | "view" | "register";
    url: string;
    label: string;
}

interface AnnouncementTranslation {
    title: string;
    content: string;
    excerpt: string;
}

interface AnnouncementTranslations {
    id: AnnouncementTranslation;
    en: AnnouncementTranslation;
}

interface AnnouncementForEdit {
    id: number;
    status: "draft" | "published" | "archived";
    priority: "low" | "normal" | "high" | "urgent";
    is_featured: boolean;
    is_pinned: boolean;
    published_at?: string;
    pinned_start_date?: string;
    pinned_end_date?: string;
    action?: AnnouncementAction;
    translations: AnnouncementTranslations;
    media?: Media;
    tags: number[];
}

interface AnnouncementEditProps {
    announcement: AnnouncementForEdit;
}

export default function Edit({ announcement }: AnnouncementEditProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(
        announcement.media || null
    );
    const [activeTab, setActiveTab] = useState("indonesian");

    const form = useForm<AnnouncementFormData>({
        resolver: zodResolver(announcementSchema),
        defaultValues: {
            title_id: announcement.translations?.id?.title || "",
            content_id: announcement.translations?.id?.content || "",
            excerpt_id: announcement.translations?.id?.excerpt || "",
            title_en: announcement.translations?.en?.title || "",
            content_en: announcement.translations?.en?.content || "",
            excerpt_en: announcement.translations?.en?.excerpt || "",
            status: announcement.status,
            priority: announcement.priority,
            is_featured: announcement.is_featured,
            is_pinned: announcement.is_pinned,
            published_at: announcement.published_at || "",
            pinned_start_date: announcement.pinned_start_date || "",
            pinned_end_date: announcement.pinned_end_date || "",
            action_type: announcement.action?.type || undefined,
            action_url: announcement.action?.url || "",
            action_label: announcement.action?.label || "",
        },
    });

    const watchIsPinned = form.watch("is_pinned");

    const onSubmit = async (data: AnnouncementFormData, status?: string) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            const formData = {
                status: status || data.status,
                priority: data.priority,
                is_featured: data.is_featured,
                is_pinned: data.is_pinned,
                published_at: data.published_at,
                pinned_start_date: data.pinned_start_date,
                pinned_end_date: data.pinned_end_date,
                media_id: selectedMedia?.id || null,
                translations: {
                    id: {
                        title: data.title_id,
                        content: data.content_id,
                        excerpt: data.excerpt_id,
                    },
                    en: {
                        title: data.title_en,
                        content: data.content_en,
                        excerpt: data.excerpt_en,
                    },
                },
                action:
                    data.action_type && data.action_url
                        ? {
                              type: data.action_type,
                              url: data.action_url,
                              label: data.action_label || "Lihat Selengkapnya",
                          }
                        : null,
            };

            const response = await window.axios.put(
                route("admin.announcements.update", announcement.id),
                formData
            );

            if (response.data.status) {
                toast.success(response.data.message);
                router.get(route("admin.announcements.index"));
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage =
                    error.response?.data?.message ||
                    "Gagal mengupdate pengumuman";
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
                        Edit Pengumuman
                    </h2>
                </div>
            }
        >
            <Head title="Edit Pengumuman" />

            <Form {...form}>
                <div className="flex flex-col gap-4 p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                <div className="flex items-center gap-x-2">
                                    <PiMegaphoneDuotone className="size-7" />
                                    <span>Edit Pengumuman</span>
                                </div>
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button disabled={isSubmitting}>
                                                Update Sebagai
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
                                                Update & Publikasikan
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
                                                Update sebagai Draft
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
                                    {/* Multi-Language Tabs */}
                                    <Tabs
                                        value={activeTab}
                                        onValueChange={setActiveTab}
                                    >
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger
                                                value="indonesian"
                                                className="flex items-center gap-2"
                                            >
                                                <PiFlagDuotone className="size-4" />
                                                Indonesian
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="english"
                                                className="flex items-center gap-2"
                                            >
                                                <PiFlagDuotone className="size-4" />
                                                English
                                            </TabsTrigger>
                                        </TabsList>

                                        {/* Indonesian Content */}
                                        <TabsContent
                                            value="indonesian"
                                            className="space-y-6"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="title_id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Judul Pengumuman *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Masukkan judul pengumuman dalam bahasa Indonesia"
                                                                className="text-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="excerpt_id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Ringkasan
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                {...field}
                                                                placeholder="Ringkasan singkat pengumuman dalam bahasa Indonesia"
                                                                rows={3}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="content_id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Konten
                                                        </FormLabel>
                                                        <FormControl>
                                                            <TiptapEditor
                                                                content={
                                                                    field.value ||
                                                                    ""
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
                                        </TabsContent>

                                        {/* English Content */}
                                        <TabsContent
                                            value="english"
                                            className="space-y-6"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="title_en"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Announcement Title *
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter announcement title in English"
                                                                className="text-lg"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="excerpt_en"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Summary
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                {...field}
                                                                placeholder="Brief summary of the announcement in English"
                                                                rows={3}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="content_en"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Content
                                                        </FormLabel>
                                                        <FormControl>
                                                            <TiptapEditor
                                                                content={
                                                                    field.value ||
                                                                    ""
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
                                        </TabsContent>
                                    </Tabs>
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
                                                    value={field.value}
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
                                                    value={field.value}
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

                                    {/* Published Date */}
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
                                                        <div className="flex items-center gap-2">
                                                            <FormLabel>
                                                                Featured
                                                            </FormLabel>
                                                            <InfoTooltip content="Featured: Pengumuman akan ditampilkan di section unggulan di website dengan highlight khusus dan prioritas tampil lebih tinggi." />
                                                        </div>
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
                                                        <div className="flex items-center gap-2">
                                                            <FormLabel>
                                                                Pinned
                                                            </FormLabel>
                                                            <InfoTooltip content="Pinned: Pengumuman akan muncul sebagai popup/banner di atas website dalam periode waktu tertentu. Sangat mencolok dan langsung terlihat pengunjung." />
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            Tampilkan sebagai
                                                            popup/banner
                                                        </p>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Pinned Date Range */}
                                    {watchIsPinned && (
                                        <div className="space-y-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                            <Label className="text-sm font-medium text-orange-800">
                                                Periode Pinned
                                            </Label>

                                            <FormField
                                                control={form.control}
                                                name="pinned_start_date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm">
                                                            Tanggal Mulai
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
                                                name="pinned_end_date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm">
                                                            Tanggal Berakhir
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
                                        </div>
                                    )}

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
                </div>
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
