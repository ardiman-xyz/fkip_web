export interface StudyProgram {
    id: number;
    education_level_id: number;
    name: string;
    code?: string;
    short_description?: string;
    accreditation?: string;
    head_of_program?: string;
    contact_email?: string;
    contact_phone?: string;
    logo?: string;
    website_url?: string;
    slug: string;
    order?: number;
    is_active: boolean;
    education_level?: EducationLevel;
}

export interface EducationLevel {
    id: number;
    name: string;
    code: string;
    slug?: string; // Properti opsional
    study_programs?: StudyProgram[]; // Properti opsional
    study_programs_count?: number; // Properti opsional
}

export interface StudyProgramDescription {
    id?: number;
    study_program_id?: number;
    description: string | null;
    vision?: string | null;
    mission?: string | null;
    goals?: string | null;
    competencies?: string | null;
    career_prospects?: string | null;
    accreditation: string | null;
    accreditation_date: string | null;
}

export interface Lecturer {
    id: number;
    name: string;
    nip: string | null;
    nidn: string | null;
    position: string | null;
    education: string | null;
    photo: string | null;
    pivot: {
        role: string | null;
        is_active: boolean;
    };
}
