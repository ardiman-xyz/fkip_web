import { Button } from "@/Components/ui/button";
import { PiBellFill, PiChatCenteredDotsFill } from "react-icons/pi";
import { ReactNode } from "react";
import SearchButton from "./SearchButton";
import UserDropdownMenu from "./UserDropdownMenu";

const AppHeader = ({ header }: { header?: ReactNode }) => {
    return (
        <div className="flex h-20 w-full shrink-0 items-center justify-between border-b border-gray-200 px-8 dark:border-gray-800">
            {header}
            <div className="flex w-96 items-center">
                {/* <SearchButton className="w-full" /> */}
            </div>
            <div className="flex items-center gap-2">
                <UserDropdownMenu />
            </div>
        </div>
    );
};

export default AppHeader;
