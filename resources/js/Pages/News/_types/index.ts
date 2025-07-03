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
        status: z.enum(["draft", "published"]).default("draft"),
        publish_date: z.string().min(1, "Publish date is required"),
        tags: z.array(z.string()).default([]),
        is_featured: z.boolean().default(false).optional(),
        slider_image: z.object({
            id: z.number(),
            path: z.string(),
        }).nullable().optional(),
        featured_expired_date: z.string().optional(),
    }).refine((data) => {
        // Jika is_featured true, maka slider_image harus ada
        if (data.is_featured === true && !data.slider_image) {
            return false;
        }
        return true;
    }, {
        message: "Slider image is required when article is featured",
        path: ["slider_image"],
    }).refine((data) => {
        // Jika is_featured true, maka featured_expired_date harus ada dan valid
        if (data.is_featured === true) {
            if (!data.featured_expired_date) {
                return false;
            }
            const today = new Date();
            const expiryDate = new Date(data.featured_expired_date);
            return expiryDate >= today;
        }
        return true;
    }, {
        message: "Featured expired date is required and must be in the future when article is featured",
        path: ["featured_expired_date"],
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

export type MediaPaths = {
    blur: string;
    original: string;
    thumbnail: string;
};

export type Media = {
    id: number;
    file_name: string;
    mime_type: string;
    path: string;
    size: number;
    url: string;
    paths: MediaPaths;
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
    slider_image: {
        id: number;
        path: string;
    } | null;
    featured_expired_date: string | null;
    publish_date: string | null;
    created_at: string;
    updated_at: string;
};

