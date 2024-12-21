import {
    PiArchiveDuotone,
    PiArrowLeftDuotone,
    PiCheckDuotone,
    PiCheckFatDuotone,
    PiImageDuotone,
    PiNewspaperDuotone,
} from "react-icons/pi";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TiptapEditor } from "@/Components/TiptapEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Check, ChevronDown, X } from "lucide-react";
import { MediaModal } from "@/Components/MediaModal";
import { Media } from "@/types/app";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CategoryLabelValues,
    newsFormSchema,
    type NewsFormValues,
} from "./_types";
import axios from "axios";
import { toast } from "sonner";
import { TagLabelValues } from "../Tag/_types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

import { MultiSelect } from "@/Components/MultiSelect";
import FeaturedModal from "@/Pages/News/_components/FeaturedModal";

interface Props {
    categories: CategoryLabelValues[];
    tags: TagLabelValues[];
}

const Create = ({ categories, tags }: Props) => {
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false);
    const [sliderImage, setSliderImage] = useState<Media | null>(null);
    const [featuredExpiredDate, setFeaturedExpiredDate] = useState('');

    const form = useForm<NewsFormValues>({
        resolver: zodResolver(newsFormSchema),
        defaultValues: {
            id: {
                title: "",
                content: "",
            },
            en: {
                title: "",
                content: "",
            },
            category_id: "",
            featured_image: null,
            is_featured: false,
            status: "draft",
            publish_date: new Date().toISOString().split("T")[0],
            tags: [],
            featured_expired_date: new Date().toISOString().split("T")[0],
            slider_image: null,
        },
    });


    const onSubmit = async (values: NewsFormValues) => {
        if (isSubmitting) return;

        try {
            form.setValue("status", values.status);
            setIsSubmitting(true);

            const response = await axios.post(route("admin.news.store"), {
                ...values,
                featured_image: values.featured_image?.id, // Ambil hanya ID dari media
            });

            if (response.data.status) {
                toast.success(response.data.message);
                router.get(route("admin.news.index"));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message || "Failed to save news";
                toast.error(errorMessage);

                if (error.response?.status === 422) {
                    const errors = error.response.data.errors;

                    Object.keys(errors).forEach((key) => {
                        form.setError(key as any, {
                            type: "manual",
                            message: errors[key][0],
                        });
                    });
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Authenticated
            header={
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={() => router.get(route("admin.news.index"))}
                        size="icon"
                    >
                        <PiArrowLeftDuotone className="size-4" />
                    </Button>
                    <h2 className="text-2xl font-black ml-2">Create News</h2>
                </div>
            }
        >
            <Head title="News Management" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 p-4"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                <div className="flex items-center gap-x-2">
                                    <PiNewspaperDuotone className="size-7" />
                                    <span>News</span>
                                </div>
                                <div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button>
                                                Save As
                                                <ChevronDown className="size-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    form.setValue(
                                                        "status",
                                                        "published"
                                                    );
                                                    form.handleSubmit(
                                                        onSubmit
                                                    )();
                                                }}
                                            >
                                                <PiCheckFatDuotone className="size-4" />
                                                Save & Publish
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    form.setValue(
                                                        "status",
                                                        "draft"
                                                    );
                                                    form.handleSubmit(
                                                        onSubmit
                                                    )();
                                                }}
                                            >
                                                <PiArchiveDuotone className="size-4" />
                                                Draft
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2">
                                    <Tabs defaultValue="id">
                                        <TabsList>
                                            <TabsTrigger value="id">
                                                Indonesian
                                            </TabsTrigger>
                                            <TabsTrigger value="en">
                                                English
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent
                                            value="id"
                                            className="space-y-4 pt-5"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="id.title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Title (Indonesian)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter title in Indonesian"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="id.content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Content (Indonesian)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <TiptapEditor
                                                                content={
                                                                    field.value ||
                                                                    ""
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TabsContent>

                                        <TabsContent
                                            value="en"
                                            className="space-y-4 pt-5"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="en.title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Title (English)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Enter title in English"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="en.content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Content (English)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <TiptapEditor
                                                                content={
                                                                    field.value ||
                                                                    ""
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TabsContent>
                                    </Tabs>
                                </div>

                                <div className="">
                                    <div className="space-y-6">
                                        <h2 className="text-lg font-semibold mb-4">
                                            Article Details
                                        </h2>

                                        <FormField
                                            control={form.control}
                                            name="featured_image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Featured Image
                                                    </FormLabel>
                                                    <FormControl>
                                                        <div className="space-y-4">
                                                            {field.value ? (
                                                                <div className="relative group">
                                                                    <img
                                                                        src={
                                                                            field
                                                                                .value
                                                                                .path
                                                                        }
                                                                        alt="Featured"
                                                                        className="w-full h-32 object-cover rounded-lg"
                                                                    />
                                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                                        <Button
                                                                            size="sm"
                                                                            variant="secondary"
                                                                            onClick={() =>
                                                                                setIsMediaModalOpen(
                                                                                    true
                                                                                )
                                                                            }
                                                                            type="button"
                                                                        >
                                                                            Change
                                                                        </Button>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="destructive"
                                                                            onClick={() =>
                                                                                field.onChange(
                                                                                    null
                                                                                )
                                                                            }
                                                                            type="button"
                                                                        >
                                                                            Remove
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() =>
                                                                        setIsMediaModalOpen(
                                                                            true
                                                                        )
                                                                    }
                                                                    className="w-full h-32"
                                                                    type="button"
                                                                >
                                                                    <PiImageDuotone className="size-8" />
                                                                    Choose Image
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="category_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Category
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        defaultValue={
                                                            field.value
                                                        }
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a category" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {categories.map(
                                                                (category) => (
                                                                    <SelectItem
                                                                        key={
                                                                            category.value
                                                                        }
                                                                        value={category.value.toString()}
                                                                        className="capitalize"
                                                                    >
                                                                        {
                                                                            category.label
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="tags"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tags</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <MultiSelect
                                                                    options={
                                                                        tags
                                                                    }
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onChange={
                                                                        field.onChange
                                                                    }
                                                                    placeholder="Select tags..."
                                                                    searchPlaceholder="Search tags..."
                                                                    disabled={
                                                                        isSubmitting
                                                                    }
                                                                />
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-full p-0"></PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="publish_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Publish Date
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="is_featured"
                                            render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <input
                                                        type="checkbox"
                                                        checked={field.value}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setIsFeaturedModalOpen(true);
                                                            } else {
                                                                field.onChange(false);
                                                                setSliderImage(null);
                                                                setFeaturedExpiredDate('');
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>Featured Article</FormLabel>
                                                    <FormDescription>
                                                        This article will appear in the slider section
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                            />
                                        {
                                            sliderImage && (
                                                <div className="flex justify-between items-center text-sm text-gray-500">
                                                    <span>Featured until: {new Date(featuredExpiredDate).toLocaleDateString()}</span>
                                                    <span>Size: 1920x694</span>
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>

            <MediaModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onSelect={(media) => {
                    form.setValue("featured_image", media);
                    setIsMediaModalOpen(false);
                }}
            />
            <FeaturedModal
                isOpen={isFeaturedModalOpen}
                onClose={() => {
                    setIsFeaturedModalOpen(false);
                }}
                onConfirm={({ image, expiredDate }) => {
                    setSliderImage(image);
                    setFeaturedExpiredDate(expiredDate);
                    form.setValue('is_featured', true);
                    form.setValue('slider_image', image);
                    form.setValue('featured_expired_date', expiredDate);
                }}
                defaultImage={sliderImage}
                defaultExpiredDate={featuredExpiredDate}
            />
        </Authenticated>
    );
};

export default Create;
