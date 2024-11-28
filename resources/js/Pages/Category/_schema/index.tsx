// _schema.ts - Export schema sebagai value dan type
import * as z from "zod";

export const categoryFormSchema = z.object({
    id: z.object({
        name: z.string().min(1, "Name in Indonesian is required"),
    }),
    en: z.object({
        name: z.string().optional(),
    }),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
