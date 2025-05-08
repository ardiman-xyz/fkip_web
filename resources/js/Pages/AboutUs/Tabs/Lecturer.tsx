// Lecturer.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import { Search } from "lucide-react";

import { Lecturer as LecturerType } from "../_types/lecturer";
import { LecturerTableItem } from "../_components/LecturerTableItem";
import { LecturerFormDialog } from "../_components/LecturerFormDialog";
import { ConfirmDialog } from "../_components/ConfirmDialog";
import { LecturerSyncButton } from "../_components/LecturerSyncButton";
import { PaginationWithControls } from "@/Components/pagination-with-controls";

export const Lecturer = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [lecturers, setLecturers] = useState<LecturerType[]>([]);
    const [filteredLecturers, setFilteredLecturers] = useState<LecturerType[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [selectedLecturer, setSelectedLecturer] =
        useState<LecturerType | null>(null);

    // Search state
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);

    const fetchLecturers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(route("admin.lecturers.get"));

            if (response.data.status) {
                setLecturers(response.data.data);
                setFilteredLecturers(response.data.data);
                setTotalItems(response.data.data.length);
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

    // Filter lecturers when search query changes
    useEffect(() => {
        filterLecturers();
    }, [searchQuery, lecturers]);

    // Filter function
    const filterLecturers = () => {
        if (!searchQuery.trim()) {
            setFilteredLecturers(lecturers);
            setTotalItems(lecturers.length);
            setCurrentPage(1);
            return;
        }

        const query = searchQuery.toLowerCase().trim();
        const filtered = lecturers.filter((lecturer) => {
            const fullName =
                lecturer.translations?.id?.full_name?.toLowerCase() || "";
            const email = lecturer.contact?.email?.toLowerCase() || "";
            const nidn = lecturer.nidn?.toLowerCase() || "";
            const nip = lecturer.nip?.toLowerCase() || "";

            return (
                fullName.includes(query) ||
                email.includes(query) ||
                nidn.includes(query) ||
                nip.includes(query)
            );
        });

        setFilteredLecturers(filtered);
        setTotalItems(filtered.length);
        setCurrentPage(1); // Reset to first page when filtering
    };

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

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

    // Calculate paginated data
    const paginatedLecturers = filteredLecturers.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Handle page size change
    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1); // Reset to first page when changing page size
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
                {/* Search Bar */}
                <div className="mb-4 md:w-[400px] w-full flex items-center space-x-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari berdasarkan nama, email, NIDN, atau NIP..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No.</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>NIP/NIDN</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="w-[100px]">
                                Last sync
                            </TableHead>
                            <TableHead className="w-[100px] text-right">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="h-24 text-center"
                                >
                                    Memuat data...
                                </TableCell>
                            </TableRow>
                        ) : paginatedLecturers.length > 0 ? (
                            paginatedLecturers.map((item, index) => (
                                <LecturerTableItem
                                    key={item.id}
                                    index={
                                        (currentPage - 1) * pageSize + index + 0
                                    }
                                    data={item}
                                    onEdit={handleEdit}
                                    onDelete={(id) => {
                                        setDeleteId(id);
                                        setShowDeleteConfirm(true);
                                    }}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="h-24 text-center"
                                >
                                    {searchQuery
                                        ? "Tidak ada hasil pencarian"
                                        : "Tidak ada data dosen"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Pagination Component */}
                {totalItems > 0 && (
                    <PaginationWithControls
                        currentPage={currentPage}
                        totalItems={totalItems}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        pageSizeOptions={[10, 25, 50, 100]}
                        showPageSizeOptions={true}
                        className="mt-4"
                    />
                )}
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
