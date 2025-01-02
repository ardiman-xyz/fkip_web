import { positionOptions } from "../_data";

export const getPositionLabel = (value: string, lang: "id" | "en") => {
    const option = positionOptions[lang].find((opt) => opt.value === value);
    return option?.label || "";
};
