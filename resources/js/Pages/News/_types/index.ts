import * as z from "zod";

export const newsFormSchema = z.object({
    id: z.object({
        title: z.string().min(1, "Title in Indonesian is required"),
        content: z.string().optional(),
    }),
    en: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    }),
    category_id: z.string().min(1, "Category is required"),
    featured_image: z.any().optional(),
    is_featured: z.boolean().default(false),
    status: z.enum(["draft", "published"]).default("draft"),
    publish_date: z.string(),
    tags: z.array(z.string()).default([]),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;
