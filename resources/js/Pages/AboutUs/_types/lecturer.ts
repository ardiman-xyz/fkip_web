// _schema/lecturer.ts
import { Media } from "@/types/app";
import { z } from "zod";

export interface Lecturer {
    id: number;
    name: string;
    academic_title?: string;
    nip?: string;
    nidn?: string;
    email: string;
    phone?: string;
    photo_url?: string;
    media_id?: number | null;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
    translations?: {
        id?: LecturerTranslation;
        en?: LecturerTranslation;
    };
    contact?: Contact | null;
    media?: Media | null;
}

export type Contact = {
    email: string;
    phone: string;
};

export interface LecturerTranslation {
    language_id: number;
    full_name: string;
    research_interests?: string;
    education_history?: string;
    biography?: string;
}

// Skema untuk terjemahan dosen dalam bahasa Indonesia (wajib)
export const lecturerTranslationIdSchema = z.object({
    language_id: z.number(),
    full_name: z.string().min(1, "Nama lengkap harus diisi"),
    research_interests: z.string().optional(),
    education_history: z.string().optional(),
    biography: z.string().optional(),
});

// Skema untuk terjemahan dosen dalam bahasa Inggris (opsional)
export const lecturerTranslationEnSchema = z.object({
    language_id: z.number(),
    full_name: z.string().optional(),
    research_interests: z.string().optional(),
    education_history: z.string().optional(),
    biography: z.string().optional(),
});

// Skema untuk form data dosen
export const lecturerFormSchema = z.object({
    media_id: z.number().nullable(),
    nip: z.string().optional(),
    nidn: z.string().optional(),
    email: z.string().email("Format email tidak valid"),
    phone: z.string().optional(),
    academic_title: z.string().optional(),
    is_active: z.boolean().default(true),
    translations: z.object({
        id: lecturerTranslationIdSchema,
        en: lecturerTranslationEnSchema,
    }),
});

// Tipe data yang dihasilkan dari skema
export type LecturerFormData = z.infer<typeof lecturerFormSchema>;
export type LecturerTranslationId = z.infer<typeof lecturerTranslationIdSchema>;
export type LecturerTranslationEn = z.infer<typeof lecturerTranslationEnSchema>;
