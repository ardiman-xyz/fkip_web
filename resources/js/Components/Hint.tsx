import { cx } from "class-variance-authority";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import React from "react";

interface HintProps {
    children: React.ReactNode;
    description: string;
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number;
    className?: string;
}

export const Hint = ({
    children,
    description,
    side = "bottom",
    sideOffset = 0,
    className,
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={1}>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent
                    sideOffset={sideOffset}
                    side={side}
                    className={cx(
                        "text-xs max-w-[220px] break-words bg-black text-white",
                        className
                    )}
                >
                    {description}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
