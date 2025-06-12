import { Event } from "@/Pages/Event/_types";
import { EventItem } from "./EventItem";
import { Button } from "@/Components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";

interface EventSectionProps {
    events: Event[];
}

export const EventSection = ({ events }: EventSectionProps) => {
    return (
        <section className="py-16 bg-white">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Agenda Terdekat</h2>
                    <Link href="/agenda">
                        <Button variant="outline" className="w-full">
                            Lihat Semua
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventItem key={event.id} event={event} />
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Link href="/agenda">
                        <Button variant="outline" className="w-full">
                            Lihat Semua Agenda
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
