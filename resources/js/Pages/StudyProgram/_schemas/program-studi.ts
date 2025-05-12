import { z } from "zod";

export const createProgramStudiSchema = z.object({
    name: z.string().min(1, "Nama program studi harus diisi"),
    education_level_id: z
        .number({
            required_error: "Jenjang pendidikan harus dipilih",
            invalid_type_error: "Jenjang pendidikan harus dipilih",
        })
        .positive("Jenjang pendidikan harus dipilih"),
});

export const createEducationLevelSchema = z.object({
    name: z.string().min(1, "Nama jenjang harus diisi"),
    code: z
        .string()
        .min(1, "Kode jenjang harus diisi")
        .max(10, "Kode maksimal 10 karakter"),
});

export type CreateProgramStudiInput = z.infer<typeof createProgramStudiSchema>;
export type CreateEducationLevelInput = z.infer<
    typeof createEducationLevelSchema
>;
