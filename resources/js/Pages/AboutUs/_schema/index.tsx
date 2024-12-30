import { z } from "zod";

export const leaderFormSchema = z.object({
    media_id: z.number().nullable(),
    nip: z.string().optional(),
    nidn: z.string().optional(),
    email: z.string().email("Email tidak valid"),
    phone: z.string().optional(),
    academic_title: z.string().optional(),
    translations: z.object({
        id: z.object({
            language_id: z.number(),
            full_name: z.string().min(1, "Nama lengkap harus diisi"),
            position: z.string().min(1, "Jabatan harus diisi"),
            education_history: z
                .string()
                .min(1, "Riwayat pendidikan harus diisi"),
            research_interests: z.string().optional(),
            biography: z.string().min(1, "Biografi harus diisi"),
        }),
        en: z.object({
            language_id: z.number(),
            full_name: z.string().min(1, "Full name is required"),
            position: z.string().min(1, "Position is required"),
            education_history: z
                .string()
                .min(1, "Education history is required"),
            research_interests: z.string().optional(),
            biography: z.string().min(1, "Biography is required"),
        }),
    }),
});

export type LeaderFormData = z.infer<typeof leaderFormSchema>;
