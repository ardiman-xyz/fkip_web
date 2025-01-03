import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PiPlusBold, PiPencilSimpleBold, PiTrashBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { LeaderFormDialog } from "../_components/LeaderFormDialog";
import { Leader } from "../_types/leader";
import { toast } from "sonner";
import axios from "axios";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { LeaderTableItem } from "../_components/LeaderTableItem";
import { ConfirmDialog } from "../_components/ConfirmDialog";

export const Staff = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [leaders, setStaff] = useState<Leader[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

    // const fetchStaff = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.get(route("admin.leaders.get"));
    //         if (response.data.status) {
    //             setStaff(response.data.data);
    //         }
    //     } catch (error) {
    //         toast.error("Gagal memuat data pimpinan");
    //         console.error("Failed to fetch leaders:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchStaff();
    // }, []);

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            const response = await axios.delete(
                route("admin.leaders.destroy", deleteId)
            );

            if (response.data.status) {
                setStaff((prev) =>
                    prev.filter((leader) => leader.id !== deleteId)
                );
                toast.success(response.data.message || "Data berhasil dihapus");
            }
        } catch (error) {
            toast.error("Gagal menghapus data");
            console.error(error);
        } finally {
            setShowDeleteConfirm(false);
            setDeleteId(null);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Tenaga Kependidikan</CardTitle>
                <Button onClick={() => setShowForm(true)}>Tambah</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>NIP/NIDN</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="w-[100px] text-right">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody></TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
