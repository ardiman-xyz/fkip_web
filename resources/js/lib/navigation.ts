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
} from "lucide-react";

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
            // { title: "Fasilitas", icon: Building2, url: "/fakultas/fasilitas" },
            {
                title: "Lokasi & Kontak",
                icon: Globe,
                url: "/fakultas/lokasi-kontak",
            },
        ],
        "Staf & SDM": [
            { title: "Direktori Dosen", icon: Users, url: "/fakultas/dosen" },
            {
                title: "Tenaga Kependidikan",
                icon: Users,
                url: "/fakultas/tendik",
            },
            {
                title: "Pengelola Fakultas",
                icon: Users,
                url: "/fakultas/pengelola",
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
            {
                title: "Program Doktor (S3)",
                icon: GraduationCap,
                url: "/program/doktor",
            },
        ],
        Akademik: [
            {
                title: "Kalender Akademik",
                icon: Calendar,
                url: "/akademik/kalender",
            },
            {
                title: "E-Learning",
                icon: Book,
                url: "https://elearning.umkendari.ac.id",
                external: true,
            },
            {
                title: "Sistem Informasi Akademik",
                icon: Book,
                url: "https://siakad.umkendari.ac.id",
                external: true,
            },
        ],
    },
    Penelitian: {
        "Riset & Publikasi": [
            { title: "Grup Riset", icon: Users, url: "/riset/grup" },
            { title: "Publikasi", icon: Book, url: "/riset/publikasi" },
            { title: "Jurnal Fakultas", icon: Book, url: "/riset/jurnal" },
        ],
        Fasilitas: [
            {
                title: "Laboratorium",
                icon: FlaskConical,
                url: "/fasilitas/laboratorium",
            },
            {
                title: "Pusat Kajian",
                icon: Library,
                url: "/fasilitas/pusat-kajian",
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
                title: "Perpustakaan",
                icon: Library,
                url: "/fasilitas/perpustakaan",
            },
            {
                title: "Laboratorium",
                icon: FlaskConical,
                url: "/fasilitas/laboratorium",
            },
        ],
    },
    "Penjaminan Mutu": {
        Mutu: [
            {
                title: "Unit Penjaminan Mutu",
                icon: ClipboardCheck,
                url: "/mutu/upm",
            },
            { title: "Akreditasi", icon: Award, url: "/mutu/akreditasi" },
        ],
    },
};
