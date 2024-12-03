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

export type Event = {
    id: number;
    translations: Translations;
    formatted_date: string;
    event_status: string;
    category: Category;
    media: Media;
    tags: Tag[];
    status: string;
    is_featured: boolean;
    start_date: string;
    end_date: string;
    location: string;
    type: string;
    platform: null;
    meeting_url: null;
    registration_url: null;
    quota: number;
    is_free: boolean;
    price: null;
    created_at: string;
};

interface Tag {
    id: number;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
}

interface Pivot {
    event_id: number;
    tag_id: number;
}

interface Media {
    id: number;
    name: string;
    file_name: string;
    mime_type: string;
    path: string;
    size: number;
    created_at: string;
    updated_at: string;
    url: string;
}

interface Category {
    id: number;
    translations: Translations2;
}

interface Translations2 {
    id: Id2;
    en: Id2;
}

interface Id2 {
    name: string;
}

interface Translations {
    id: Id;
    en: Id;
}

interface Id {
    title: string;
    slug: string;
    content: string;
}
