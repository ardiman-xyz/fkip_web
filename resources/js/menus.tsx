import {
    PiLayoutDuotone,
    PiQuestionDuotone,
    PiFolderOpenDuotone,
    PiNewspaperDuotone,
    PiTagSimpleDuotone,
    PiImageDuotone,
    PiUserCircleDuotone,
    PiChartLineDuotone,
    PiGearDuotone,
    PiCalendarDuotone,
    PiSlideshowDuotone,
    PiBuildingsDuotone,
    PiUserSquareDuotone,
    PiGraduationCapDuotone,
} from "react-icons/pi";

type MenuItem = {
    label: string;
    icon: React.JSX.Element | null;
    href?: string | null;
};

const menuItems: MenuItem[] = [
    {
        label: "Dashboard",
        icon: <PiLayoutDuotone className="size-5" />,
        href: "/dashboard",
    },
    {
        label: "Analytics",
        icon: <PiChartLineDuotone className="size-5" />,
        href: "/analytics",
    },
    {
        label: "separator",
        icon: null,
    },
    {
        label: "Slider",
        icon: <PiSlideshowDuotone className="size-5" />,
        href: "/admin/slider",
    },
    {
        label: "News",
        icon: <PiNewspaperDuotone className="size-5" />,
        href: "/admin/news",
    },
    {
        label: "Agenda",
        icon: <PiCalendarDuotone className="size-5" />,
        href: "/admin/events",
    },
    {
        label: "Categories",
        icon: <PiFolderOpenDuotone className="size-5" />,
        href: "/admin/category",
    },
    {
        label: "Tags",
        icon: <PiTagSimpleDuotone className="size-5" />,
        href: "/admin/tags",
    },
    {
        label: "separator",
        icon: null,
    },

    {
        label: "About Us",
        icon: <PiBuildingsDuotone className="size-5" />,
        href: "/admin/about-us",
    },

    {
        label: "Program Studi",
        icon: <PiGraduationCapDuotone className="size-5" />,
        href: "/admin/study-programs",
    },

    {
        label: "separator",
        icon: null,
    },
    {
        label: "Media Library",
        icon: <PiImageDuotone className="size-5" />,
        href: "/admin/media/view",
    },
    {
        label: "Authors",
        icon: <PiUserCircleDuotone className="size-5" />,
        href: "/authors",
    },

    {
        label: "separator",
        icon: null,
        // href: undefined
    },
    {
        label: "Settings",
        icon: <PiGearDuotone className="size-5" />,
        href: "/settings",
    },
    {
        label: "Help Center",
        icon: <PiQuestionDuotone className="size-5" />,
        href: "/help",
    },
];

export default menuItems;
