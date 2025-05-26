// File: resources/js/types/announcement.ts

export interface Media {
    id: number;
    name: string;
    path: string;
    paths?: {
        thumbnail?: string;
        medium?: string;
        large?: string;
        [key: string]: string | undefined;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AnnouncementTranslation {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
}

export interface AnnouncementTranslations {
    id: AnnouncementTranslation;
    en: AnnouncementTranslation;
}

export interface AnnouncementAction {
    type: "download" | "view" | "register";
    url: string;
    label: string;
}

export interface Announcement {
    id: number;
    status: "draft" | "published" | "archived";
    priority: "low" | "normal" | "high" | "urgent";
    is_featured: boolean;
    is_pinned: boolean;
    published_at: string | null;
    expires_at: string | null;
    view_count: number;
    action: AnnouncementAction | null;
    created_at: string;
    updated_at: string;
    translations: AnnouncementTranslations;
    media: Media | null;
    author: string;
    pinned_end_date: string | null;
    pinned_start_date: string | null;
    tags: string[];
}

export interface AnnouncementFormData {
    // Indonesian fields
    title_id: string;
    content_id?: string;
    excerpt_id?: string;

    // English fields
    title_en: string;
    content_en?: string;
    excerpt_en?: string;

    // Common fields
    status: "draft" | "published" | "archived";
    priority: "low" | "normal" | "high" | "urgent";
    is_featured: boolean;
    is_pinned: boolean;
    media_id?: number;
    published_at?: string;
    expires_at?: string;
    action_type?: "download" | "view" | "register";
    action_url?: string;
    action_label?: string;
}

export interface AnnouncementForEdit {
    id: number;
    status: "draft" | "published" | "archived";
    priority: "low" | "normal" | "high" | "urgent";
    is_featured: boolean;
    is_pinned: boolean;
    published_at?: string;
    expires_at?: string;
    action?: AnnouncementAction;
    translations: AnnouncementTranslations;
    media?: Media;
    tags: number[];
}

export interface Tag {
    value: number;
    label: string;
}

// Props interfaces for components
export interface AnnouncementIndexProps {
    announcements: Announcement[];
}

export interface AnnouncementCreateProps {
    tags?: Tag[];
}

export interface AnnouncementEditProps {
    announcement: AnnouncementForEdit;
    tags?: Tag[];
}

// API Response interfaces
export interface AnnouncementApiResponse {
    status: boolean;
    message: string;
    data?: Announcement;
}

export interface AnnouncementListResponse {
    status: boolean;
    data: Announcement[];
    meta?: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}
