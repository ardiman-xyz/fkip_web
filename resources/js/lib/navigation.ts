import {
    Book,
    GraduationCap,
    Users,
    Calendar,
    Building2,
    Globe,
    Award,
    FileText,
    Trophy,
    School,
    Library,
    ClipboardCheck,
    FlaskConical,
    Newspaper,
    CalendarClock,
    PlaneTakeoff,
    ThumbsUp,
} from "lucide-react";
import { PiMegaphoneDuotone } from "react-icons/pi";

export const navigationMenus = {
    "Tentang Kami": {
        Profil: [
            { title: "Sejarah", icon: School, url: "/fakultas/sejarah" },
            {
                title: "Visi & Misi",
                icon: FileText,
                url: "/fakultas/visi-misi",
            },
            {
                title: "Pimpinan Fakultas",
                icon: Users,
                url: "/fakultas/pimpinan",
            },
            {
                title: "Struktur Organisasi",
                icon: Building2,
                url: "/fakultas/struktur-organisasi",
            },
            {
                title: "Lokasi & Kontak",
                icon: Globe,
                url: "/fakultas/lokasi-kontak",
            },
            {
                title: "Akreditasi",
                icon: ThumbsUp,
                url: "/fakultas/akreditasi",
            },
        ],
        "Staf & SDM": [
            { title: "Direktori Dosen", icon: Users, url: "/fakultas/dosen" },
            {
                title: "Tenaga Kependidikan",
                icon: Users,
                url: "/fakultas/tendik",
            },
        ],

        Informasi: [
            { title: "Berita", icon: Newspaper, url: "/berita" },
            {
                title: "Pengumuman",
                icon: PiMegaphoneDuotone,
                url: "/pengumuman",
            },

            {
                title: "Agenda",
                icon: CalendarClock,
                url: "/agenda",
            },
        ],
    },
    "Program Studi": {
        Program: [
            {
                title: "Program Sarjana (S1)",
                icon: GraduationCap,
                url: "/program/sarjana",
            },
            {
                title: "Program Magister (S2)",
                icon: GraduationCap,
                url: "/program/magister",
            },
            // {
            //     title: "Program Doktor (S3)",
            //     icon: GraduationCap,
            //     url: "/program/doktor",
            // },
        ],
        Akademik: [
            // {
            //     title: "Kalender Akademik",
            //     icon: Calendar,
            //     url: "/akademik/kalender",
            // },
            {
                title: "E-Learning",
                icon: Book,
                url: "https://elumak.umkendari.ac.id",
                external: true,
            },
            {
                title: "Sistem Informasi Akademik",
                icon: Book,
                url: "https://simak.umkendari.ac.id",
                external: true,
            },
        ],
    },
    Penelitian: {
        "Riset & Publikasi": [
            {
                title: "Publikasi",
                icon: Book,
                url: "https://journal.umkendari.ac.id/",
            },
            {
                title: "Jurnal Universitas",
                icon: Book,
                url: "https://journal.umkendari.ac.id/",
            },
            {
                title: "Journal of Education and Teaching (JET)",
                icon: PlaneTakeoff,
                url: "https://jet.or.id/index.php/jet",
            },
        ],
    },
    Kemahasiswaan: {
        Layanan: [
            {
                title: "Organisasi Mahasiswa",
                icon: Users,
                url: "/kemahasiswaan/organisasi",
            },
            { title: "Beasiswa", icon: Award, url: "/kemahasiswaan/beasiswa" },
            { title: "Prestasi", icon: Trophy, url: "/kemahasiswaan/prestasi" },
        ],
        Fasilitas: [
            {
                title: "Perpustakaan Kampus",
                icon: Library,
                url: "https://perpustakaan.umkendari.ac.id/",
            },
        ],
    },
    "Penjaminan Mutu": {
        Mutu: [
            {
                title: "Unit Penjaminan Mutu Universitas",
                icon: ClipboardCheck,
                url: "https://sipemutu.umkendari.ac.id/",
            },
            // { title: "Akreditasi", icon: Award, url: "/mutu/akreditasi" },
        ],
    },
};
