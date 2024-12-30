export interface Leader {
    id: number;
    media_id: number | null;
    nip: string | null;
    nidn: string | null;
    email: string;
    phone: string | null;
    academic_title: string | null;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    media?: {
        id: number;
        path: string;
    };
    translations: {
        id: LeaderTranslation;
        en: LeaderTranslation;
    };
}

export interface LeaderTranslation {
    language_id: number;
    full_name: string;
    position: string;
    education_history: string;
    research_interests: string | null;
    biography: string;
}

export interface LeaderFormData {
    media_id: number | null;
    nip: string;
    nidn: string;
    email: string;
    phone: string;
    academic_title: string;
    translations: {
        id: LeaderTranslation;
        en: LeaderTranslation;
    };
}
