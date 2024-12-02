import * as z from "zod";

export const eventFormSchema = z.object({
    id: z.object({
        title: z.string().min(1, "Title in Indonesian is required"),
        content: z.string().min(1, "Content in Indonesian is required"),
    }),
    en: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    }),
    category_id: z.string().min(1, "Category is required"),
    featured_image: z.any().optional(),
    is_featured: z.boolean().default(false),
    status: z.enum(["draft", "published"]).default("draft"),
    type: z.enum(["online", "offline", "hybrid"]),
    start_date: z.string(),
    end_date: z.string(),
    location: z.string().optional(),
    platform: z.string().optional(),
    meeting_url: z.string().optional(),
    registration_url: z.string().optional(),
    quota: z.string().optional(),
    is_free: z.boolean().default(true),
    price: z.string().optional(),
    tags: z.array(z.string()).default([]),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
