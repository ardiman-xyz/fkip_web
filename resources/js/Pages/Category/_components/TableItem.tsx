import { useState } from "react";
import { Category } from "../_types";
import { TableCell, TableRow } from "@/Components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    PiDotsThreeDuotone,
    PiPencilDuotone,
    PiTrashDuotone,
} from "react-icons/pi";
import { DeleteConfirm } from "@/Components/ModalDeleteConfirmation";
import { Portal } from "@headlessui/react";
import { EditCategoryModal } from "./EditModal";

interface TableItemProps {
    category: Category;
    index: number;
    onRefresh: () => void;
}

export const TableItem = ({ index, category, onRefresh }: TableItemProps) => {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const handleCloseModal = () => {
        setIsModalDeleteOpen(false);
        onRefresh();
    };

    const handleCloseModalEdit = (action: string) => {
        if (action === "no action") {
            setIsEditModalOpen(false);
            return;
        }

        onRefresh();
    };

    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{category.translations.id.name}</TableCell>
            <TableCell>{category.translations.en.name}</TableCell>
            <TableCell className="text-center">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <PiDotsThreeDuotone className="size-8" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => setIsEditModalOpen(true)}
                        >
                            <PiPencilDuotone className="size-4" />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => setIsModalDeleteOpen(true)}
                        >
                            <PiTrashDuotone className="size-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Portal>
                    {isModalDeleteOpen && (
                        <DeleteConfirm
                            onClose={handleCloseModal}
                            id={category.id}
                            routeAction="admin.category.destroy"
                        />
                    )}
                    {isEditModalOpen && (
                        <EditCategoryModal
                            category={category}
                            isOpen={isEditModalOpen}
                            onClose={handleCloseModalEdit}
                        />
                    )}
                </Portal>
            </TableCell>
        </TableRow>
    );
};
