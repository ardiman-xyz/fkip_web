// pages/Event/Index.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Calendar, ChevronRight, MapPin, Search } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { Event } from "@/Pages/Event/_types";
import { EmptyState } from "@/Pages/Web/_components/EmptyState";

interface EventCategory {
    id: string;
    name: string;
    count: number;
}

interface EventIndexProps {
    events?: Event[];
    categories?: EventCategory[];
}

const EventIndex = ({ events = [], categories = [] }: EventIndexProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Filter events based on search and category
    const filteredEvents = events.filter((event) => {
        const translation = event.translations.id || event.translations.en;
        if (!translation) return false;

        const matchesSearch = translation.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "all" ||
            event.category?.translations.id?.name === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    // Default categories if none provided
    const eventCategories =
        categories.length > 0
            ? categories
            : [{ id: "all", name: "Semua", count: events.length }];

    const formatEventDateTime = (startDate: string, endDate: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const formatDate = (date: Date) => {
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        };

        const formatTime = (date: Date) => {
            return date.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            });
        };

        if (start.toDateString() === end.toDateString()) {
            return `${formatDate(start)}, ${formatTime(start)} - ${formatTime(
                end
            )} WIB`;
        } else {
            return `${formatDate(start)} - ${formatDate(end)}`;
        }
    };

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

                    <div className="grid grid-cols-12 gap-8 lg:gap-20">
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

                            {/* Search */}
                            <div className="grid gap-4 mb-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    <Input
                                        placeholder="Cari event..."
                                        className="pl-10"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Events List */}
                            {filteredEvents.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredEvents.map((event) => {
                                        const translation =
                                            event.translations.id ||
                                            event.translations.en;
                                        if (!translation) return null;

                                        return (
                                            <Card
                                                key={event.id}
                                                className="hover:shadow-lg transition-shadow duration-300"
                                            >
                                                <CardContent className="p-2">
                                                    <div className="grid md:grid-cols-12 gap-6">
                                                        <div className="md:col-span-4">
                                                            <div className="h-48 bg-gray-100 relative rounded-l-lg overflow-hidden">
                                                                {event.media
                                                                    ?.paths
                                                                    ?.thumbnail ? (
                                                                    <img
                                                                        src={
                                                                            event
                                                                                .media
                                                                                .paths
                                                                                .thumbnail
                                                                        }
                                                                        alt={
                                                                            translation.title
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                                        <Calendar className="w-8 h-8 text-gray-400" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="md:col-span-8 p-6">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                {event.category
                                                                    ?.translations
                                                                    .id && (
                                                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                                                                        {
                                                                            event
                                                                                .category
                                                                                .translations
                                                                                .id
                                                                                .name
                                                                        }
                                                                    </span>
                                                                )}
                                                                <span className="text-sm text-gray-500">
                                                                    {formatEventDateTime(
                                                                        event.start_date,
                                                                        event.end_date
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                                                                {
                                                                    translation.title
                                                                }
                                                            </h3>

                                                            <div className="space-y-2 mb-4">
                                                                <div className="flex items-center gap-2 text-gray-600">
                                                                    <Calendar className="w-4 h-4" />
                                                                    <span className="text-sm">
                                                                        {new Date(
                                                                            event.start_date
                                                                        ).toLocaleTimeString(
                                                                            "id-ID",
                                                                            {
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            }
                                                                        )}{" "}
                                                                        -{" "}
                                                                        {new Date(
                                                                            event.end_date
                                                                        ).toLocaleTimeString(
                                                                            "id-ID",
                                                                            {
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            }
                                                                        )}{" "}
                                                                        WIB
                                                                    </span>
                                                                </div>
                                                                {(event.location ||
                                                                    event.platform) && (
                                                                    <div className="flex items-center gap-2 text-gray-600">
                                                                        <MapPin className="w-4 h-4" />
                                                                        <span className="text-sm">
                                                                            {event.location ||
                                                                                event.platform}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <a
                                                                href={`/agenda/${translation.slug}`}
                                                            >
                                                                <Button className="w-full">
                                                                    Lihat Detail
                                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                                </Button>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            ) : (
                                <EmptyState
                                    title="Tidak Ada Event"
                                    description={
                                        searchTerm
                                            ? `Tidak ditemukan event dengan kata kunci "${searchTerm}"`
                                            : "Belum ada event yang tersedia saat ini."
                                    }
                                    icon={Calendar}
                                />
                            )}
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
                                            <button
                                                key={category.id}
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        category.id
                                                    )
                                                }
                                                className={`w-full flex items-center justify-between py-2 px-3 rounded-md transition-colors ${
                                                    selectedCategory ===
                                                    category.id
                                                        ? "bg-green-50 text-green-600"
                                                        : "hover:bg-gray-50"
                                                }`}
                                            >
                                                <span className="text-gray-600">
                                                    {category.name}
                                                </span>
                                                <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                    {category.count}
                                                </span>
                                            </button>
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
