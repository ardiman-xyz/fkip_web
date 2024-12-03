export const stripHtml = (html: string | null): string => {
    if (!html) return "";

    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
};

export const truncateText = (text: string, limit: number = 150): string => {
    if (text.length <= limit) return text;

    return text.slice(0, limit).trim() + "...";
};
