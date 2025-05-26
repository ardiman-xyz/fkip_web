import {
    PiGlobeDuotone,
    PiNoteDuotone,
    PiArchiveDuotone,
} from "react-icons/pi";

interface StatusBadgeProps {
    status: "draft" | "published" | "archived";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const statusConfig = {
        draft: {
            color: "bg-gray-100 text-gray-800",
            icon: PiNoteDuotone,
            label: "Draft",
        },
        published: {
            color: "bg-green-100 text-green-800 ",
            icon: PiGlobeDuotone,
            label: "Published",
        },
        archived: {
            color: "bg-red-100 text-red-800",
            icon: PiArchiveDuotone,
            label: "Archived",
        },
    };

    const config = statusConfig[status];
    const IconComponent = config.icon;

    return (
        <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded  text-xs font-medium ${config.color}`}
        >
            <IconComponent className="size-3" />
            {config.label}
        </span>
    );
}
