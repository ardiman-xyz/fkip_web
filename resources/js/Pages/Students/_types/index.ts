import { Media } from "@/types/app";

export type StudentOrganization = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    logo: Media | null;
    cover_image: Media | null;
    founding_year: string | null;
    email: string | null;
    instagram: string | null;
    is_active: boolean;
    is_featured: boolean;
    order: number;
    created_at: string;
    updated_at: string;
    translations?: OrganizationTranslation[];
    officers?: OrganizationOfficer[];
};

export type OrganizationTranslation = {
    id: number;
    student_organization_id: number;
    language_id: number;
    name: string;
    description: string | null;
    vision: string | null;
    mission: string | null;
};

export type OrganizationOfficer = {
    id: number;
    student_organization_id: number;
    name: string;
    position: string;
    image: string | null;
    period: string;
    is_active: boolean;
    order: number;
};

export type Scholarship = {
    id: number;
    name: string;
    description: string | null;
    provider: string;
    amount: number | string | null;
    amount_formatted?: string;
    requirements: string | null;
    start_date: string;
    end_date: string;
    application_deadline: string;
    quota: number | null;
    is_active: boolean;
    is_featured: boolean;
    contact_person: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    cover_image: string | Media | null;
    cover_image_id?: number | null;
    created_at: string;
    updated_at: string;
};
