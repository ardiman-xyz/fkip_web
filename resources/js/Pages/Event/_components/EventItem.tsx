import { Calendar, Globe, MapPin } from "lucide-react";
import { Event } from "../_types";
import {
    PiCalendarDuotone,
    PiGlobeDuotone,
    PiGlobeHemisphereEastDuotone,
    PiGlobeHemisphereEastFill,
    PiImageDuotone,
    PiMapPinLineDuotone,
    PiNotePencilDuotone,
    PiTrashDuotone,
} from "react-icons/pi";
import { Button } from "@/Components/ui/button";
import { stripHtml, truncateText } from "@/lib/htmlUtils";
import { useState } from "react";
import { DeleteConfirm } from "@/Components/DeleteConfirmation";
import { router } from "@inertiajs/react";

const getStatusColor = (status: string) => {
    switch (status) {
        case "upcoming":
            return "bg-green-100 text-green-700";
        case "ongoing":
            return "bg-blue-100 text-blue-700";
        case "completed":
            return "bg-gray-100 text-gray-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

const getStatusText = (status: string) => {
    switch (status) {
        case "upcoming":
            return "Upcoming";
        case "ongoing":
            return "Ongoing";
        case "completed":
            return "Completed";
        default:
            return status;
    }
};
interface Props {
    data: Event;
}

const EventItem = ({ data }: Props) => {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

    const content = data.translations.id?.content
        ? truncateText(stripHtml(data.translations.id.content))
        : "No description available";

    const hasIndonesianContent = !!(
        data.translations.id?.title || data.translations.id?.content
    );
    const hasEnglishContent = !!(
        data.translations.en?.title || data.translations.en?.content
    );
    return (
        <div className="flex bg-white rounded-lg  transition-all gap-6 overflow-hidden">
            <div className="p-4">
                {data.media ? (
                    <div className="w-48 h-48 flex-shrink-0 overflow-hidden">
                        <img
                            src={data?.media?.url}
                            alt="Event cover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-48 h-48 flex flex-col items-center justify-center bg-gray-100">
                        <PiImageDuotone className="size-8 text-muted-foreground" />
                        <p className="text-sm font-semibold text-muted-foreground">
                            No Image
                        </p>
                    </div>
                )}
            </div>

            <div className="flex-1 p-4 pr-6">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg truncate capitalize">
                                {data.translations.id.title}
                            </h3>
                            <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                    data.event_status
                                )}`}
                            >
                                {getStatusText(data.event_status)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <PiCalendarDuotone className="w-4 h-4" />
                            <span>{data.formatted_date}</span>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 text-sm">
                                <PiMapPinLineDuotone className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700 capitalize">
                                    {data.type} Event
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PiGlobeDuotone className="w-4 h-4 text-gray-500" />
                                <div className="flex gap-1">
                                    {hasIndonesianContent && (
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                            ID
                                        </span>
                                    )}
                                    {hasEnglishContent && (
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                            EN
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2 mb-4 capitalize">
                            {content}
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={() =>
                            router.get(route("admin.events.edit", data.id))
                        }
                    >
                        <PiNotePencilDuotone className="size-4" />
                    </Button>
                    <Button
                        onClick={() => setIsModalDeleteOpen(true)}
                        variant={"outline"}
                        size={"icon"}
                    >
                        <PiTrashDuotone className="size-4" />
                    </Button>
                    <button className="px-4 py-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 ml-auto flex items-center gap-x-2">
                        <PiGlobeHemisphereEastFill className="size-4 " />
                        <span>Visit site</span>
                    </button>
                </div>
            </div>
            {isModalDeleteOpen && (
                <DeleteConfirm
                    onClose={() => setIsModalDeleteOpen(false)}
                    id={data.id}
                    routeAction="admin.events.destroy"
                />
            )}
        </div>
    );
};

export default EventItem;
