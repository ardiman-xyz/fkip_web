export type TagTranslation = {
    name: string;
};

export type Tag = {
    id: number;
    translations: {
        id: TagTranslation;
        en: TagTranslation;
    };
};

export type TagLabelValues = {
    value: string;
    label: string;
};
