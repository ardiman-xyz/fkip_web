import React, { useEffect, useState } from "react";

import { FeaturedNewsList } from "@/Pages/News/_types/featured-images";
import { Slider } from "@/Pages/Slider/_types";
import { Loader } from "lucide-react";

export const CarouselSlide = ({
    slide,
    type,
}: {
    slide: any;
    type: "featured" | "default";
}) => {
    const [isLoaded, setIsLoaded] = useState(true);

    const ImageContent = () => (
        <div className="relative w-full md:h-[694px] h-[400px]">
            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent z-10">
                    <Loader className="animate-spin h-4 w-4 text-white" />
                    <span className="text-sm text-gray-300">Memuat aset</span>
                </div>
            )}
            <img
                src={
                    type === "featured"
                        ? slide.slider_image.path
                        : slide.media.paths.blur
                }
                alt="blur"
                className={`w-full md:h-[694px] h-[400px] object-cover transition-opacity duration-500 ${
                    isLoaded ? "opacity-0" : "opacity-100"
                }`}
            />

            {type === "featured" ? (
                <a href={`/berita/${slide.translations.id.slug}`}>
                    <img
                        src={slide.slider_image.path}
                        alt={slide.translations.id.title}
                        className={`w-full md:h-[694px] h-[400px] object-cover absolute top-0 left-0 transition-opacity duration-500 ${
                            isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => setIsLoaded(true)}
                    />
                </a>
            ) : (
                <img
                    src={slide.media.paths.original}
                    alt={slide.media.file_name}
                    className={`w-full md:h-[694px] h-[400px] object-cover absolute top-0 left-0 transition-opacity duration-500 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setIsLoaded(true)}
                />
            )}
        </div>
    );

    if (type === "default" && slide.url) {
        return (
            <a
                href={slide.url}
                className="relative block"
                rel="noopener noreferrer"
            >
                <ImageContent />
            </a>
        );
    }

    return (
        <div className="relative">
            <ImageContent />
        </div>
    );
};
