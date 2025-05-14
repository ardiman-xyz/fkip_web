import { EducationLevel } from "@/Pages/StudyProgram/_types/program-studi";
import { usePage } from "@inertiajs/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    // Menghitung power yang sesuai
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Konversi ke unit yang sesuai dengan 2 angka desimal
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const formatDateToIndonesian = (dateString: string): string => {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export const formatDateTimeLocal = (dateString: string | null): string => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toISOString().slice(0, 16);
};

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export const isEditorEmpty = (content: string): boolean => {
    return (
        !content ||
        content === "<p></p>" ||
        content === "<p><br></p>" ||
        content.trim().length === 0
    );
};

// resources/js/utils/useSharedData.ts

type PageProps = {
    education_levels: EducationLevel[];
    auth: {
        user: any;
    };
    meta: any;
    app_version: string;
    [key: string]: any;
};

export function useSharedData() {
    const { props } = usePage<PageProps>();

    // Pastikan education_levels adalah array
    const educationLevels: EducationLevel[] = Array.isArray(
        props.education_levels
    )
        ? props.education_levels
        : [];

    const auth = props.auth || {};
    const meta = props.meta || {};
    const appVersion = props.app_version || "v1.0.0";

    return {
        educationLevels,
        auth,
        meta,
        appVersion,
    };
}
