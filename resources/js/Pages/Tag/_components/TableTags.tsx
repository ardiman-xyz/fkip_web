import { useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Tag } from "../_types";

import { TableItem } from "./TableItem";

//   import DeleteConfirmationModal from "@/Components/modals/delete-confirmation-modal"
//   import TagFormModal from "@/Components/modals/tag-form-modal"

interface TagsTableProps {
    tags: Tag[];
    onRefresh: () => void;
}

export const TagsTable = ({ tags, onRefresh }: TagsTableProps) => {
    const [loading, setLoading] = useState<number | null>(null);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name (ID)</TableHead>
                        <TableHead>Name (EN)</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tags.map((tag, index) => (
                        <TableItem
                            index={index}
                            key={tag.id}
                            tag={tag}
                            onRefresh={onRefresh}
                        />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
