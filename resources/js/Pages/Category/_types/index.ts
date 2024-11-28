export interface Category {
    id: number;
    slug: string;
    image: string | null;
    order: number;
    is_active: boolean;
    translations: {
        id: Translation;
        en: Translation;
    };
    created_at: string;
    updated_at: string;
}

export interface Translation {
    name: string;
    description: string | null;
}
