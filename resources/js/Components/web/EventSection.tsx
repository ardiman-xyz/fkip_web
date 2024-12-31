import { Event } from "@/Pages/Event/_types";
import { EventItem } from "./EventItem";

interface EventSectionProps {
    events: Event[];
}

export const EventSection = ({ events }: EventSectionProps) => {
    return (
        <section className="py-10 bg-white">
            <div className="container max-w-6xl mx-auto pl-4">
                <div className="">
                    <h3 className="text-2xl font-bold">Agenda</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                    {events.map((event) => (
                        <EventItem key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    );
};
