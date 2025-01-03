import { Calendar, Clock, MapPin } from "lucide-react";
import { Event } from "@/Pages/Event/_types";
import { useState } from "react";
import { Card } from "@/Components/ui/card";

interface EventItemProps {
    event: Event;
}

export const EventItem = ({ event }: EventItemProps) => {
    const translation = event.translations.id;
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    if (!translation) return null;

    return (
        <Card className="group overflow-hidden transition-all duration-300 p-2">
            {/* Image */}
            <a
                href={`/agenda/${translation.slug}`}
                className="block w-full h-48 relative overflow-hidden cursor-pointer"
            >
                <img
                    src={event.media?.paths.blur || "/placeholder.svg"}
                    alt={translation.title}
                    width={400}
                    height={200}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        imageLoaded ? "opacity-0" : "opacity-100"
                    }`}
                />
                <img
                    src={event.media?.paths.thumbnail || "/placeholder.svg"}
                    alt={translation.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Category Badge if exists */}
                {event.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-green-100 text-green-600 text-sm rounded-full">
                        {event.category.translations.id?.name}
                    </span>
                )}
            </a>

            {/* Content */}
            <div className="p-6">
                <a
                    href={`/agenda/${translation.slug}`}
                    className="block text-xl font-semibold mb-4 line-clamp-2 min-h-[3.5rem] group-hover:text-green-600 transition-colors"
                >
                    {translation.title}
                </a>

                {/* Event Details */}
                <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.formatted_date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                            {new Date(event.start_date).toLocaleTimeString(
                                "id-ID",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}{" "}
                            -{" "}
                            {new Date(event.end_date).toLocaleTimeString(
                                "id-ID",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                        </span>
                    </div>
                    {event.location && (
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{event.location}</span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};
