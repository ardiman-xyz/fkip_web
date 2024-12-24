import { Media } from "@/Pages/News/_types";

export interface AccreditationTranslation {
    title: string;
    description: string;
}

export interface Accreditation {
    id: number;
    media: Media;
    year: number;
    is_active: boolean;
    order: number;
    translations: {
        id: AccreditationTranslation;
        en: AccreditationTranslation;
    };
    created_at: string;
    updated_at: string;
}

export interface AccreditationFormData {
    media_id: number | null;
    year: number;
    is_active: boolean;
    translations: {
        id: AccreditationTranslation;
        en: AccreditationTranslation;
    };
}
