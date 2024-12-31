import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/Components/ui/carousel";
import { FeaturedNewsList } from "@/Pages/News/_types/featured-images";
import { Slider } from "@/Pages/Slider/_types";
import { CarouselSlide } from "@/Components/web/CarouselSlide";

interface HeroSectionProps {
    featuredNews?: FeaturedNewsList;
    defaultSliders: Slider[];
}
const HeroSection = ({
    featuredNews = [],
    defaultSliders = [],
}: HeroSectionProps) => {
    // Add default empty array
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);
    const [isTabActive, setIsTabActive] = React.useState(true);

    const validFeaturedNews = featuredNews.filter((news) => {
        if (!news.featured_expired_date) return false;
        const expiryDate = new Date(news.featured_expired_date);
        return expiryDate > new Date();
    });

    const allSlides = [
        ...validFeaturedNews.map((news) => ({
            type: "featured" as const,
            data: news,
        })),
        ...defaultSliders.map((slider) => ({
            type: "default" as const,
            data: slider,
        })),
    ];

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabActive(!document.hidden);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);

    useEffect(() => {
        if (!api) return;

        let intervalId: NodeJS.Timeout | null = null;

        // Hanya jalankan interval jika tidak dipause dan tab aktif
        if (!isPaused && isTabActive) {
            intervalId = setInterval(() => {
                api.scrollNext();
            }, 8000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [api, isPaused, isTabActive]);

    useEffect(() => {
        if (!api) return;

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div
            className="relative w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {allSlides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <CarouselSlide
                                slide={slide.data}
                                type={slide.type}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="hidden md:block">
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {allSlides.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                                current === index
                                    ? "bg-white scale-125"
                                    : "bg-white/50"
                            }`}
                            onClick={() => api?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    );
};

export default HeroSection;
