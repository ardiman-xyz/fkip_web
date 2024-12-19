import {Calendar, MapPin, Users} from "lucide-react";
import { formatDateToIndonesian } from "@/lib/utils";
import { ShareButtons } from "@/Components/web/ShareButtons";
import { useState } from "react";
import Guest2 from "@/Layouts/GuestLayout2";
import {Event} from "@/Pages/Event/_types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"

interface Props {
    event: Event;
}

const Detail = ({ event }: Props) => {

    const translation = event.translations.id || event.translations.en;
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!translation) return null;

    return (
        <Guest2>
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container max-w-7xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Beranda</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/agenda">Agenda</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{event.translations.id.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                            <div className="relative col-span-1">
                                {event.media?.path && (
                                    <div className=" top-8 relative">
                                        <img
                                            src={event.media?.paths.blur || "/placeholder.svg"}
                                            alt={translation.title ?? "Gambar"}
                                            width={400}
                                            height={200}
                                            className={`w-full h-96 object-cover rounded-md absolute transition-opacity duration-500 ${
                                                imageLoaded ? "opacity-0" : "opacity-100"
                                            }`}
                                        />
                                        <img
                                            src={event.media?.path || "/placeholder.svg"}
                                            alt={translation.title ?? "Gambar"}
                                            width={400}
                                            height={200}
                                            loading="lazy"
                                            className="w-full h-96 object-cover md transition-opacity duration-500"
                                            onLoad={() => setImageLoaded(true)}
                                        />
                                    </div>
                                )}
                            </div>


                            <div className="flex flex-col col-span-2">
                                {/* Category and Date */}
                                <div className="flex items-center gap-4 mb-4">
                                    {event.category?.translations.id && (
                                        <a
                                            href={`/kategori/`}
                                            className="text-green-600 hover:underline"
                                        >
                                            {event.category.translations.id.name}
                                        </a>
                                    )}
                                    <span className="text-gray-400">•</span>
                                    <time className="text-gray-500">
                                        {formatDateToIndonesian(event.formatted_date)}
                                    </time>
                                </div>

                                <h1 className="text-3xl font-bold mb-6">{translation.title}</h1>

                                <div
                                    className="prose prose-lg max-w-none mb-8"
                                    dangerouslySetInnerHTML={{
                                        __html: translation.content ?? "",
                                    }}
                                />

                                {/* Event Details Box */}
                                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                    <h3 className="text-xl font-bold mb-6">Event Detail</h3>
                                    <div className="grid gap-6">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="w-5 h-5 text-gray-500"/>
                                            <div>
                                                <p className="font-medium">Tanggal & Waktu</p>
                                                <p className="text-gray-600">
                                                    {formatDateToIndonesian(event.start_date)}
                                                </p>
                                                <p className="text-gray-600">
                                                    {new Date(event.start_date).toLocaleTimeString()} - {new Date(event.end_date).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-gray-500"/>
                                            <div>
                                                <p className="font-medium">
                                                    {event.type === 'online' ? 'Platform' : 'Lokasi'}
                                                </p>
                                                <p className="text-gray-600">
                                                    {event.location || event.platform}
                                                </p>
                                                {event.meeting_url && (
                                                    <a
                                                        href={event.meeting_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        Link Meeting
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Users className="w-5 h-5 text-gray-500"/>
                                            <div>
                                                <p className="font-medium">Kuota & Biaya</p>
                                                <p className="text-gray-600">
                                                    Kuota: {event.quota} peserta
                                                </p>
                                                <p className="text-gray-600">
                                                    Biaya: {event.is_free ? 'Gratis' : `Rp ${event.price}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Registration Button */}
                                {event.registration_url && (
                                    <div className="flex justify-center mb-8">
                                        <a
                                            href={event.registration_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Daftar Sekarang
                                        </a>
                                    </div>
                                )}

                                {/* Share Buttons */}
                                <ShareButtons
                                    url={window.location.href}
                                    title={translation.title}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Detail;
