import { TableCell, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { PiPencilSimpleBold, PiTrashBold } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Staff } from "../_types/staff";

interface StaffTableItemProps {
    index: number;
    data: Staff;
    onEdit: (data: Staff) => void;
    onDelete: (id: number) => void;
}

export const StaffTableItem = ({
    index,
    data,
    onEdit,
    onDelete,
}: StaffTableItemProps) => {
    const getInitials = (name: string | undefined) => {
        if (!name) {
            return "S";
        }

        return name
            .split(" ")
            .filter((n) => n) // untuk menghindari spasi ekstra
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                <Avatar>
                    <AvatarImage
                        src={data.media?.path ?? " "}
                        alt={data.translations?.id?.full_name}
                    />
                    <AvatarFallback>
                        {getInitials(data.translations?.id?.full_name)}
                    </AvatarFallback>
                </Avatar>
            </TableCell>
            <TableCell>
                <div className="font-medium">
                    {data.translations?.id?.full_name}
                </div>
                <div className="text-sm text-muted-foreground">
                    {data.translations?.id?.position}
                </div>
            </TableCell>
            <TableCell>
                <div>NIP: {data.nip || "-"}</div>
            </TableCell>
            <TableCell>
                <div>{data.unit || "-"}</div>
            </TableCell>
            <TableCell>
                <Badge
                    variant={data.is_active ? "default" : "outline"}
                    className={data.is_active ? "bg-green-500" : ""}
                >
                    {data.is_active ? "Aktif" : "Non-aktif"}
                </Badge>
            </TableCell>
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(data)}
                    >
                        <PiPencilSimpleBold className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDelete(data.id)}
                        className="text-red-500 hover:text-red-500"
                    >
                        <PiTrashBold className="h-4 w-4" />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
};
