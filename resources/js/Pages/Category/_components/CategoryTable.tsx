import { useState } from "react";

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Category } from "../_types";
import { TableItem } from "./TableItem";

interface CategoryTableProps {
    data: Category[];
    onRefresh: () => void;
}

export const CategoryTable = ({ data, onRefresh }: CategoryTableProps) => {
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
                    {data.map((category, index) => (
                        <TableItem
                            index={index}
                            key={category.id}
                            category={category}
                            onRefresh={onRefresh}
                        />
                    ))}
                </TableBody>
            </Table>
        </>
    );
};
