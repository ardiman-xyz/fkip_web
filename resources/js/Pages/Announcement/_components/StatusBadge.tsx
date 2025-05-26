// File: resources/js/Pages/Announcement/components/StatusBadge.tsx

import React from "react";

interface StatusBadgeProps {
    status: "draft" | "published" | "archived";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const colors = {
        draft: "bg-gray-100 text-gray-800",
        published: "bg-green-100 text-green-800",
        archived: "bg-red-100 text-red-800",
    };

    return (
        <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}
        >
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}
