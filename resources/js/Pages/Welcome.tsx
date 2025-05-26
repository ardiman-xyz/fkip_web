import Guest2 from "@/Layouts/GuestLayout2";
import { Head } from "@inertiajs/react";
import { News } from "@/Pages/News/_types";
import { Event } from "@/Pages/Event/_types";
import { NewsSection } from "@/Components/web/News";
import { EventSection } from "@/Components/web/EventSection";
import HeroSection from "@/Components/web/HeroSection";
import { FeaturedNewsList } from "@/Pages/News/_types/featured-images";
import { Slider } from "@/Pages/Slider/_types";
import FeaturedProgramsSection from "./Web/_components/FeaturedProgramsSection";
import ImportantInfoSection from "./Web/_components/ImportantInfoSection";
import AnnouncementSection from "./Web/_components/AnnouncementSection";

interface Announcement {
    id: number;
    title: string;
    content?: string;
    excerpt?: string;
    image?: string;
    priority: "low" | "normal" | "high" | "urgent";
    date: string;
    formatted_date: string;
    isNew: boolean;
    action?: {
        type: "download" | "view" | "register";
        url: string;
        label: string;
    };
    translations: {
        id?: {
            title: string;
            content: string;
            excerpt: string;
        };
        en?: {
            title: string;
            content: string;
            excerpt: string;
        };
    };
}

interface WelcomeProps {
    news: News[];
    events: Event[];
    featuredNews: FeaturedNewsList;
    defaultSliders: Slider[];
    announcements: Announcement[];
}

export default function Welcome({
    news,
    events,
    featuredNews,
    defaultSliders,
    announcements,
}: WelcomeProps) {
    return (
        <Guest2>
            <Head title="Home" />
            <HeroSection
                featuredNews={featuredNews}
                defaultSliders={defaultSliders}
            />
            <FeaturedProgramsSection />
            <ImportantInfoSection />
            <AnnouncementSection announcements={announcements} />
            <NewsSection news={news} />
            <EventSection events={events} />
        </Guest2>
    );
}
