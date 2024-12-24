import { Button } from "@/Components/ui/button";
import { ArrowUp, ArrowDown, Pencil, Trash2 } from "lucide-react";
import { TableRow, TableCell } from "@/Components/ui/table";
import { Switch } from "@/Components/ui/switch";
import { Accreditation as AccreditationType } from "../_types/accreditation";
import { useState } from "react";
import { DeleteConfirm } from "@/Components/DeleteConfirmation";
import { Portal } from "@headlessui/react";
import { AccreditationFormModal } from "./ccreditationFormModal";
import axios from "axios";
import { toast } from "sonner";

interface AccreditationTableItemProps {
    accreditation: AccreditationType;
    index: number;
    totalItems: number;
    onStatusChange: (id: number, status: boolean) => void;
    onDelete: (id: number) => void;
    onMoveUp: (id: number) => void;
    onMoveDown: (id: number) => void;
    fetchData: () => void;
}

export const AccreditationTableItem = ({
    accreditation,
    index,
    totalItems,
    onStatusChange,
    onDelete,
    fetchData,
    onMoveUp,
    onMoveDown,
}: AccreditationTableItemProps) => {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);

    const handleSuccessDelete = () => {
        setIsModalDeleteOpen(false);
        onDelete(accreditation.id);
    };

    const handleCloseModalEdit = () => {
        setIsModalEditOpen(false);
        fetchData();
    };

    const handleMoveUp = async (id: number) => {
        try {
            await axios.post(route("admin.accreditation.update-order", id), {
                direction: "up",
            });
            onMoveUp(id);
            toast.success("Sukses mengubah urutan");
        } catch (error) {
            toast.error("Gagal mengubah urutan");
        }
    };

    const handleMoveDown = async (id: number) => {
        try {
            await axios.post(route("admin.accreditation.update-order", id), {
                direction: "down",
            });
            toast.success("Sukses mengubah urutan");
            onMoveDown(id);
        } catch (error) {
            toast.error("Gagal mengubah urutan");
        }
    };

    return (
        <TableRow>
            <TableCell>
                <img
                    src={accreditation.media.path}
                    alt={accreditation.translations.id.title}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                />
            </TableCell>
            <TableCell>
                <div className="space-y-1">
                    <p className="font-medium">
                        {accreditation.translations.id.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {accreditation.translations.en.title}
                    </p>
                </div>
            </TableCell>
            <TableCell>
                <div className="space-y-1">
                    <p className="text-sm">
                        {accreditation.translations.id.description}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {accreditation.translations.en.description}
                    </p>
                </div>
            </TableCell>
            <TableCell>{accreditation.year}</TableCell>
            <TableCell>
                <Switch
                    checked={accreditation.is_active}
                    onCheckedChange={(checked) =>
                        onStatusChange(accreditation.id, checked)
                    }
                />
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={index === 0}
                        onClick={() => handleMoveUp(accreditation.id)}
                    >
                        <ArrowUp className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={index === totalItems - 1}
                        onClick={() => handleMoveDown(accreditation.id)}
                    >
                        <ArrowDown className="size-4" />
                    </Button>
                </div>
            </TableCell>
            <TableCell className="text-right space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsModalEditOpen(true)}
                >
                    <Pencil className="size-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsModalDeleteOpen(true)}
                >
                    <Trash2 className="size-4" />
                </Button>
            </TableCell>

            <Portal>
                {isModalDeleteOpen && (
                    <DeleteConfirm
                        id={accreditation.id}
                        onClose={handleSuccessDelete}
                        routeAction="admin.accreditation.destroy"
                    />
                )}
                <AccreditationFormModal
                    isOpen={isModalEditOpen}
                    onClose={handleCloseModalEdit}
                    initialData={accreditation}
                />
            </Portal>
        </TableRow>
    );
};
