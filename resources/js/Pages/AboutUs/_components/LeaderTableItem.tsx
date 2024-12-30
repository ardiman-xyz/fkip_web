import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { TableCell, TableRow } from "@/Components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Leader } from "../_types/leader";

interface Props {
    data: Leader;
    onEdit: (data: Leader) => void;
    onDelete: (id: number) => void;
    index: number;
}

export const LeaderTableItem = ({ data, onEdit, onDelete, index }: Props) => {
    return (
        <TableRow>
            <TableCell>{index + 1} </TableCell>
            <TableCell>
                <Avatar>
                    <AvatarImage src={data.media?.path} />
                    <AvatarFallback>
                        {data.translations.id.full_name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell>
                <div>
                    <p className="font-medium">
                        {data.translations.id.full_name}
                        {data.academic_title && `, ${data.academic_title}`}
                    </p>
                    <p className="text-sm text-gray-500">
                        {data.translations.id.position}
                    </p>
                </div>
            </TableCell>
            <TableCell>
                <div className="space-y-1">
                    {data.nip && <p className="text-sm">NIP. {data.nip}</p>}
                    {data.nidn && <p className="text-sm">NIDN. {data.nidn}</p>}
                </div>
            </TableCell>
            <TableCell>
                <div className="space-y-1">
                    <p className="text-sm">{data.email}</p>
                    {data.phone && (
                        <p className="text-sm text-gray-500">{data.phone}</p>
                    )}
                </div>
            </TableCell>

            <TableCell className="text-right space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(data)}
                >
                    <Pencil className="size-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(data.id)}
                >
                    <Trash2 className="size-4" />
                </Button>
            </TableCell>
        </TableRow>
    );
};
