import { useState } from "react";
import { router } from "@inertiajs/react";
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
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { PiPlusDuotone } from "react-icons/pi";
import { toast } from "sonner";
import axios from "axios";
import {
    createProgramStudiSchema,
    createEducationLevelSchema,
    type CreateProgramStudiInput,
    type CreateEducationLevelInput,
} from "../_schemas/program-studi";
import type { EducationLevel } from "../_types/program-studi";

type FormErrors<T> = {
    [K in keyof T]?: string;
};

interface Props {
    isOpen: boolean;
    onClose: () => void;
    educationLevels: EducationLevel[];
}

export default function AddProgramStudiModal({
    isOpen,
    onClose,
    educationLevels,
}: Props) {
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [educationCategories, setEducationCategories] =
        useState<EducationLevel[]>(educationLevels);

    // Form states
    const [formData, setFormData] = useState<CreateProgramStudiInput>({
        name: "",
        education_level_id: 0,
    });

    const [newCategory, setNewCategory] = useState<CreateEducationLevelInput>({
        name: "",
        code: "",
    });

    // Error states
    const [errors, setErrors] = useState<FormErrors<CreateProgramStudiInput>>(
        {}
    );
    const [categoryErrors, setCategoryErrors] = useState<
        Partial<CreateEducationLevelInput>
    >({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form data
        const result = createProgramStudiSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: FormErrors<CreateProgramStudiInput> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof CreateProgramStudiInput;
                fieldErrors[path] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);

        try {
            router.post("/admin/study-programs", formData, {
                onSuccess: () => {
                    toast.success("Program studi berhasil ditambahkan");
                    resetForm();
                    onClose();
                },
                onError: (errors) => {
                    console.error(errors);
                    toast.error("Gagal menambahkan program studi");
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        } catch (error) {
            console.error("Error:", error);
            toast.error("Terjadi kesalahan");
            setIsLoading(false);
        }
    };

    const handleAddNewCategory = async () => {
        // Validate new category data
        const result = createEducationLevelSchema.safeParse(newCategory);

        if (!result.success) {
            const fieldErrors: Partial<CreateEducationLevelInput> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof CreateEducationLevelInput;
                fieldErrors[path] = issue.message;
            });
            setCategoryErrors(fieldErrors);
            return;
        }

        try {
            const token = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");
            const response = await axios.post(
                "/admin/education-levels",
                newCategory,
                {
                    headers: {
                        "X-CSRF-TOKEN": token || "",
                    },
                }
            );

            if (response.data) {
                const newEducationLevel = response.data;
                setEducationCategories([
                    ...educationCategories,
                    newEducationLevel,
                ]);
                setFormData({
                    ...formData,
                    education_level_id: newEducationLevel.id,
                });
                setShowAddCategory(false);
                setNewCategory({ name: "", code: "" });
                setCategoryErrors({});
                toast.success("Jenjang pendidikan berhasil ditambahkan");
            }
        } catch (error) {
            console.error("Error adding new education level:", error);
            toast.error("Gagal menambahkan jenjang pendidikan");
        }
    };

    const resetForm = () => {
        setFormData({ name: "", education_level_id: 0 });
        setErrors({});
        setNewCategory({ name: "", code: "" });
        setCategoryErrors({});
        setShowAddCategory(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Tambah Program Studi</DialogTitle>
                    <DialogDescription>
                        Tambahkan program studi baru ke dalam sistem
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        {/* Nama Program Studi */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Program Studi</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    });
                                    if (errors.name) {
                                        setErrors({
                                            ...errors,
                                            name: undefined,
                                        });
                                    }
                                }}
                                placeholder="Contoh: Pendidikan Matematika"
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Education Level */}
                        <div className="grid gap-2">
                            <Label>Jenjang Pendidikan</Label>

                            {!showAddCategory ? (
                                <div className="flex gap-2">
                                    <Select
                                        value={
                                            formData.education_level_id?.toString() ||
                                            ""
                                        }
                                        onValueChange={(value) => {
                                            setFormData({
                                                ...formData,
                                                education_level_id:
                                                    parseInt(value),
                                            });
                                            if (errors.education_level_id) {
                                                setErrors({
                                                    ...errors,
                                                    education_level_id:
                                                        undefined,
                                                });
                                            }
                                        }}
                                    >
                                        <SelectTrigger
                                            className={
                                                errors.education_level_id
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        >
                                            <SelectValue placeholder="Pilih jenjang pendidikan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {educationCategories.map(
                                                (level) => (
                                                    <SelectItem
                                                        key={level.id}
                                                        value={level.id.toString()}
                                                    >
                                                        {level.name} (
                                                        {level.code})
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setShowAddCategory(true)}
                                    >
                                        <PiPlusDuotone className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <Input
                                                placeholder="Nama (contoh: Doktor)"
                                                value={newCategory.name}
                                                onChange={(e) => {
                                                    setNewCategory({
                                                        ...newCategory,
                                                        name: e.target.value,
                                                    });
                                                    if (categoryErrors.name) {
                                                        setCategoryErrors({
                                                            ...categoryErrors,
                                                            name: undefined,
                                                        });
                                                    }
                                                }}
                                                className={
                                                    categoryErrors.name
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                            {categoryErrors.name && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {categoryErrors.name}
                                                </p>
                                            )}
                                        </div>
                                        <div className="w-24">
                                            <Input
                                                placeholder="Kode (contoh: S3)"
                                                value={newCategory.code}
                                                onChange={(e) => {
                                                    setNewCategory({
                                                        ...newCategory,
                                                        code: e.target.value,
                                                    });
                                                    if (categoryErrors.code) {
                                                        setCategoryErrors({
                                                            ...categoryErrors,
                                                            code: undefined,
                                                        });
                                                    }
                                                }}
                                                className={
                                                    categoryErrors.code
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                            />
                                            {categoryErrors.code && (
                                                <p className="text-sm text-red-500 mt-1">
                                                    {categoryErrors.code}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setShowAddCategory(false);
                                                setNewCategory({
                                                    name: "",
                                                    code: "",
                                                });
                                                setCategoryErrors({});
                                            }}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={handleAddNewCategory}
                                        >
                                            Simpan Jenjang
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {errors.education_level_id && (
                                <p className="text-sm text-red-500">
                                    {errors.education_level_id}
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
