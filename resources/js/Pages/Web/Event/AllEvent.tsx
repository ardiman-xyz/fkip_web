// pages/Event/Index.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Calendar, ChevronRight, Filter, MapPin, Search } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Input } from "@/Components/ui/input";

const EventIndex = () => {
    // Data kategori event
    const eventCategories = [
        { id: "all", name: "Semua", count: 45 },
        { id: "seminar", name: "Seminar", count: 12 },
        { id: "workshop", name: "Workshop", count: 8 },
        { id: "webinar", name: "Webinar", count: 15 },
        { id: "pelatihan", name: "Pelatihan", count: 6 },
        { id: "konferensi", name: "Konferensi", count: 4 },
    ];

    // Data dummy events
    const events = [
        {
            id: 1,
            title: "Workshop Pengembangan Aplikasi Mobile untuk Pemula",
            date: "24 Januari 2025",
            time: "14:00 - 16:00 WIB",
            location: "Gedung FKIP Lt. 3",
            category: "Workshop",
            image: "/path/to/image1.jpg",
            isOnline: false,
        },
        {
            id: 2,
            title: "Webinar Strategi Pembelajaran Era Digital",
            date: "26 Januari 2025",
            time: "09:00 - 11:00 WIB",
            location: "Zoom Meeting",
            category: "Webinar",
            image: "/path/to/image2.jpg",
            isOnline: true,
        },
        // ... more events
    ];

    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Breadcrumb */}
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
                                    <BreadcrumbLink>Agenda</BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-8">
                            {/* Header */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold mb-4">
                                    Agenda FKIP
                                </h1>
                                <p className="text-gray-600">
                                    Temukan berbagai kegiatan dan event menarik
                                    yang diselenggarakan oleh FKIP UMK.
                                </p>
                            </div>

                            <div className="grid gap-4 mb-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <Input
                                        placeholder="Cari event..."
                                        className="pl-10"
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* Events List */}
                            <div className="space-y-6">
                                {events.map((event) => (
                                    <Card key={event.id}>
                                        <CardContent className="p-2">
                                            <div className="grid md:grid-cols-12 gap-6">
                                                {/* Event Image */}
                                                <div className="md:col-span-4">
                                                    <div className="h-48 bg-gray-100 relative rounded-l-lg overflow-hidden">
                                                        <img
                                                            src={event.image}
                                                            alt={event.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Event Details */}
                                                <div className="md:col-span-8 p-6">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                                                            {event.category}
                                                        </span>
                                                        <span className="text-sm text-gray-500">
                                                            {event.date}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-semibold mb-3">
                                                        {event.title}
                                                    </h3>

                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <Calendar className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                {event.time}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <MapPin className="w-4 h-4" />
                                                            <span className="text-sm">
                                                                {event.location}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <Button className="w-full">
                                                        Lihat Detail
                                                        <ChevronRight className="w-4 h-4 ml-1" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-12 lg:col-span-4 space-y-6">
                            {/* Categories */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">
                                        Kategori Event
                                    </h3>
                                    <div className="space-y-2">
                                        {eventCategories.map((category) => (
                                            <div
                                                key={category.id}
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

                            {/* Calendar */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold mb-4">
                                        <Calendar className="w-5 h-5 inline-block mr-2 text-green-600" />
                                        Kalender Event
                                    </h3>
                                    {/* Calendar component similar to detail page */}
                                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                        {[
                                            "M",
                                            "S",
                                            "S",
                                            "R",
                                            "K",
                                            "J",
                                            "S",
                                        ].map((day, idx) => (
                                            <div
                                                key={idx}
                                                className="text-sm font-medium text-gray-500"
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">
                                        {[...Array(31)].map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`aspect-square flex items-center justify-center text-sm rounded-full
                                                    ${
                                                        idx === 15
                                                            ? "bg-green-600 text-white"
                                                            : "hover:bg-gray-100"
                                                    }`}
                                            >
                                                {idx + 1}
                                            </div>
                                        ))}
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

export default EventIndex;
