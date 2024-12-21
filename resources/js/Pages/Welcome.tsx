import Guest2 from "@/Layouts/GuestLayout2";
import { Head, Link } from "@inertiajs/react";
import {News} from "@/Pages/News/_types";
import {Event} from "@/Pages/Event/_types";
import { NewsSection} from "@/Components/web/News";
import {EventSection} from "@/Components/web/EventSection";
import { FeaturesSection} from "@/Components/web/Features";
import HeroSection from "@/Components/web/HeroSection";
import VideoSection from "@/Components/web/VideoSection";

interface WelcomeProps {
    news : News[]
    events: Event[]
}

export default function Welcome({news, events}:  WelcomeProps) {

    return (
        <Guest2>
            <Head title="Home" />
            <HeroSection />
            <FeaturesSection />
            <NewsSection news={news} />
            <EventSection events={events} />
            {/*<VideoSection />*/}
        </Guest2>
    );
}
