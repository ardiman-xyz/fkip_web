import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

import React from "react";
import { PiCalendarDuotone } from "react-icons/pi";
import { Event } from "./_types";
import EventItem from "./_components/EventItem";

interface IndexProps {
    events: Event[];
}

const Index = ({ events }: IndexProps) => {
    console.info(events);

    return (
        <Authenticated
            header={<h2 className="text-2xl font-black">Event Management</h2>}
        >
            <Head title="Event Management" />
            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <div className="grid grid-cols-1 gap-4">
                    <Card>
                        <CardContent className="relative overflow-hidden">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                    <div className="flex items-center gap-x-2">
                                        <PiCalendarDuotone className="size-7" />

                                        <span>Content Event</span>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={() =>
                                                router.get(
                                                    route("admin.events.create")
                                                )
                                            }
                                        >
                                            Add event
                                        </Button>
                                    </div>
                                </CardTitle>
                                <CardDescription>
                                    Manage and organize content event across
                                    multiple languages
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="relative flex flex-col gap-y-5">
                                {events.map((event) => (
                                    <EventItem key={event.id} data={event} />
                                ))}
                            </CardContent>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
