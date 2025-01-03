import { Event } from "@/Pages/Event/_types";
import { EventItem } from "./EventItem";
import { Button } from "@/Components/ui/button";
import { ChevronRight } from "lucide-react";

interface EventSectionProps {
    events: Event[];
}

export const EventSection = ({ events }: EventSectionProps) => {
    return (
        <section className="py-16 bg-white">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Agenda Terdekat</h2>
                    <Button
                        variant="outline"
                        className="hidden md:flex items-center gap-2"
                    >
                        Lihat Semua
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventItem key={event.id} event={event} />
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Button variant="outline" className="w-full">
                        Lihat Semua Agenda
                    </Button>
                </div>
            </div>
        </section>
    );
};
