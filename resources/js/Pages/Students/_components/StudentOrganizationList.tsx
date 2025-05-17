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
    PiInstagramLogoDuotone,
} from "react-icons/pi";
import axios from "axios";
import { toast } from "sonner";
import CreateOrganizationModal from "./CreateOrganizationModal";
import UpdateOrganizationModal from "./UpdateOrganizationModal";
import { StudentOrganization } from "../_types";

const StudentOrganizationList: React.FC = () => {
    const [organizations, setOrganizations] = useState<StudentOrganization[]>(
        []
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredOrganizations, setFilteredOrganizations] = useState<
        StudentOrganization[]
    >([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [selectedOrganization, setSelectedOrganization] =
        useState<StudentOrganization | null>(null);

    useEffect(() => {
        loadOrganizations();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredOrganizations(organizations);
        } else {
            const filtered = organizations.filter(
                (org) =>
                    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (org.description &&
                        org.description
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()))
            );
            setFilteredOrganizations(filtered);
        }
    }, [searchTerm, organizations]);

    const loadOrganizations = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                route("admin.student.organizations.get")
            );

            if (response.data && response.data.status) {
                setOrganizations(response.data.data);
                setFilteredOrganizations(response.data.data);
            } else {
                console.warn("Received unexpected data format:", response.data);
                toast.warning(
                    "Server merespon dengan format yang tidak diharapkan"
                );
            }
        } catch (error) {
            console.error("Error loading organizations:", error);
            toast.error("Terjadi kesalahan saat memuat data organisasi");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateSuccess = (newOrganization: StudentOrganization) => {
        // Add the new organization to the top of the list
        setOrganizations([newOrganization, ...organizations]);
        setFilteredOrganizations([newOrganization, ...filteredOrganizations]);
        toast.success("Organisasi berhasil ditambahkan");
    };

    const handleUpdateSuccess = (updatedOrganization: StudentOrganization) => {
        // Update the existing organization in the list
        const updateOrganizationInArray = (orgArray: StudentOrganization[]) => {
            return orgArray.map((org) =>
                org.id === updatedOrganization.id ? updatedOrganization : org
            );
        };

        setOrganizations(updateOrganizationInArray(organizations));
        setFilteredOrganizations(
            updateOrganizationInArray(filteredOrganizations)
        );
        toast.success("Organisasi berhasil diperbarui");
    };

    const handleEditOrganization = (organization: StudentOrganization) => {
        setSelectedOrganization(organization);
        setIsUpdateModalOpen(true);
    };

    const handleDeleteOrganization = async (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus organisasi ini?")) {
            try {
                const response = await axios.delete(
                    route("admin.student.organizations.destroy", id)
                );

                // Validate successful response
                if (response.data && response.data.status) {
                    // Update both organization states to remove the deleted item
                    setOrganizations((prevOrgs) =>
                        prevOrgs.filter((org) => org.id !== id)
                    );
                    setFilteredOrganizations((prevFiltered) =>
                        prevFiltered.filter((org) => org.id !== id)
                    );

                    // Show success message - you can use the message from API if available
                    toast.success(
                        response.data.message || "Organisasi berhasil dihapus"
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
                console.error("Error deleting organization:", error);
                toast.error("Gagal menghapus organisasi");
            }
        }
    };

    const toggleOrganizationStatus = async (
        organization: StudentOrganization
    ) => {
        try {
            const response = await axios.put(
                route("admin.student.organizations.update", organization.id),
                {
                    ...organization,
                    is_active: !organization.is_active,
                }
            );

            // Update state with the response data
            if (response.data && response.data.status) {
                const updatedOrg = response.data.data;

                // Update both arrays with the updated organization
                const updateOrganizationInArray = (
                    orgArray: StudentOrganization[]
                ) => {
                    return orgArray.map((org) =>
                        org.id === updatedOrg.id ? updatedOrg : org
                    );
                };

                setOrganizations(updateOrganizationInArray(organizations));
                setFilteredOrganizations(
                    updateOrganizationInArray(filteredOrganizations)
                );

                toast.success(
                    `Organisasi ${
                        organization.is_active ? "dinonaktifkan" : "diaktifkan"
                    }`
                );
            } else {
                toast.error("Gagal mengubah status organisasi");
            }
        } catch (error) {
            console.error("Error updating organization status:", error);
            toast.error("Gagal mengubah status organisasi");
        }
    };

    const toggleFeaturedStatus = async (organization: StudentOrganization) => {
        try {
            const response = await axios.put(
                route("admin.student.organizations.update", organization.id),
                {
                    ...organization,
                    is_featured: !organization.is_featured,
                }
            );

            // Update state with the response data
            if (response.data && response.data.status) {
                const updatedOrg = response.data.data;

                // Update both arrays with the updated organization
                const updateOrganizationInArray = (
                    orgArray: StudentOrganization[]
                ) => {
                    return orgArray.map((org) =>
                        org.id === updatedOrg.id ? updatedOrg : org
                    );
                };

                setOrganizations(updateOrganizationInArray(organizations));
                setFilteredOrganizations(
                    updateOrganizationInArray(filteredOrganizations)
                );

                toast.success(
                    organization.is_featured
                        ? "Organisasi dihapus dari daftar unggulan"
                        : "Organisasi ditambahkan ke daftar unggulan"
                );
            } else {
                toast.error("Gagal mengubah status unggulan organisasi");
            }
        } catch (error) {
            console.error(
                "Error updating organization featured status:",
                error
            );
            toast.error("Gagal mengubah status unggulan organisasi");
        }
    };

    const handleViewDetails = (organization: StudentOrganization) => {
        // In a real application, you might navigate to a details page
        // or open a modal with details
        toast.info(`Melihat detail ${organization.name}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                    Daftar Organisasi Mahasiswa
                </h3>
                <Button
                    className="flex items-center gap-2"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    <PiPlusDuotone className="size-4" />
                    Tambah Organisasi
                </Button>
            </div>

            <div className="flex items-center w-full max-w-sm gap-2 mb-4">
                <Input
                    type="search"
                    placeholder="Cari organisasi..."
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
                    ) : filteredOrganizations.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nama Organisasi</TableHead>
                                    <TableHead>Tahun Berdiri</TableHead>
                                    <TableHead>Email/Instagram</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrganizations.map((organization) => (
                                    <TableRow key={organization.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span>{organization.name}</span>
                                                <span className="text-xs text-gray-500 truncate max-w-72">
                                                    {organization.description}
                                                </span>
                                                {organization.is_featured && (
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
                                            {organization.founding_year || "-"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {organization.email && (
                                                    <span className="text-sm">
                                                        {organization.email}
                                                    </span>
                                                )}
                                                {organization.instagram && (
                                                    <span className="text-sm flex items-center gap-1">
                                                        <PiInstagramLogoDuotone className="h-4 w-4" />
                                                        {organization.instagram}
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    organization.is_active
                                                        ? "default"
                                                        : "destructive"
                                                }
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    toggleOrganizationStatus(
                                                        organization
                                                    )
                                                }
                                            >
                                                {organization.is_active
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
                                                                organization
                                                            )
                                                        }
                                                    >
                                                        <PiEyeDuotone className="mr-2 h-4 w-4" />
                                                        <span>Detail</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleEditOrganization(
                                                                organization
                                                            )
                                                        }
                                                    >
                                                        <PiPencilSimpleDuotone className="mr-2 h-4 w-4" />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            toggleFeaturedStatus(
                                                                organization
                                                            )
                                                        }
                                                        className="text-amber-600 focus:text-amber-600"
                                                    >
                                                        <span className="mr-2">
                                                            ⭐
                                                        </span>
                                                        <span>
                                                            {organization.is_featured
                                                                ? "Hapus dari Unggulan"
                                                                : "Jadikan Unggulan"}
                                                        </span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleDeleteOrganization(
                                                                organization.id
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
                            Tidak ada organisasi mahasiswa yang ditemukan.
                            <br />
                            {searchTerm
                                ? "Coba gunakan kata kunci pencarian yang berbeda."
                                : "Tambahkan organisasi dengan klik tombol 'Tambah Organisasi'."}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Modal untuk tambah organisasi */}
            <CreateOrganizationModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={handleCreateSuccess}
            />

            {/* Modal untuk edit organisasi */}
            <UpdateOrganizationModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onSuccess={handleUpdateSuccess}
                organization={selectedOrganization}
            />
        </div>
    );
};

export default StudentOrganizationList;
