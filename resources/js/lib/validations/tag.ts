import * as z from "zod";

export const tagFormSchema = z.object({
    id: z.object({
        name: z.string().min(1, "Tag name in Indonesian is required"),
    }),
    en: z.object({
        name: z.string().optional(),
    }),
});

export type TagFormValues = z.infer<typeof tagFormSchema>;
