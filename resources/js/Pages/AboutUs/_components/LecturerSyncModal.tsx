// LecturerSyncModal.tsx
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { CheckCircle, Loader2, RefreshCcw } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

interface PreviewItem {
    employee_id: number;
    nama: string;
    email: string | null;
    jenis_kelamin: string | null;
    program_studi: string | null;
    department_id: number | null;
    status: "new" | "update";
}

interface SelectedItems {
    [key: string]: boolean;
}

interface LecturerSyncModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSyncComplete?: () => void;
}

export const LecturerSyncModal = ({
    isOpen,
    onClose,
    onSyncComplete,
}: LecturerSyncModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSyncing, setIsSyncing] = useState<boolean>(false);
    const [previewData, setPreviewData] = useState<PreviewItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<SelectedItems>({});

    // Fetch preview data when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchPreviewData();
        }
    }, [isOpen]);

    const fetchPreviewData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                route("admin.lecturers.sync.preview")
            );

            if (response.data.status) {
                setPreviewData(response.data.data);

                // Initialize all items as selected
                const initialSelection: SelectedItems = {};
                response.data.data.forEach((item: PreviewItem) => {
                    initialSelection[item.employee_id.toString()] = true;
                });
                setSelectedItems(initialSelection);
            } else {
                toast.error(
                    response.data.message || "Gagal memuat data preview"
                );
                onClose();
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat memuat data preview");
            console.error(error);
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    const handleSync = async () => {
        setIsSyncing(true);

        try {
            // Filter only selected items
            const selectedEmployeeIds = Object.entries(selectedItems)
                .filter(([_, isSelected]) => isSelected)
                .map(([id]) => id);

            if (selectedEmployeeIds.length === 0) {
                toast.warning("Pilih minimal satu data untuk disinkronkan");
                setIsSyncing(false);
                return;
            }

            // Send only selected items for sync
            const response = await axios.post(route("admin.lecturers.sync"), {
                nidn_list: selectedEmployeeIds,
            });

            if (response.data.status) {
                toast.success(
                    `Berhasil sinkronisasi ${response.data.total_sync} data dosen`
                );
                onSyncComplete && onSyncComplete();
                onClose();
            } else {
                toast.error(response.data.message || "Gagal sinkronisasi data");
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat sinkronisasi data");
            console.error(error);
        } finally {
            setIsSyncing(false);
        }
    };

    // Perbaikan: Memastikan ID yang digunakan adalah string saat digunakan sebagai key
    const toggleSelectAll = (isSelected: boolean) => {
        const newSelection: SelectedItems = {};
        previewData.forEach((item) => {
            newSelection[item.employee_id.toString()] = isSelected;
        });
        setSelectedItems(newSelection);
    };

    // Perbaikan: Memastikan hanya satu item yang berubah status saat diklik
    const toggleSelectItem = (id: string) => {
        setSelectedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const countSelected = (): number => {
        return Object.values(selectedItems).filter(Boolean).length;
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Sinkronisasi Data Dosen</DialogTitle>
                    <DialogDescription>
                        Preview data dosen dari Sistem Informasi Kepegawaian
                        (SIMPEG) sebelum disinkronkan ke database lokal.
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                        <span className="ml-2 text-gray-500">
                            Memuat data...
                        </span>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 flex justify-between items-center">
                            <div>
                                <span className="text-sm text-gray-500">
                                    Total {previewData.length} data
                                </span>
                                <span className="mx-2 text-gray-300">|</span>
                                <span className="text-sm text-gray-500">
                                    Dipilih {countSelected()} data
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => toggleSelectAll(true)}
                                >
                                    Pilih Semua
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => toggleSelectAll(false)}
                                >
                                    Batal Pilih
                                </Button>
                            </div>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40px]">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    countSelected() ===
                                                        previewData.length &&
                                                    previewData.length > 0
                                                }
                                                onChange={(e) =>
                                                    toggleSelectAll(
                                                        e.target.checked
                                                    )
                                                }
                                                className="rounded border-gray-300"
                                            />
                                        </TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>ID Pegawai</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Jenis Kelamin</TableHead>
                                        <TableHead>Program Studi</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {previewData.length > 0 ? (
                                        previewData.map((item) => (
                                            <TableRow
                                                key={item.employee_id.toString()}
                                            >
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            selectedItems[
                                                                item.employee_id.toString()
                                                            ] || false
                                                        }
                                                        onChange={() =>
                                                            toggleSelectItem(
                                                                item.employee_id.toString()
                                                            )
                                                        }
                                                        className="rounded border-gray-300"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {item.nama}
                                                </TableCell>
                                                <TableCell>
                                                    {item.employee_id}
                                                </TableCell>
                                                <TableCell>
                                                    {item.email || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {item.jenis_kelamin || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {item.program_studi || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={
                                                            item.status ===
                                                            "new"
                                                                ? "default"
                                                                : "secondary"
                                                        }
                                                        className={
                                                            item.status ===
                                                            "new"
                                                                ? "bg-green-100 text-green-800"
                                                                : ""
                                                        }
                                                    >
                                                        {item.status === "new"
                                                            ? "Baru"
                                                            : "Update"}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center py-4 text-gray-500"
                                            >
                                                Tidak ada data yang tersedia
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </>
                )}

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSyncing}
                    >
                        Batal
                    </Button>
                    <Button
                        onClick={handleSync}
                        disabled={
                            isLoading || isSyncing || countSelected() === 0
                        }
                        className="gap-2"
                    >
                        {isSyncing ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Menyinkronkan...
                            </>
                        ) : (
                            <>
                                <RefreshCcw className="h-4 w-4" />
                                Sinkronkan ({countSelected()})
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
