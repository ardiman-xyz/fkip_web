import { PiDotsThreeDuotone } from "react-icons/pi";
import { News } from "../_types";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

interface ActionTableProps {
    news: News;
}

export const ActionTable = ({ news }: ActionTableProps) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <PiDotsThreeDuotone className="size-8" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
