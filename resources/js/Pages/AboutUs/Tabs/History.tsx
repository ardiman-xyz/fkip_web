import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Input } from "@/Components/ui/input";
import { TiptapEditor } from "@/Components/TiptapEditor";

import { History as HistoryType } from "../_types/history";

const historyFormSchema = z.object({
    is_active: z.number(),
    translations: z.object({
        id: z.object({
            language_id: z.number(),
            title: z.string().min(1, "Judul harus diisi"),
            content: z.string().min(1, "Konten harus diisi"),
        }),
        en: z.object({
            language_id: z.number(),
            title: z.string().min(1, "Title is required"),
            content: z.string().min(1, "Content is required"),
        }),
    }),
});

const History = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [history, setHistory] = useState<HistoryType | null>(null);
    const [formData, setFormData] = useState({
        is_active: true,
        translations: {
            id: {
                language_id: 1,
                title: "",
                content: "",
            },
            en: {
                language_id: 2,
                title: "",
                content: "",
            },
        },
    });

    const fetchHistory = async () => {
        try {
            const response = await axios.get(route("admin.histories.get"));
            if (response.data.status && response.data.data) {
                const historyData = response.data.data;
                setHistory(historyData);
                setFormData({
                    is_active: historyData.is_active,
                    translations: {
                        id: {
                            language_id: 1,
                            title: historyData.translations.id.title,
                            content: historyData.translations.id.content,
                        },
                        en: {
                            language_id: 2,
                            title: historyData.translations.en.title,
                            content: historyData.translations.en.content,
                        },
                    },
                });
            }
        } catch (error) {
            toast.error("Gagal memuat data sejarah");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const onSubmit = async () => {
        try {
            const validatedData = historyFormSchema.parse(formData);
            setIsLoading(true);

            let response;
            if (history) {
                response = await axios.put(
                    route("admin.histories.update", history.id),
                    validatedData
                );
            } else {
                response = await axios.post(
                    route("admin.histories.store"),
                    validatedData
                );
            }

            if (response.data.status) {
                toast.success(response.data.message);
                fetchHistory();
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach((err) => toast.error(err.message));
            } else if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "Terjadi kesalahan"
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center h-48">
                <Loader className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <>
            <Head title="Sejarah Fakultas" />

            <Card>
                <CardHeader>
                    <CardTitle>Sejarah Fakultas</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="id">
                        <TabsList>
                            <TabsTrigger value="id">Indonesia</TabsTrigger>
                            <TabsTrigger value="en">English</TabsTrigger>
                        </TabsList>

                        <TabsContent value="id" className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Judul
                                </label>
                                <Input
                                    value={formData.translations.id.title}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            translations: {
                                                ...prev.translations,
                                                id: {
                                                    ...prev.translations.id,
                                                    title: e.target.value,
                                                },
                                            },
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Konten
                                </label>
                                <TiptapEditor
                                    content={formData.translations.id.content}
                                    onChange={(content) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            translations: {
                                                ...prev.translations,
                                                id: {
                                                    ...prev.translations.id,
                                                    content: content,
                                                },
                                            },
                                        }))
                                    }
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="en" className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Title
                                </label>
                                <Input
                                    value={formData.translations.en.title}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            translations: {
                                                ...prev.translations,
                                                en: {
                                                    ...prev.translations.en,
                                                    title: e.target.value,
                                                },
                                            },
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Content
                                </label>
                                <TiptapEditor
                                    content={formData.translations.en.content}
                                    onChange={(content) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            translations: {
                                                ...prev.translations,
                                                en: {
                                                    ...prev.translations.en,
                                                    content: content,
                                                },
                                            },
                                        }))
                                    }
                                />
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-end mt-6">
                        <Button onClick={onSubmit} disabled={isLoading}>
                            {isLoading && (
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {history ? "Update" : "Simpan"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default History;
