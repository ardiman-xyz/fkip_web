import { Category } from "@/Pages/Category/_types";
import { Tag } from "@/Pages/Tag/_types";
import * as z from "zod";

export const newsFormSchema = z.object({
    id: z.object({
        title: z.string().min(1, "Title in Indonesian is required"),
        content: z.string().refine((value) => {
            // Check if content is empty HTML or only contains empty paragraph
            return (
                value !== "" &&
                value !== "<p></p>" &&
                value !== "<p><br></p>" &&
                value.trim().length > 0
            );
        }, "Content in Indonesian is required"),
    }),
    en: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    }),
    category_id: z.string().min(1, "Category is required"),
    featured_image: z.any().optional(),
    is_featured: z.boolean().default(false),
    status: z.enum(["draft", "published"]).default("draft"),
    publish_date: z.string().min(1, "Publish date is required"),
    tags: z.array(z.string()).default([]),
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;

export type CategoryLabelValues = {
    value: number;
    label: string;
};

type Translation = {
    title?: string | null;
    slug?: string | null;
    content?: string | null;
};

type LanguageTranslations<T> = {
    id?: T;
    en?: T;
};

type Media = {
    id: number;
    file_name: string;
    mime_type: string;
    path: string;
    size: number;
    url: string;
};

export type News = {
    id: number;
    translations: LanguageTranslations<Translation>;
    media: Media;
    category: Category | null;
    tags: {
        value: string;
        label: string;
    }[];
    status: string;
    path: string;
    is_featured: boolean;
    publish_date: string | null;
    created_at: string;
    updated_at: string;
};
