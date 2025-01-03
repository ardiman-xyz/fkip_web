// pages/Event/Detail.tsx
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import Guest2 from "@/Layouts/GuestLayout2";
import { Calendar, MapPin, Users } from "lucide-react";
import { formatDateToIndonesian } from "@/lib/utils";
import { ShareButtons } from "@/Components/web/ShareButtons";
import { useState } from "react";
import { Event } from "@/Pages/Event/_types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

interface Props {
    event: Event;
}

const Detail = ({ event }: Props) => {
    const translation = event.translations.id || event.translations.en;
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!translation) return null;

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="mb-8">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">
                                        Beranda
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/agenda">
                                        Agenda
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {event.translations.id.title}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="mb-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            {event.category?.translations
                                                .id && (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                                    {
                                                        event.category
                                                            .translations.id
                                                            .name
                                                    }
                                                </span>
                                            )}
                                            <time className="text-sm text-gray-500">
                                                {formatDateToIndonesian(
                                                    event.formatted_date
                                                )}
                                            </time>
                                        </div>
                                        <h1 className="text-3xl font-bold mb-6">
                                            {translation.title}
                                        </h1>
                                    </div>

                                    {event.media?.path && (
                                        <div className="relative mb-6 rounded-lg overflow-hidden">
                                            <img
                                                src={
                                                    event.media?.paths.blur ||
                                                    "/placeholder.svg"
                                                }
                                                alt={
                                                    translation.title ??
                                                    "Gambar"
                                                }
                                                className={`w-full h-[400px] object-cover transition-opacity duration-500 absolute ${
                                                    imageLoaded
                                                        ? "opacity-0"
                                                        : "opacity-100"
                                                }`}
                                            />
                                            <img
                                                src={
                                                    event.media?.path ||
                                                    "/placeholder.svg"
                                                }
                                                alt={
                                                    translation.title ??
                                                    "Gambar"
                                                }
                                                loading="lazy"
                                                className="w-full h-[400px] object-cover"
                                                onLoad={() =>
                                                    setImageLoaded(true)
                                                }
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div
                                        className="prose prose-lg max-w-none mb-8"
                                        dangerouslySetInnerHTML={{
                                            __html: translation.content ?? "",
                                        }}
                                    />

                                    {/* Event Details */}
                                    <Card className="mb-8">
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-semibold mb-6">
                                                Informasi Event
                                            </h3>
                                            <div className="grid gap-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-green-50 rounded-lg">
                                                        <Calendar className="w-5 h-5 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium mb-1">
                                                            Tanggal & Waktu
                                                        </p>
                                                        <p className="text-gray-600">
                                                            {formatDateToIndonesian(
                                                                event.start_date
                                                            )}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            {new Date(
                                                                event.start_date
                                                            ).toLocaleTimeString()}{" "}
                                                            -{" "}
                                                            {new Date(
                                                                event.end_date
                                                            ).toLocaleTimeString()}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-blue-50 rounded-lg">
                                                        <MapPin className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium mb-1">
                                                            {event.type ===
                                                            "online"
                                                                ? "Platform"
                                                                : "Lokasi"}
                                                        </p>
                                                        <p className="text-gray-600">
                                                            {event.location ||
                                                                event.platform}
                                                        </p>
                                                        {event.meeting_url && (
                                                            <a
                                                                href={
                                                                    event.meeting_url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                Link Meeting
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-orange-50 rounded-lg">
                                                        <Users className="w-5 h-5 text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium mb-1">
                                                            Kuota & Biaya
                                                        </p>
                                                        <p className="text-gray-600">
                                                            Kuota: {event.quota}{" "}
                                                            peserta
                                                        </p>
                                                        <p className="text-gray-600">
                                                            Biaya:{" "}
                                                            {event.is_free
                                                                ? "Gratis"
                                                                : `Rp ${event.price}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col gap-4">
                                        {event.registration_url && (
                                            <Button className="w-full">
                                                Daftar Sekarang
                                            </Button>
                                        )}
                                        <ShareButtons
                                            url={window.location.href}
                                            title={translation.title}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            {/* Upcoming Events Card */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Event Mendatang
                                    </h3>
                                    <div className="space-y-4">
                                        {/* Event Item */}
                                        {[1, 2, 3].map((_, idx) => (
                                            <div
                                                key={idx}
                                                className="flex gap-3"
                                            >
                                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex flex-col items-center justify-center">
                                                    <span className="text-green-600 font-semibold">
                                                        24
                                                    </span>
                                                    <span className="text-sm text-gray-600">
                                                        Jan
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                                                        Workshop Metode
                                                        Pembelajaran Aktif
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        14:00 - 16:00 WIB
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Event Categories */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Kategori Event
                                    </h3>
                                    <div className="space-y-2">
                                        {[
                                            { name: "Seminar", count: 12 },
                                            { name: "Workshop", count: 8 },
                                            { name: "Webinar", count: 15 },
                                            { name: "Pelatihan", count: 6 },
                                            { name: "Konferensi", count: 4 },
                                        ].map((category, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between py-2 border-b last:border-0"
                                            >
                                                <span className="text-gray-600">
                                                    {category.name}
                                                </span>
                                                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    {category.count}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Bagikan Event
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Bantu sebarkan informasi event ini ke
                                        rekan-rekan Anda
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            Copy Link
                                        </Button>
                                        <Button className="flex-1">
                                            Share
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Detail;
