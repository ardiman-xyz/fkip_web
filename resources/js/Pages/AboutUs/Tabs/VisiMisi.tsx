import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PiPlusBold, PiPencilSimpleBold, PiTrashBold } from "react-icons/pi";
import { TiptapEditor } from "@/Components/TiptapEditor";
import { useState } from "react";

export const VisiMisi = () => {
    const [visi, setVisi] = useState(
        "<p>Visi fakultas akan ditampilkan disini...</p>"
    );
    const [misi, setMisi] = useState(
        "<p>Misi fakultas akan ditampilkan disini...</p>"
    );

    // Hapus state isEditing karena tidak diperlukan
    // Editor selalu bisa diedit

    const handleVisiChange = (content: string) => {
        setVisi(content);
    };

    const handleMisiChange = (content: string) => {
        setMisi(content);
    };

    const handleSave = async () => {
        try {
            // Di sini nanti implementasi save ke backend
            console.log("Saving:", { visi, misi });
            // await axios.post('/api/about/visi-misi', { visi, misi });
            // toast.success('Berhasil menyimpan perubahan');
        } catch (error) {
            console.error("Failed to save:", error);
            // toast.error('Gagal menyimpan perubahan');
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Visi & Misi</CardTitle>
                <Button onClick={handleSave}>Simpan</Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {/* Visi Section */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Visi</h3>
                        <div className="rounded-lg ">
                            <TiptapEditor
                                content={visi}
                                onChange={handleVisiChange}
                            />
                        </div>
                    </div>

                    {/* Misi Section */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Misi</h3>
                        <div className="rounded-lg ">
                            <TiptapEditor
                                content={misi}
                                onChange={handleMisiChange}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default VisiMisi;
