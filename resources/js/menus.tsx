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
    PiGraduationCapDuotone,
    PiStudentDuotone,
    PiMegaphoneDuotone,
    PiChartDonutDuotone,
} from "react-icons/pi";

type MenuItem = {
    label: string;
    icon: React.JSX.Element | null;
    href?: string | null;
};

const menuItems: MenuItem[] = [
    {
        label: "Dasbor",
        icon: <PiLayoutDuotone className="size-5" />,
        href: "/dashboard",
    },
    {
        label: "Analitik",
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
        label: "Berita",
        icon: <PiNewspaperDuotone className="size-5" />,
        href: "/admin/news",
    },
    {
        label: "Agenda",
        icon: <PiCalendarDuotone className="size-5" />,
        href: "/admin/events",
    },

    // GRUP PENGUMUMAN - BARU
    {
        label: "separator",
        icon: null,
    },
    {
        label: "Pengumuman",
        icon: <PiMegaphoneDuotone className="size-5" />,
        href: "/admin/announcements",
    },
    {
        label: "Analisis Pengumuman",
        icon: <PiChartDonutDuotone className="size-5" />,
        href: "/admin/announcement-categories",
    },

    {
        label: "separator",
        icon: null,
    },
    {
        label: "Kategori",
        icon: <PiFolderOpenDuotone className="size-5" />,
        href: "/admin/category",
    },
    {
        label: "Tag",
        icon: <PiTagSimpleDuotone className="size-5" />,
        href: "/admin/tags",
    },
    {
        label: "separator",
        icon: null,
    },

    {
        label: "Tentang Kami",
        icon: <PiBuildingsDuotone className="size-5" />,
        href: "/admin/about-us",
    },

    {
        label: "Program Studi",
        icon: <PiGraduationCapDuotone className="size-5" />,
        href: "/admin/study-programs",
    },

    {
        label: "Kemahasiswaan",
        icon: <PiStudentDuotone className="size-5" />,
        href: "/admin/student",
    },

    {
        label: "separator",
        icon: null,
    },
    {
        label: "Pustaka Media",
        icon: <PiImageDuotone className="size-5" />,
        href: "/admin/media/view",
    },
    {
        label: "Pengguna",
        icon: <PiUserCircleDuotone className="size-5" />,
        href: "/authors",
    },

    {
        label: "separator",
        icon: null,
    },
    {
        label: "Pengaturan",
        icon: <PiGearDuotone className="size-5" />,
        href: "/settings",
    },
    {
        label: "Pusat bantuan",
        icon: <PiQuestionDuotone className="size-5" />,
        href: "/help",
    },
];

export default menuItems;
