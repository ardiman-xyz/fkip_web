import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { MediaModal } from "@/Components/MediaModal";
import { Media } from "@/types/app";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export const OrganizationStructure = () => {
    const [selectedImage, setSelectedImage] = useState<Media | null>(null);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const fetchStructure = async () => {
        try {
            const response = await axios.get(
                route("admin.about-us.structure.get")
            );
            if (response.data.status) {
                setSelectedImage(response.data.data);
            }
        } catch (error) {
            toast.error("Gagal memuat data struktur organisasi");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchStructure();
    }, []);

    const handleSave = async () => {
        if (!selectedImage) {
            toast.error("Pilih gambar terlebih dahulu");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(
                route("admin.about-us.structure.update"),
                {
                    organization_structure_id: selectedImage.id,
                }
            );

            if (response.data.status) {
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error("Gagal menyimpan perubahan");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Struktur Organisasi</CardTitle>
                <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading && (
                        <Loader className="size-4 mr-2 animate-spin" />
                    )}
                    {isLoading ? "Menyimpan..." : "Simpan"}
                </Button>
            </CardHeader>
            <CardContent>
                {isFetching ? (
                    <div className="flex justify-center items-center h-48">
                        <Loader className="size-8 animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-4">
                        {selectedImage ? (
                            <div className="relative group">
                                <img
                                    src={selectedImage.path}
                                    alt="Struktur Organisasi"
                                    className="w-full md:h-[600px] h-[400px] object-contain rounded-lg bg-gray-100"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            setIsMediaModalOpen(true)
                                        }
                                    >
                                        Ganti Gambar
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => setSelectedImage(null)}
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <Button
                                variant="outline"
                                onClick={() => setIsMediaModalOpen(true)}
                                className="w-full h-48"
                            >
                                Pilih Gambar
                            </Button>
                        )}

                        <p className="text-sm text-muted-foreground">
                            Rekomendasi ukuran gambar: 1200x800 pixel
                        </p>
                    </div>
                )}
            </CardContent>

            <MediaModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onSelect={(media) => {
                    setSelectedImage(media);
                    setIsMediaModalOpen(false);
                }}
            />
        </Card>
    );
};
