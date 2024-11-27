import { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { PiTagSimpleDuotone } from "react-icons/pi";

import Authenticated from "@/Layouts/AuthenticatedLayout";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { TagFormModal } from "./_components/CreateModal";
import { Tag } from "./_types";
import { TagsTable } from "./_components/TableTags";
import axios from "axios";
import { toast } from "sonner";

const Index = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTags = async () => {
        try {
            setLoading(true);
            const response = await axios.get(route("admin.tags.get"));

            if (response.data.status) {
                setTags(response.data.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "Failed to fetch tags"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <Authenticated
            header={<h2 className="text-2xl font-black">Tag Management</h2>}
        >
            <Head title="Tag Management" />
            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <div className="grid grid-cols-1 gap-4">
                    <Card className="relative overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                <div className="flex items-center gap-x-2">
                                    <PiTagSimpleDuotone className="size-7" />

                                    <span>Content Tags</span>
                                </div>
                                <div>
                                    <Button
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Add new tag
                                    </Button>
                                </div>
                            </CardTitle>
                            <CardDescription>
                                Manage and organize content tags across multiple
                                languages
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative flex flex-col gap-2">
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    Loading...
                                </div>
                            ) : (
                                <TagsTable tags={tags} onRefresh={fetchTags} />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <TagFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={fetchTags}
            />
        </Authenticated>
    );
};

export default Index;
