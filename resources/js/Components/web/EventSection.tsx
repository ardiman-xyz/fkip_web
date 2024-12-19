import {Event} from "@/Pages/Event/_types";
import { EventItem } from "./EventItem";

interface EventSectionProps {
    events: Event[];
}

export const EventSection = ({ events }: EventSectionProps) => {

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="">
                    <h3 className="text-2xl font-bold mb-8 text-center">
                        Agenda
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                        Berbagai agenda dan agenda mendatang
                    </p>
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
