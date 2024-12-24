import { Button } from "@/Components/ui/button";
import { ArrowUp, ArrowDown, Pencil, Trash2 } from "lucide-react";
import { TableRow, TableCell } from "@/Components/ui/table";
import { Switch } from "@/Components/ui/switch";
import { Accreditation as AccreditationType } from "../_types/accreditation";
import { useState } from "react";
import { DeleteConfirm } from "@/Components/DeleteConfirmation";
import { Portal } from "@headlessui/react";
import { AccreditationFormModal } from "./ccreditationFormModal";

interface AccreditationTableItemProps {
    accreditation: AccreditationType;
    index: number;
    totalItems: number;
    onStatusChange: (id: number, status: boolean) => void;
    onMoveUp: (id: number) => void;
    onMoveDown: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    fetchData: () => void;
}

export const AccreditationTableItem = ({
    accreditation,
    index,
    totalItems,
    onStatusChange,
    onMoveUp,
    onMoveDown,
    onEdit,
    onDelete,
    fetchData,
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
                        onClick={() => onMoveUp(accreditation.id)}
                    >
                        <ArrowUp className="size-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={index === totalItems - 1}
                        onClick={() => onMoveDown(accreditation.id)}
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
