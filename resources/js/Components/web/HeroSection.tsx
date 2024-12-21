import React, { useEffect, useState } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/Components/ui/carousel";

const CarouselWithIndicators = () => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);

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

    const slides = [
        {
            bg: "bg-green-700",
            title: "Selamat Datang di Fakultas Keguruan dan Ilmu Pendidikan",
            description: "Membentuk Pendidik Profesional untuk Masa Depan Bangsa"
        },
        {
            bg: "bg-orange-700",
            title: "Program Studi Unggulan",
            description: "Berbagai Program Studi Terakreditasi untuk Masa Depan Anda"
        },
        {
            bg: "bg-violet-700",
            title: "Fasilitas Modern",
            description: "Didukung Fasilitas Pembelajaran Terkini"
        }
    ];

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
                    {slides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <img src={`/images/hero/hero${index+1}.jpg`} alt="gambar"/>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className="hidden md:block">
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
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

export default CarouselWithIndicators;
