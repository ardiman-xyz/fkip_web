import { useEffect, useState } from "react";
import { PiFolderOpenDuotone, PiNewspaperDuotone } from "react-icons/pi";
import axios from "axios";
import { Head, router } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const Index = () => {
    return (
        <Authenticated
            header={<h2 className="text-2xl font-black">Create Management</h2>}
        >
            <Head title="News Management" />
            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <div className="grid grid-cols-1 gap-4">
                    <Card className="relative overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                <div className="flex items-center gap-x-2">
                                    <PiNewspaperDuotone className="size-7" />

                                    <span>Content News</span>
                                </div>
                                <div>
                                    <Button
                                        onClick={() =>
                                            router.get(
                                                route("admin.news.create")
                                            )
                                        }
                                    >
                                        Add news
                                    </Button>
                                </div>
                            </CardTitle>
                            <CardDescription>
                                Manage and organize content categories across
                                multiple languages
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative flex flex-col gap-2"></CardContent>
                    </Card>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
