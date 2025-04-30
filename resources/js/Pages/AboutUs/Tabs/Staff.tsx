// Staff.tsx
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

import { Staff as StaffType } from "../_types/staff";
import { StaffTableItem } from "../_components/StaffTableItem";
import { StaffFormDialog } from "../_components/StaffFormDialog";
import { ConfirmDialog } from "../_components/ConfirmDialog";

export const Staff = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [staffMembers, setStaffMembers] = useState<StaffType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<StaffType | null>(null);

    const fetchStaff = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(route("admin.staff.get"));

            if (response.data.status) {
                setStaffMembers(response.data.data);
            }
        } catch (error) {
            toast.error("Gagal memuat data tenaga kependidikan");
            console.error("Failed to fetch staff:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleDelete = async () => {
        if (!deleteId) return;

        setIsLoadingDelete(true);

        try {
            const response = await axios.delete(
                route("admin.staff.destroy", deleteId)
            );

            if (response.data.status) {
                setStaffMembers((prev) =>
                    prev.filter((staff) => staff.id !== deleteId)
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

    const handleEdit = (data: StaffType) => {
        setSelectedStaff(data);
        setShowForm(true);
    };

    const handleSuccess = (data: StaffType) => {
        if (selectedStaff) {
            setStaffMembers((prev) =>
                prev.map((item) => (item.id === data.id ? data : item))
            );
        } else {
            setStaffMembers((prev) => [data, ...prev]);
        }
        setSelectedStaff(null);
        setShowForm(false);
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
                            <TableHead>NIP</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="w-[100px] text-right">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {staffMembers.map((item, index) => (
                            <StaffTableItem
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

            <StaffFormDialog
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false);
                    setSelectedStaff(null);
                }}
                onSuccess={handleSuccess}
                initialData={selectedStaff}
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
