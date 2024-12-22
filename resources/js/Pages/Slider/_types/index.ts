import {Media} from "@/Pages/News/_types";


export type Slider = {
    id: number;
    media: Media;
    url: string;
    order: number;
    is_active: boolean;
}
