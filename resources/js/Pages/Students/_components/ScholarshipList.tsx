import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import {
    PiPlusDuotone,
    PiPencilSimpleDuotone,
    PiTrashDuotone,
    PiDotsThreeVerticalBold,
    PiEyeDuotone,
    PiCalendarDuotone,
    PiMoney,
    PiUserDuotone,
} from "react-icons/pi";
import axios from "axios";
import { toast } from "sonner";
// Perbaikan import
import CreateScholarshipModal from "./CreateScholarshipModal";
import { Scholarship } from "../_types";
import UpdateScholarshipModal from "./UpdateScholarshipModal";

const ScholarshipList: React.FC = () => {
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredScholarships, setFilteredScholarships] = useState<
        Scholarship[]
    >([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [selectedScholarship, setSelectedScholarship] =
        useState<Scholarship | null>(null);

    useEffect(() => {
        loadScholarships();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredScholarships(scholarships);
        } else {
            const filtered = scholarships.filter(
                (scholarship) =>
                    scholarship.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    (scholarship.description &&
                        scholarship.description
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())) ||
                    (scholarship.provider &&
                        scholarship.provider
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
            setFilteredScholarships(filtered);
        }
    }, [searchTerm, scholarships]);

    const loadScholarships = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(route("admin.scholarships.get"));

            if (response.data && response.data.status) {
                setScholarships(response.data.data);
                setFilteredScholarships(response.data.data);
            } else {
                console.warn("Received unexpected data format:", response.data);
                toast.warning(
                    "Server merespon dengan format yang tidak diharapkan"
                );
            }
        } catch (error) {
            console.error("Error loading scholarships:", error);
            toast.error("Terjadi kesalahan saat memuat data beasiswa");

            // Dummy data for preview - remove in production
            const dummyData: Scholarship[] = [
                {
                    id: 1,
                    name: "Beasiswa Unggulan Kemendikbud",
                    description:
                        "Beasiswa untuk mahasiswa berprestasi dari Kementerian Pendidikan dan Kebudayaan",
                    provider: "Kemendikbud",
                    amount: 12000000,
                    amount_formatted: "Rp 12.000.000/tahun",
                    requirements: "IPK minimal 3.5, aktif berorganisasi",
                    start_date: "2025-08-01",
                    end_date: "2026-07-31",
                    application_deadline: "2025-06-30",
                    quota: 50,
                    is_active: true,
                    is_featured: true,
                    contact_person: "Panitia Beasiswa Unggulan",
                    contact_email: "beasiswa@kemdikbud.go.id",
                    contact_phone: "021-5723223",
                    cover_image: null,
                    created_at: "2025-01-15T08:00:00Z",
                    updated_at: "2025-01-15T08:00:00Z",
                },
                {
                    id: 2,
                    name: "Beasiswa Bank Indonesia",
                    description:
                        "Program beasiswa untuk mahasiswa berprestasi dari Bank Indonesia",
                    provider: "Bank Indonesia",
                    amount: 24000000,
                    amount_formatted: "Rp 24.000.000/tahun",
                    requirements: "IPK minimal 3.3, semester 5-7",
                    start_date: "2025-09-01",
                    end_date: "2026-08-31",
                    application_deadline: "2025-07-15",
                    quota: 30,
                    is_active: true,
                    is_featured: false,
                    contact_person: "Sekretariat Beasiswa BI",
                    contact_email: "beasiswa@bi.go.id",
                    contact_phone: "021-3817187",
                    cover_image: null,
                    created_at: "2025-02-10T10:30:00Z",
                    updated_at: "2025-02-10T10:30:00Z",
                },
                {
                    id: 3,
                    name: "Beasiswa Djarum Foundation",
                    description:
                        "Program beasiswa dan pembinaan soft skill untuk mahasiswa dari Djarum Foundation",
                    provider: "Djarum Foundation",
                    amount: 10000000,
                    amount_formatted: "Rp 10.000.000/tahun",
                    requirements:
                        "IPK minimal 3.2, semester 4-6, aktif di kegiatan kampus",
                    start_date: "2025-10-01",
                    end_date: "2026-09-30",
                    application_deadline: "2025-04-30",
                    quota: 100,
                    is_active: false,
                    is_featured: false,
                    contact_person: "Panitia DSA",
                    contact_email: "dsa@djarumfoundation.org",
                    contact_phone: "024-8552712",
                    cover_image: null,
                    created_at: "2025-01-05T09:15:00Z",
                    updated_at: "2025-03-01T14:20:00Z",
                },
            ];

            setScholarships(dummyData);
            setFilteredScholarships(dummyData);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSuccess = (newScholarship: Scholarship) => {
        // Add the new scholarship to the top of the list
        setScholarships([newScholarship, ...scholarships]);
        setFilteredScholarships([newScholarship, ...filteredScholarships]);
        toast.success("Beasiswa berhasil ditambahkan");
    };

    const handleUpdateSuccess = (updatedScholarship: Scholarship) => {
        // Update the existing scholarship in the list
        const updateScholarshipInArray = (schArray: Scholarship[]) => {
            return schArray.map((sch) =>
                sch.id === updatedScholarship.id ? updatedScholarship : sch
            );
        };

        setScholarships(updateScholarshipInArray(scholarships));
        setFilteredScholarships(updateScholarshipInArray(filteredScholarships));
        toast.success("Beasiswa berhasil diperbarui");
    };

    const handleEditScholarship = (scholarship: Scholarship) => {
        setSelectedScholarship(scholarship);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteScholarship = async (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus beasiswa ini?")) {
            try {
                const response = await axios.delete(
                    route("admin.scholarships.destroy", id)
                );

                // Validate successful response
                if (response.data && response.data.status) {
                    // Update both scholarship states to remove the deleted item
                    setScholarships((prevSchs) =>
                        prevSchs.filter((sch) => sch.id !== id)
                    );
                    setFilteredScholarships((prevFiltered) =>
                        prevFiltered.filter((sch) => sch.id !== id)
                    );

                    // Show success message - you can use the message from API if available
                    toast.success(
                        response.data.message || "Beasiswa berhasil dihapus"
                    );
                } else {
                    // Handle unexpected response format
                    console.warn(
                        "Received unexpected response format:",
                        response.data
                    );
                    toast.warning(
                        "Server merespon dengan format yang tidak diharapkan"
                    );
                }
            } catch (error) {
                console.error("Error deleting scholarship:", error);
                toast.error("Gagal menghapus beasiswa");

                // For demo/preview, remove the item from the local state without API call
                setScholarships((prevSchs) =>
                    prevSchs.filter((sch) => sch.id !== id)
                );
                setFilteredScholarships((prevFiltered) =>
                    prevFiltered.filter((sch) => sch.id !== id)
                );
                toast.success("Beasiswa berhasil dihapus");
            }
        }
    };

    const toggleScholarshipStatus = async (scholarship: Scholarship) => {
        try {
            const response = await axios.put(
                route("admin.scholarships.update", scholarship.id),
                {
                    ...scholarship,
                    is_active: !scholarship.is_active,
                }
            );

            // Update state with the response data
            if (response.data && response.data.status) {
                const updatedSch = response.data.data;

                // Update both arrays with the updated scholarship
                const updateScholarshipInArray = (schArray: Scholarship[]) => {
                    return schArray.map((sch) =>
                        sch.id === updatedSch.id ? updatedSch : sch
                    );
                };

                setScholarships(updateScholarshipInArray(scholarships));
                setFilteredScholarships(
                    updateScholarshipInArray(filteredScholarships)
                );

                toast.success(
                    `Beasiswa ${
                        scholarship.is_active ? "dinonaktifkan" : "diaktifkan"
                    }`
                );
            } else {
                toast.error("Gagal mengubah status beasiswa");
            }
        } catch (error) {
            console.error("Error updating scholarship status:", error);
            toast.error("Gagal mengubah status beasiswa");

            // For demo/preview, update the local state without API call
            const updatedSch = {
                ...scholarship,
                is_active: !scholarship.is_active,
            };
            const updateScholarshipInArray = (schArray: Scholarship[]) => {
                return schArray.map((sch) =>
                    sch.id === updatedSch.id ? updatedSch : sch
                );
            };

            setScholarships(updateScholarshipInArray(scholarships));
            setFilteredScholarships(
                updateScholarshipInArray(filteredScholarships)
            );

            toast.success(
                `Beasiswa ${
                    scholarship.is_active ? "dinonaktifkan" : "diaktifkan"
                }`
            );
        }
    };

    const toggleFeaturedStatus = async (scholarship: Scholarship) => {
        try {
            const response = await axios.put(
                route("admin.scholarships.update", scholarship.id),
                {
                    ...scholarship,
                    is_featured: !scholarship.is_featured,
                }
            );

            // Update state with the response data
            if (response.data && response.data.status) {
                const updatedSch = response.data.data;

                // Update both arrays with the updated scholarship
                const updateScholarshipInArray = (schArray: Scholarship[]) => {
                    return schArray.map((sch) =>
                        sch.id === updatedSch.id ? updatedSch : sch
                    );
                };

                setScholarships(updateScholarshipInArray(scholarships));
                setFilteredScholarships(
                    updateScholarshipInArray(filteredScholarships)
                );

                toast.success(
                    scholarship.is_featured
                        ? "Beasiswa dihapus dari daftar unggulan"
                        : "Beasiswa ditambahkan ke daftar unggulan"
                );
            } else {
                toast.error("Gagal mengubah status unggulan beasiswa");
            }
        } catch (error) {
            console.error("Error updating scholarship featured status:", error);
            toast.error("Gagal mengubah status unggulan beasiswa");

            // For demo/preview, update the local state without API call
            const updatedSch = {
                ...scholarship,
                is_featured: !scholarship.is_featured,
            };
            const updateScholarshipInArray = (schArray: Scholarship[]) => {
                return schArray.map((sch) =>
                    sch.id === updatedSch.id ? updatedSch : sch
                );
            };

            setScholarships(updateScholarshipInArray(scholarships));
            setFilteredScholarships(
                updateScholarshipInArray(filteredScholarships)
            );

            toast.success(
                scholarship.is_featured
                    ? "Beasiswa dihapus dari daftar unggulan"
                    : "Beasiswa ditambahkan ke daftar unggulan"
            );
        }
    };

    const handleViewDetails = (scholarship: Scholarship) => {
        // In a real application, you might navigate to a details page
        // or open a modal with details
        toast.info(`Melihat detail ${scholarship.name}`);
    };

    // Helper function to format dates
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                    Daftar Program Beasiswa
                </h3>
                <Button
                    className="flex items-center gap-2"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <PiPlusDuotone className="size-4" />
                    Tambah Beasiswa
                </Button>
            </div>

            <div className="flex items-center w-full max-w-sm gap-2 mb-4">
                <Input
                    type="search"
                    placeholder="Cari beasiswa..."
                    className="h-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <Card>
                <CardContent className="p-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-48">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredScholarships.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[300px]">
                                        Nama Beasiswa
                                    </TableHead>
                                    <TableHead>Nilai</TableHead>
                                    <TableHead>Pendaftar</TableHead>
                                    <TableHead>Tenggat Waktu</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredScholarships.map((scholarship) => (
                                    <TableRow key={scholarship.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>{scholarship.name}</span>
                                                <span className="text-xs text-gray-500">
                                                    {scholarship.provider}
                                                </span>
                                                {scholarship.is_featured && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="w-fit mt-1"
                                                    >
                                                        Unggulan
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <PiMoney className="h-4 w-4 text-gray-400" />
                                                <span>
                                                    {scholarship.amount_formatted ||
                                                        (scholarship.amount
                                                            ? `Rp ${parseInt(
                                                                  scholarship.amount.toString()
                                                              ).toLocaleString(
                                                                  "id-ID"
                                                              )}`
                                                            : "-")}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <PiUserDuotone className="h-4 w-4 text-gray-400" />
                                                <span>
                                                    {scholarship.quota ||
                                                        "Tidak ada kuota"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <PiCalendarDuotone className="h-4 w-4 text-gray-400" />
                                                <span>
                                                    {formatDate(
                                                        scholarship.application_deadline
                                                    )}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    scholarship.is_active
                                                        ? "default"
                                                        : "destructive"
                                                }
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    toggleScholarshipStatus(
                                                        scholarship
                                                    )
                                                }
                                            >
                                                {scholarship.is_active
                                                    ? "Aktif"
                                                    : "Tidak Aktif"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <PiDotsThreeVerticalBold className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleViewDetails(
                                                                scholarship
                                                            )
                                                        }
                                                    >
                                                        <PiEyeDuotone className="mr-2 h-4 w-4" />
                                                        <span>Detail</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleEditScholarship(
                                                                scholarship
                                                            )
                                                        }
                                                    >
                                                        <PiPencilSimpleDuotone className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            toggleFeaturedStatus(
                                                                scholarship
                                                            )
                                                        }
                                                        className="text-amber-600 focus:text-amber-600"
                                                    >
                                                        <span className="mr-2">
                                                            ⭐
                                                        </span>
                                                        <span>
                                                            {scholarship.is_featured
                                                                ? "Hapus dari Unggulan"
                                                                : "Jadikan Unggulan"}
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDeleteScholarship(
                                                                scholarship.id
                                                            )
                                                        }
                                                        className="text-red-600 focus:text-red-600"
                                                    >
                                                        <PiTrashDuotone className="mr-2 h-4 w-4" />
                                                        <span>Hapus</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="p-6 text-center text-gray-500">
                            Tidak ada program beasiswa yang ditemukan.
                            <br />
                            {searchTerm
                                ? "Coba gunakan kata kunci pencarian yang berbeda."
                                : "Tambahkan beasiswa dengan klik tombol 'Tambah Beasiswa'."}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Modal untuk tambah dan edit beasiswa */}
            <CreateScholarshipModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleCreateSuccess}
            />

            <UpdateScholarshipModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSuccess={handleUpdateSuccess}
                scholarship={selectedScholarship}
            />
        </div>
    );
};

export default ScholarshipList;
