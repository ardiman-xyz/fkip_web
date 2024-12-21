import React, { useEffect, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/Components/ui/carousel";
import {FeaturedNewsList} from "@/Pages/News/_types/featured-images";

interface HeroSectionProps {
    featuredNews?: FeaturedNewsList;
}

const HeroSection = ({ featuredNews = [] }: HeroSectionProps) => { // Add default empty array
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);

    // Default slides
    const defaultSlides = [
        {
            image: '/images/hero/hero1.jpg',
            title: "Selamat Datang di Fakultas Keguruan dan Ilmu Pendidikan",
            description: "Membentuk Pendidik Profesional untuk Masa Depan Bangsa"
        },
        {
            image: '/images/hero/hero2.jpg',
            title: "Program Studi Unggulan",
            description: "Berbagai Program Studi Terakreditasi untuk Masa Depan Anda"
        },
        {
            image: '/images/hero/hero3.jpg',
            title: "Fasilitas Modern",
            description: "Didukung Fasilitas Pembelajaran Terkini"
        }
    ];

    const validFeaturedNews = featuredNews.filter(news => {
        if (!news.featured_expired_date) return false;
        const expiryDate = new Date(news.featured_expired_date);
        return expiryDate > new Date();
    });

    // Combine featured news dan default slides
    const allSlides = [
        ...validFeaturedNews.map(news => ({
            type: 'featured' as const,
            image: news.slider_image.path,
            title: news.translations.id.title,
            slug: news.translations.id.slug,
        })),
        ...defaultSlides.map(slide => ({
            type: 'default' as const,
            image: slide.image,
            title: slide.title,
            description: slide.description
        }))
    ];

    useEffect(() => {
        if (!api) return;

        let intervalId: NodeJS.Timeout | null = null;

        if (!isPaused) {
            intervalId = setInterval(() => {
                api.scrollNext();
            }, 5000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [api, isPaused]);

    useEffect(() => {
        if (!api) return;

        api.on('select', () => {
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
                            {slide.type === 'featured' ? (
                                <a href={`/berita/${slide.slug}`} >
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full md:h-[694px] h-[400px] object-cover"
                                    />

                                </a>
                            ) : (
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full md:h-[694px] h-[400px] object-cover"
                                    />

                            )}
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
                                current === index ? "bg-white scale-125" : "bg-white/50"
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
