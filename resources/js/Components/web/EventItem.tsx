import { Calendar, ChevronRight, Clock } from "lucide-react";
import {Event} from "@/Pages/Event/_types";
import {useState} from "react";

interface EventItemProps {
    event: Event;
}

export const EventItem = ({ event }: EventItemProps) => {
    const translation = event.translations.id;


    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    if (!translation) return null;

    return (
        <div className="overflow-hidden ">
            <a href={`/agenda/${translation.slug}`}
               className="w-full h-48 flex-shrink-0 relative overflow-hidden group cursor-pointer">
                <img
                    src={event.media?.paths.blur || "/placeholder.svg"}
                    alt={translation.title}
                    width={400}
                    height={200}
                    className={` h-48 object-cover absolute transition-opacity duration-500 ${
                        imageLoaded ? "opacity-0" : "opacity-100"
                    }`}
                />
                <img
                    src={event.media?.paths.thumbnail || "/placeholder.svg"}
                    alt={translation.title}
                    width={400}
                    height={200}
                    className={` h-48 object-cover  transition-transform duration-500 group-hover:scale-110`}
                    onLoad={() => setImageLoaded(true)}
                />
            </a>

            <div className="py-6">
                <a href={`/agenda/${translation.slug}`}
                   className="text-xl font-semibold mb-2 line-clamp-2 min-h-[3.5rem] hover:underline">
                    {translation.title}
                </a>
                <div className="flex items-center text-gray-600 my-2">
                    <Calendar className="w-4 h-4 mr-2"/>
                    <span className={'text-sm'}>{event.formatted_date}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2"/>
                    <span className={'text-sm'}>{new Date(event.start_date).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })} - {new Date(event.end_date).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span>
                </div>
            </div>
        </div>
    );
};
