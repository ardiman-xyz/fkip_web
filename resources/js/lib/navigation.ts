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
            { title: "Sejarah", icon: School },
            { title: "Visi & Misi", icon: FileText },
            { title: "Pimpinan Fakultas", icon: Users },
            { title: "Struktur Organisasi", icon: Building2 },
            { title: "Fasilitas", icon: Building2 },
            { title: "Lokasi & Kontak", icon: Globe },
        ],
        "Staf & SDM": [
            { title: "Direktori Dosen", icon: Users },
            { title: "Tenaga Kependidikan", icon: Users },
            { title: "Pengelola Fakultas", icon: Users },
        ],
    },
    "Program Studi": {
        Program: [
            { title: "Program Sarjana (S1)", icon: GraduationCap },
            { title: "Program Magister (S2)", icon: GraduationCap },
            { title: "Program Doktor (S3)", icon: GraduationCap },
        ],
        Akademik: [
            { title: "Kalender Akademik", icon: Calendar },
            { title: "E-Learning", icon: Book },
            { title: "Sistem Informasi Akademik", icon: Book },
        ],
    },
    Penelitian: {
        "Riset & Publikasi": [
            { title: "Grup Riset", icon: Users },
            { title: "Publikasi", icon: Book },
            { title: "Jurnal Fakultas", icon: Book },
        ],
        Fasilitas: [
            { title: "Laboratorium", icon: FlaskConical },
            { title: "Pusat Kajian", icon: Library },
        ],
    },
    Kemahasiswaan: {
        Layanan: [
            { title: "Organisasi Mahasiswa", icon: Users },
            { title: "Beasiswa", icon: Award },
            { title: "Prestasi", icon: Trophy },
        ],
        Fasilitas: [
            { title: "Perpustakaan", icon: Library },
            { title: "Laboratorium", icon: FlaskConical },
        ],
    },
    "Penjaminan Mutu": {
        Mutu: [
            { title: "Unit Penjaminan Mutu", icon: ClipboardCheck },
            { title: "Akreditasi", icon: Award },
        ],
    },
};
