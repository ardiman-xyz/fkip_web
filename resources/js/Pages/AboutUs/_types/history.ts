export interface History {
    id: number;
    is_active: boolean;
    translations: {
        id: HistoryTranslation;
        en: HistoryTranslation;
    };
    created_at: string;
    updated_at: string;
}

export interface HistoryTranslation {
    language_id: number;
    title: string;
    content: string;
}

export interface HistoryFormData {
    is_active: boolean;
    translations: {
        id: HistoryTranslation;
        en: HistoryTranslation;
    };
}
