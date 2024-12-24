import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PlusCircle, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { useEffect, useState } from "react";
import { Switch } from "@/Components/ui/switch";
import { Accreditation as AccreditationType } from "../_types/accreditation";
import { AccreditationFormModal } from "../_components/ccreditationFormModal";
import axios from "axios";
import { toast } from "sonner";
import { AccreditationTableItem } from "../_components/AccreditationTableItem";

export const Accreditation = () => {
    const [accreditations, setAccreditations] = useState<AccreditationType[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchContent = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(route("admin.accreditation.get"));

            if (response.data.status) {
                setAccreditations(response.data.data);
            }
        } catch (error) {
            toast.error("Gagal memuat data Visi & Misi");
            console.error("Failed to fetch content:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    const handleClose = () => {
        setIsModalOpen(false);
        fetchContent();
    };

    const handleDeleteSuccess = (id: number) => {
        setAccreditations((prevAccreditations) =>
            prevAccreditations.filter(
                (accreditation) => accreditation.id !== id
            )
        );
    };

    const handleMoveUp = (id: number) => {
        setAccreditations((prevAccreditations) => {
            const index = prevAccreditations.findIndex(
                (item) => item.id === id
            );
            if (index <= 0) return prevAccreditations;

            const newAccreditations = [...prevAccreditations];
            [newAccreditations[index], newAccreditations[index - 1]] = [
                newAccreditations[index - 1],
                newAccreditations[index],
            ];

            return newAccreditations;
        });
    };

    const handleMoveDown = (id: number) => {
        setAccreditations((prevAccreditations) => {
            const index = prevAccreditations.findIndex(
                (item) => item.id === id
            );
            if (index === -1 || index === prevAccreditations.length - 1)
                return prevAccreditations;

            const newAccreditations = [...prevAccreditations];
            [newAccreditations[index], newAccreditations[index + 1]] = [
                newAccreditations[index + 1],
                newAccreditations[index],
            ];

            return newAccreditations;
        });
    };
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Sertifikat Akreditasi</CardTitle>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <PlusCircle className="size-4 mr-2" />
                        Tambah Sertifikat
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">
                                    Preview
                                </TableHead>
                                <TableHead>Judul</TableHead>
                                <TableHead>Deskripsi</TableHead>
                                <TableHead className="w-[100px]">
                                    Tahun
                                </TableHead>
                                <TableHead className="w-[100px]">
                                    Status
                                </TableHead>
                                <TableHead className="w-[150px]">
                                    Urutan
                                </TableHead>
                                <TableHead className="w-[100px] text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accreditations.map((accreditation, index) => (
                                <AccreditationTableItem
                                    key={accreditation.id}
                                    accreditation={accreditation}
                                    index={index}
                                    totalItems={accreditations.length}
                                    onStatusChange={(id, status) => {
                                        // Handle status change logic
                                    }}
                                    onMoveUp={handleMoveUp}
                                    onMoveDown={handleMoveDown}
                                    onDelete={(id) => handleDeleteSuccess(id)}
                                    fetchData={fetchContent}
                                />
                            ))}

                            {accreditations.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center py-10"
                                    >
                                        <p className="text-muted-foreground">
                                            Belum ada sertifikat akreditasi
                                        </p>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <AccreditationFormModal
                isOpen={isModalOpen}
                onClose={handleClose}
            />
        </>
    );
};
