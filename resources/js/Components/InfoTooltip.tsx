// File: resources/js/Components/ui/InfoTooltip.tsx

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";
import { PiInfoDuotone } from "react-icons/pi";

interface InfoTooltipProps {
    content: string | React.ReactNode;
    className?: string;
}

export default function InfoTooltip({
    content,
    className = "",
}: InfoTooltipProps) {
    return (
        <TooltipPrimitive.Provider delayDuration={200}>
            <TooltipPrimitive.Root>
                <TooltipPrimitive.Trigger asChild>
                    <button
                        type="button"
                        className={cn(
                            "inline-flex items-center justify-center size-4 text-gray-400 hover:text-gray-600 cursor-help transition-colors",
                            className
                        )}
                    >
                        <PiInfoDuotone className="size-4" />
                    </button>
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        className={cn(
                            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                        )}
                        sideOffset={4}
                    >
                        <div className="max-w-xs">{content}</div>
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
