import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { TiptapEditor } from "@/Components/TiptapEditor";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Loader } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { isEditorEmpty } from "@/lib/utils";
import { AboutContent } from "../_types";

export const VisiMisi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [content, setContent] = useState<AboutContent>({
        id: {
            vision: "",
            mission: "",
        },
        en: {
            vision: "",
            mission: "",
        },
    });

    const fetchContent = async () => {
        try {
            const response = await axios.get<{
                status: boolean;
                data: AboutContent;
            }>(route("admin.about-us.vision-mission.show"));

            if (response.data.status) {
                setContent(response.data.data);
            }
        } catch (error) {
            toast.error("Gagal memuat data Visi & Misi");
            console.error("Failed to fetch content:", error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const validateContent = (): boolean => {
        if (isEditorEmpty(content.id.vision)) {
            toast.error("Visi dalam Bahasa Indonesia wajib diisi");
            return false;
        }
        if (isEditorEmpty(content.id.mission)) {
            toast.error("Misi dalam Bahasa Indonesia wajib diisi");
            return false;
        }

        if (
            !isEditorEmpty(content.en.vision) &&
            isEditorEmpty(content.en.mission)
        ) {
            toast.error(
                "Misi dalam Bahasa Inggris harus diisi jika Visi diisi"
            );
            return false;
        }
        if (
            isEditorEmpty(content.en.vision) &&
            !isEditorEmpty(content.en.mission)
        ) {
            toast.error(
                "Visi dalam Bahasa Inggris harus diisi jika Misi diisi"
            );
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validateContent()) return;
        setIsLoading(true);
        try {
            const response = await axios.post(
                route("admin.about-us.vision-mission.update"),
                content
            );

            if (response.data.status) {
                toast.success(
                    response.data.message || "Berhasil menyimpan perubahan"
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<any>;

                if (axiosError.response?.status === 422) {
                    const validationErrors = axiosError.response.data.errors;
                    Object.values(validationErrors).forEach((messages: any) => {
                        messages.forEach((message: string) => {
                            toast.error(message);
                        });
                    });
                } else {
                    toast.error(
                        axiosError.response?.data?.message ||
                            "Terjadi kesalahan saat menyimpan perubahan"
                    );
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Visi & Misi</CardTitle>
                <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader className="size-4 mr-2 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        "Simpan Perubahan"
                    )}
                </Button>
            </CardHeader>
            <CardContent>
                {isFetching ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <Loader className="size-8 animate-spin" />
                    </div>
                ) : (
                    <Tabs defaultValue="id" className="w-full">
                        <TabsList>
                            <TabsTrigger value="id">Indonesia</TabsTrigger>
                            <TabsTrigger value="en">English</TabsTrigger>
                        </TabsList>

                        <TabsContent value="id" className="space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Visi</h3>
                                <div className="border rounded-lg p-4">
                                    <TiptapEditor
                                        content={content.id.vision}
                                        onChange={(value) =>
                                            setContent((prev) => ({
                                                ...prev,
                                                id: {
                                                    ...prev.id,
                                                    vision: value,
                                                },
                                            }))
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">Misi</h3>
                                <div className="border rounded-lg p-4">
                                    <TiptapEditor
                                        content={content.id.mission}
                                        onChange={(value) =>
                                            setContent((prev) => ({
                                                ...prev,
                                                id: {
                                                    ...prev.id,
                                                    mission: value,
                                                },
                                            }))
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="en" className="space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">
                                    Vision
                                </h3>
                                <div className="border rounded-lg p-4">
                                    <TiptapEditor
                                        content={content.en.vision}
                                        onChange={(value) =>
                                            setContent((prev) => ({
                                                ...prev,
                                                en: {
                                                    ...prev.en,
                                                    vision: value,
                                                },
                                            }))
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">
                                    Mission
                                </h3>
                                <div className="border rounded-lg p-4">
                                    <TiptapEditor
                                        content={content.en.mission}
                                        onChange={(value) =>
                                            setContent((prev) => ({
                                                ...prev,
                                                en: {
                                                    ...prev.en,
                                                    mission: value,
                                                },
                                            }))
                                        }
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                )}
            </CardContent>
        </Card>
    );
};

export default VisiMisi;
