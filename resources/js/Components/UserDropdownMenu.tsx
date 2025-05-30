import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { router, usePage } from "@inertiajs/react";
import { PiArrowDownBold } from "react-icons/pi";
import { useState } from "react";
import { PageProps } from "@/types";

const UserDropdownMenu = () => {
    const { auth } = usePage<PageProps>().props;

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropDownOpen((dropDownOpen) => !dropDownOpen);
    };

    return (
        <DropdownMenu onOpenChange={() => toggleDropdown()}>
            <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center">
                    <Avatar className="size-8">
                        <AvatarImage
                            src="/images/avatar.jpg"
                            alt="@glennraya"
                        />
                        <AvatarFallback>GR</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col p-2 text-xs font-medium">
                        <span className="text-sm">{auth?.user.name}</span>
                        <span className="text-gray-400">{auth.user.email}</span>
                    </div>
                    <PiArrowDownBold
                        className={`transition duration-300 ease-in-out ${
                            dropDownOpen ? "rotate-180" : "rotate-0"
                        }`}
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" collisionPadding={25}>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.get("/profile")}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        router.post("/logout");
                    }}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdownMenu;
