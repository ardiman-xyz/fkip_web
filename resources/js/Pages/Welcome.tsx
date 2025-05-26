import Guest2 from "@/Layouts/GuestLayout2";
import { Head } from "@inertiajs/react";
import { News } from "@/Pages/News/_types";
import { Event } from "@/Pages/Event/_types";
import { NewsSection } from "@/Components/web/News";
import { EventSection } from "@/Components/web/EventSection";
import { FeaturesSection } from "@/Components/web/Features";
import HeroSection from "@/Components/web/HeroSection";
import VideoSection from "@/Components/web/VideoSection";
import { FeaturedNewsList } from "@/Pages/News/_types/featured-images";
import { Slider } from "@/Pages/Slider/_types";
import FeaturedProgramsSection from "./Web/_components/FeaturedProgramsSection";
import ImportantInfoSection from "./Web/_components/ImportantInfoSection";
import AnnouncementSection from "./Web/_components/AnnouncementSection";

interface WelcomeProps {
    news: News[];
    events: Event[];
    featuredNews: FeaturedNewsList;
    defaultSliders: Slider[];
}

export default function Welcome({
    news,
    events,
    featuredNews,
    defaultSliders,
}: WelcomeProps) {
    return (
        <Guest2>
            <Head title="Home" />
            <HeroSection
                featuredNews={featuredNews}
                defaultSliders={defaultSliders}
            />
            <AnnouncementSection />
            <FeaturedProgramsSection />
            <ImportantInfoSection />
            <NewsSection news={news} />
            <EventSection events={events} />
            {/*<VideoSection />*/}
        </Guest2>
    );
}
