// _types/staff.ts
export type StaffTranslation = {
    locale: string;
    full_name: string;
    position: string | null;
};

export type StaffMedia = {
    id: number;
    path: string | null;
};

export type Staff = {
    id: number;
    nip: string | null;
    unit: string | null;
    is_active: boolean;
    media_id: number | null;
    created_at: string;
    updated_at: string;
    media: StaffMedia | null;
    translations: {
        [key: string]: StaffTranslation;
    };
};
