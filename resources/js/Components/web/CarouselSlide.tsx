import React, { useEffect, useState } from "react";

import { FeaturedNewsList } from "@/Pages/News/_types/featured-images";
import { Slider } from "@/Pages/Slider/_types";

interface HeroSectionProps {
    featuredNews?: FeaturedNewsList;
    defaultSliders: Slider[];
}

export const CarouselSlide = ({
    slide,
    type,
}: {
    slide: any;
    type: "featured" | "default";
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const ImageContent = () => (
        <>
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

            <img
                src={
                    type === "featured"
                        ? slide.slider_image.path
                        : slide.media.paths.original
                }
                alt={
                    type === "featured"
                        ? slide.translations.id.title
                        : slide.media.file_name
                }
                className={`w-full md:h-[694px] h-[400px] object-cover absolute top-0 left-0 transition-opacity duration-500 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsLoaded(true)}
            />

            {type === "featured" && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <a
                            href={`/berita/${slide.translations.id.slug}`}
                            className="bg-white text-green-600 md:px-6 px-4 md:py-3 py-2 rounded-sm font-semibold hover:bg-green-100 inline-block transition duration-300"
                        >
                            Baca Selengkapnya
                        </a>
                    </div>
                </div>
            )}
        </>
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
