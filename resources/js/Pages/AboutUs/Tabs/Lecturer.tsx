// Lecturer.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import { Lecturer as LecturerType } from "../_types/lecturer";
import { LecturerTableItem } from "../_components/LecturerTableItem";
import { LecturerFormDialog } from "../_components/LecturerFormDialog";
import { ConfirmDialog } from "../_components/ConfirmDialog";
import { LecturerSyncButton } from "../_components/LecturerSyncButton";

export const Lecturer = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [lecturers, setLecturers] = useState<LecturerType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [selectedLecturer, setSelectedLecturer] =
        useState<LecturerType | null>(null);

    const fetchLecturers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(route("admin.lecturers.get"));

            if (response.data.status) {
                setLecturers(response.data.data);
            }
        } catch (error) {
            toast.error("Gagal memuat data dosen");
            console.error("Failed to fetch lecturers:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLecturers();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsLoadingDelete(true);

        try {
            const response = await axios.delete(
                route("admin.lecturers.destroy", deleteId)
            );

            if (response.data.status) {
                setLecturers((prev) =>
                    prev.filter((lecturer) => lecturer.id !== deleteId)
                );
                toast.success(response.data.message || "Data berhasil dihapus");
            }
        } catch (error) {
            toast.error("Gagal menghapus data");
            console.error(error);
        } finally {
            setShowDeleteConfirm(false);
            setDeleteId(null);
            setIsLoadingDelete(false);
        }
    };

    const handleEdit = (data: LecturerType) => {
        setSelectedLecturer(data);
        setShowForm(true);
    };

    const handleSuccess = (data: LecturerType) => {
        if (selectedLecturer) {
            setLecturers((prev) =>
                prev.map((item) => (item.id === data.id ? data : item))
            );
        } else {
            setLecturers((prev) => [data, ...prev]);
        }
        setSelectedLecturer(null);
        setShowForm(false);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Dosen FKIP</CardTitle>
                <div className="flex items-center gap-2">
                    <LecturerSyncButton onSyncComplete={fetchLecturers} />
                    <Button onClick={() => setShowForm(true)}>
                        Tambah Dosen
                    </Button>
                </div>
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
                    <TableBody>
                        {lecturers.map((item, index) => (
                            <LecturerTableItem
                                key={item.id}
                                index={index}
                                data={item}
                                onEdit={handleEdit}
                                onDelete={(id) => {
                                    setDeleteId(id);
                                    setShowDeleteConfirm(true);
                                }}
                            />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            <LecturerFormDialog
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false);
                    setSelectedLecturer(null);
                }}
                onSuccess={handleSuccess}
                initialData={selectedLecturer}
            />

            <ConfirmDialog
                isOpen={showDeleteConfirm}
                onClose={() => {
                    setShowDeleteConfirm(false);
                    setDeleteId(null);
                }}
                isLoading={isLoadingDelete}
                onConfirm={handleDelete}
            />
        </Card>
    );
};
