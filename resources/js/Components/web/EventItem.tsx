import { Calendar, ChevronRight, Clock } from "lucide-react";
import {Event} from "@/Pages/Event/_types";

interface EventItemProps {
    event: Event;
}

export const EventItem = ({ event }: EventItemProps) => {
    const translation = event.translations.id;

    if (!translation) return null;

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
                src={event.media?.path || "/placeholder.svg"}
                alt={translation.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">
                    {translation.title}
                </h4>
                <div className="flex items-center text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{event.formatted_date}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{new Date(event.start_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <a
                    href={`/agenda/${translation.slug}`}
                    className="text-green-600 font-semibold flex items-center hover:underline"
                >
                    Detail Event{" "}
                    <ChevronRight className="w-4 h-4 ml-1" />
                </a>
            </div>
        </div>
    );
};
