import {
    PiDotsThreeDuotone,
    PiGlobeDuotone,
    PiPencilDuotone,
    PiTrashDuotone,
} from "react-icons/pi";
import { News } from "../_types";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useState } from "react";
import { DeleteConfirm } from "@/Components/ModalDeleteConfirmation";

interface ActionTableProps {
    news: News;
}

export const ActionTable = ({ news }: ActionTableProps) => {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <PiDotsThreeDuotone className="size-8" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer">
                        <PiGlobeDuotone className="size-4" />
                        Visit page
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
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

            {isModalDeleteOpen && (
                <DeleteConfirm
                    onClose={() => setIsModalDeleteOpen(false)}
                    id={news.id}
                    routeAction="admin.news.destroy"
                />
            )}
        </div>
    );
};
