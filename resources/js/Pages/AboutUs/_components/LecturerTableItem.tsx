// _components/LecturerTableItem.tsx
import { TableCell, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { PiPencilSimpleBold, PiTrashBold } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { Lecturer } from "../_types/lecturer";

interface LecturerTableItemProps {
    index: number;
    data: Lecturer;
    onEdit: (data: Lecturer) => void;
    onDelete: (id: number) => void;
}

export const LecturerTableItem = ({
    index,
    data,
    onEdit,
    onDelete,
}: LecturerTableItemProps) => {
    const getInitials = (name: string | undefined) => {
        if (!name) {
            return "G";
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
                    <AvatarImage src={data.media?.path} alt={data.name} />
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
                    {data.academic_title}
                </div>
            </TableCell>
            <TableCell>
                <div>{data.nidn || "-"}</div>
            </TableCell>
            <TableCell>
                <div>{data?.contact?.email}</div>
                <div className="text-sm text-muted-foreground">
                    {data?.contact?.phone}
                </div>
            </TableCell>
            <TableCell>
                <Badge
                    variant={data.is_active ? "default" : "outline"}
                    className={data.is_active ? "bg-green-500" : ""}
                >
                    {data.is_active ? "Aktif" : "Non-aktif"}
                </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground text-xs">
                {data.last_sync_at
                    ? new Date(data.last_sync_at).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                      })
                    : "Belum disinkronkan"}
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
