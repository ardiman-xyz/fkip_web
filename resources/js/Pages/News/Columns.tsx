import { ColumnDef } from "@tanstack/react-table";
import { News } from "./_types";
import { formatDateToIndonesian } from "@/lib/utils";
import { ActionTable } from "./_components/ActionTable";
import { PiImageDuotone } from "react-icons/pi";

export const columns: ColumnDef<News>[] = [
    {
        id: "Gambar",
        header: "Gambar",
        cell: ({ row }) => {
            if (!row.original.media) {
                return (
                    <div className="relative w-[150px] h-[100px] flex flex-col items-center justify-center bg-muted rounded-md">
                        <PiImageDuotone className="size-8 text-muted-foreground" />
                        <p className="text-sm font-semibold text-muted-foreground">
                            No Image
                        </p>
                    </div>
                );
            }

            return (
                <div className="relative w-[150px] h-[100px] flex items-center justify-center">
                    <img
                        src={row.original.media.url}
                        alt={row.original.translations.id?.title ?? "Foto"}
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
            );
        },
    },
    {
        id: "judul",
        header: "Judul [id]",
        cell: ({ row }) => {
            return (
                <div className="font-medium capitalize md:w-[400px] w-auto  truncate">
                    {row.original.translations.id?.title}
                </div>
            );
        },
    },
    {
        id: "Kategori",
        header: "Kategori",
        cell: ({ row }) => {
            return (
                <div className=" capitalize">
                    {row.original.category?.translations.id?.name}
                </div>
            );
        },
    },
    {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
            return <div className=" capitalize">{row.original.status}</div>;
        },
    },
    {
        id: "published",
        header: "Publish Date",
        cell: ({ row }) => {
            return (
                <div className=" capitalize">
                    {formatDateToIndonesian(row.original.publish_date ?? "")}
                </div>
            );
        },
    },

    {
        id: "aksi",
        header: "Aksi",
        cell: ({ row }) => {
            return <ActionTable news={row.original} />;
        },
    },
];
