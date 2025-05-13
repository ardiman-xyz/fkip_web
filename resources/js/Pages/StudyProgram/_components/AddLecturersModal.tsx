// resources/js/Pages/Admin/StudyProgram/_components/AddLecturersModal.tsx
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { useEffect, useState } from "react";
import { PiMagnifyingGlassDuotone, PiUserDuotone } from "react-icons/pi";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { Save } from "lucide-react";
import { Lecturer as LecturerType } from "../_types/program-studi";

interface SelectedLecturer extends LecturerType {
    selected: boolean;
    is_active: boolean;
    role: string | null;
}

interface AddLecturersModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (lecturers: LecturerType[]) => void;
    studyProgramId: number;
    currentLecturers: LecturerType[];
}

// Schema untuk validasi
const saveSchema = z.object({
    studyProgramId: z.number(),
    lecturers: z.array(
        z.object({
            id: z.number(),
            role: z.string().nullable(),
            is_active: z.boolean(),
        })
    ),
});

const AddLecturersModal = ({
    isOpen,
    onClose,
    onSuccess,
    studyProgramId,
    currentLecturers,
}: AddLecturersModalProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [allLecturers, setAllLecturers] = useState<SelectedLecturer[]>([]);
    const [filteredLecturers, setFilteredLecturers] = useState<
        SelectedLecturer[]
    >([]);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    // Load all lecturers when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchLecturers();
        }
    }, [isOpen]);

    // Filter lecturers when search term changes
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredLecturers(allLecturers);
        } else {
            const term = searchTerm.toLowerCase();
            setFilteredLecturers(
                allLecturers.filter(
                    (lecturer) =>
                        lecturer.name.toLowerCase().includes(term) ||
                        (lecturer.nidn &&
                            lecturer.nidn.toLowerCase().includes(term)) ||
                        (lecturer.nip &&
                            lecturer.nip.toLowerCase().includes(term))
                )
            );
        }
    }, [searchTerm, allLecturers]);

    // Fetch all lecturers from the server
    const fetchLecturers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                route("admin.lecturer.get-data", studyProgramId)
            );

            // Map all lecturers and mark those already in the program
            const lecturers = response.data.data.map(
                (lecturer: LecturerType) => {
                    const existingLecturer = currentLecturers.find(
                        (l) => l.id === lecturer.id
                    );
                    return {
                        ...lecturer,
                        selected: !!existingLecturer,
                        is_active: existingLecturer?.pivot?.is_active ?? true,
                        role: existingLecturer?.pivot?.role ?? null,
                    };
                }
            );

            setAllLecturers(lecturers);
            setFilteredLecturers(lecturers);
        } catch (error) {
            toast.error("Gagal memuat data dosen");
            console.error("Error fetching lecturers:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Toggle lecturer selection
    const toggleLecturer = (id: number) => {
        setAllLecturers((prev) =>
            prev.map((lecturer) =>
                lecturer.id === id
                    ? { ...lecturer, selected: !lecturer.selected }
                    : lecturer
            )
        );
    };

    // Update lecturer role
    const updateLecturerRole = (id: number, role: string | null) => {
        setAllLecturers((prev) =>
            prev.map((lecturer) =>
                lecturer.id === id ? { ...lecturer, role } : lecturer
            )
        );
    };

    // Update lecturer active status
    const updateLecturerStatus = (id: number, is_active: boolean) => {
        setAllLecturers((prev) =>
            prev.map((lecturer) =>
                lecturer.id === id ? { ...lecturer, is_active } : lecturer
            )
        );
    };

    // Apply role to all selected lecturers
    const applyRoleToSelected = () => {
        if (!selectedRole) return;

        setAllLecturers((prev) =>
            prev.map((lecturer) =>
                lecturer.selected
                    ? {
                          ...lecturer,
                          // Ubah 'none' menjadi null, jika tidak, gunakan selectedRole
                          role: selectedRole === "none" ? null : selectedRole,
                      }
                    : lecturer
            )
        );

        // Reset the select
        setSelectedRole(null);
    };

    // Save changes
    const handleSave = async () => {
        try {
            setIsSaving(true);

            // Get selected lecturers
            const selectedLecturers = allLecturers
                .filter((lecturer) => lecturer.selected)
                .map((lecturer) => ({
                    id: lecturer.id,
                    role: lecturer.role,
                    is_active: lecturer.is_active,
                }));

            // Validate data
            const data = {
                studyProgramId,
                lecturers: selectedLecturers,
            };

            saveSchema.parse(data);

            // Send data to server
            const response = await axios.post(
                `/admin/study-programs/${studyProgramId}/lecturers`,
                data
            );

            if (response.data.status) {
                toast.success(
                    response.data.message || "Dosen berhasil disimpan"
                );
                onSuccess(response.data.data);
                onClose();
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast.error("Data tidak valid. Silakan periksa kembali");
            } else if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ||
                        "Gagal menyimpan data dosen"
                );
            } else {
                toast.error("Terjadi kesalahan");
            }
            console.error("Error saving lecturers:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>Kelola Dosen Program Studi</DialogTitle>
                    <DialogDescription>
                        Pilih dosen-dosen yang akan ditambahkan ke program studi
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 flex-1 overflow-hidden">
                    {/* Search & Role */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <PiMagnifyingGlassDuotone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Cari dosen berdasarkan nama atau NIDN"
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select
                                value={selectedRole || undefined}
                                onValueChange={setSelectedRole}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Pilih peran" />
                                </SelectTrigger>
                                <SelectContent>
                                    {/* Ganti "" menjadi nilai lain, misalnya "none" */}
                                    <SelectItem value="none">
                                        Tidak ada
                                    </SelectItem>
                                    <SelectItem value="Kepala Program Studi">
                                        Kepala Program Studi
                                    </SelectItem>
                                    <SelectItem value="Sekretaris Program Studi">
                                        Sekretaris Program Studi
                                    </SelectItem>
                                    <SelectItem value="Dosen">Dosen</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={applyRoleToSelected}
                                disabled={!selectedRole}
                            >
                                Terapkan
                            </Button>
                        </div>
                    </div>

                    {/* Lecturers List */}
                    <div className="border rounded-md overflow-y-auto max-h-[50vh]">
                        {isLoading ? (
                            <div className="p-8 text-center">
                                <p>Memuat data dosen...</p>
                            </div>
                        ) : filteredLecturers.length > 0 ? (
                            <div className="divide-y">
                                {filteredLecturers.map((lecturer) => (
                                    <div
                                        key={lecturer.id}
                                        className="p-3 flex items-start gap-3"
                                    >
                                        <div className="flex items-center h-10 mt-0.5">
                                            <Checkbox
                                                id={`lecturer-${lecturer.id}`}
                                                checked={lecturer.selected}
                                                onCheckedChange={() =>
                                                    toggleLecturer(lecturer.id)
                                                }
                                            />
                                        </div>
                                        <Avatar className="h-10 w-10">
                                            {lecturer.photo ? (
                                                <AvatarImage
                                                    src={lecturer.photo}
                                                    alt={lecturer.name}
                                                />
                                            ) : null}
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                <PiUserDuotone className="h-5 w-5" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
                                            <div className="sm:col-span-2">
                                                <p className="font-medium text-sm">
                                                    {lecturer.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {lecturer.nidn &&
                                                        `NIDN: ${lecturer.nidn}`}
                                                    {lecturer.nip &&
                                                        lecturer.nidn &&
                                                        " | "}
                                                    {lecturer.nip &&
                                                        `NIP: ${lecturer.nip}`}
                                                </p>
                                            </div>
                                            <div className="sm:col-span-2">
                                                {lecturer.selected && (
                                                    <Select
                                                        value={
                                                            lecturer.role ||
                                                            "none"
                                                        }
                                                        onValueChange={(
                                                            value
                                                        ) =>
                                                            updateLecturerRole(
                                                                lecturer.id,
                                                                value === "none"
                                                                    ? null
                                                                    : value
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih peran" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="none">
                                                                Tidak ada
                                                            </SelectItem>
                                                            <SelectItem value="Kepala Program Studi">
                                                                Kepala Program
                                                                Studi
                                                            </SelectItem>
                                                            <SelectItem value="Sekretaris Program Studi">
                                                                Sekretaris
                                                                Program Studi
                                                            </SelectItem>
                                                            <SelectItem value="Dosen">
                                                                Dosen
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </div>
                                            <div className="flex justify-end items-center">
                                                {lecturer.selected && (
                                                    <div className="flex items-center gap-2">
                                                        <Checkbox
                                                            id={`active-${lecturer.id}`}
                                                            checked={
                                                                lecturer.is_active
                                                            }
                                                            onCheckedChange={(
                                                                checked
                                                            ) =>
                                                                updateLecturerStatus(
                                                                    lecturer.id,
                                                                    !!checked
                                                                )
                                                            }
                                                        />
                                                        <Label
                                                            htmlFor={`active-${lecturer.id}`}
                                                        >
                                                            Aktif
                                                        </Label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center">
                                <p>
                                    Tidak ada dosen yang sesuai dengan pencarian
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Selected Lecturers Summary */}
                    <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm">
                            <span className="font-medium">
                                {allLecturers.filter((l) => l.selected).length}
                            </span>{" "}
                            dosen dipilih
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isSaving}
                    >
                        Batal
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="gap-2"
                    >
                        <Save className="size-4" />
                        {isSaving ? "Menyimpan..." : "Simpan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddLecturersModal;
