
interface FeaturedNewsTranslation {
    title: string;
    slug: string;
}

interface FeaturedNewsTranslations {
    id: FeaturedNewsTranslation;
    en: FeaturedNewsTranslation;
}

interface SliderImage {
    id: number;
    path: string;
}

export interface FeaturedNews {
    id: number;
    translations: FeaturedNewsTranslations;
    slider_image: SliderImage;
    is_featured: boolean;
    featured_expired_date: string;
}

export type FeaturedNewsList = FeaturedNews[];
