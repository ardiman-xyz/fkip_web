import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { PiFolderOpenDuotone } from "react-icons/pi";
import { FormCreateCategory } from "./_components/CreateModal";
import axios from "axios";
import { Category } from "./_types";
import { toast } from "sonner";
import { CategoryTable } from "./_components/CategoryTable";

const Index = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<Category[] | []>([]);

    const fetchTags = async () => {
        try {
            setLoading(true);
            const response = await axios.get(route("admin.category.get"));

            if (response.data.status) {
                setCategories(response.data.data);
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
            header={
                <h2 className="text-2xl font-black">Category Management</h2>
            }
        >
            <Head title="Categories Management" />
            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <div className="grid grid-cols-1 gap-4">
                    <Card className="relative overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                <div className="flex items-center gap-x-2">
                                    <PiFolderOpenDuotone className="size-7" />

                                    <span>Content Categories</span>
                                </div>
                                <div>
                                    <Button
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Add category
                                    </Button>
                                </div>
                            </CardTitle>
                            <CardDescription>
                                Manage and organize content categories across
                                multiple languages
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative flex flex-col gap-2">
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    Loading...
                                </div>
                            ) : (
                                <CategoryTable
                                    data={categories}
                                    onRefresh={fetchTags}
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <FormCreateCategory
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={fetchTags}
            />
        </Authenticated>
    );
};

export default Index;
