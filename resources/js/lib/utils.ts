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
