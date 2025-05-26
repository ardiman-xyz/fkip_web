// File: resources/js/Pages/Announcement/components/PriorityBadge.tsx

import React from "react";

interface PriorityBadgeProps {
    priority: "low" | "normal" | "high" | "urgent";
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
    const colors = {
        low: "bg-gray-100 text-gray-800",
        normal: "bg-blue-100 text-blue-800",
        high: "bg-orange-100 text-orange-800",
        urgent: "bg-red-100 text-red-800",
    };

    return (
        <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}
        >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
    );
}
