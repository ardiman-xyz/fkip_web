import { PiArrowLeftDuotone, PiImageDuotone } from "react-icons/pi";
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

import { TagLabelValues } from "../Tag/_types";
import { CategoryLabelValues } from "../News/_types";
import { Event, eventFormSchema, type EventFormValues } from "./_types";
import axios from "axios";
import { toast } from "sonner";
import { MultiSelect } from "@/Components/MultiSelect";
import Checkbox from "@/Components/Checkbox";
import { Loader2 } from "lucide-react";
import { MediaModal } from "@/Components/MediaModal";
import { formatDateTimeLocal } from "@/lib/utils";

interface Props {
    categories: CategoryLabelValues[];
    tags: TagLabelValues[];
    event: Event;
}
const Edit = ({ categories, tags, event }: Props) => {
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            id: {
                title: event.translations.id.title || "",
                content: event.translations.id.content || "",
            },
            en: {
                title: event.translations.en?.title || "",
                content: event.translations.en?.content || "",
            },
            category_id: event.category.id.toString(),
            featured_image: event.media, // Can't set File object directly
            is_featured: event.is_featured || false,
            status: (event.status as "draft" | "published") || "draft",
            type: (event.type as "offline" | "online") || "offline",
            start_date: formatDateTimeLocal(event.start_date),
            end_date: formatDateTimeLocal(event.end_date),
            location: event.location || "",
            platform: event.platform || "",
            meeting_url: event.meeting_url || "",
            registration_url: event.registration_url || "",
            quota: event.quota?.toString() || "",
            is_free: event.is_free ?? true,
            price: event.price || "",
            tags: event.tags?.map((tag) => tag.id.toString()) || [],
        },
    });

    const onSubmit = async (values: EventFormValues) => {
        try {
            setIsSubmitting(true);
            const response = await axios.put(
                route("admin.events.update", event.id),
                {
                    ...values,
                    featured_image: values.featured_image?.id,
                    price: values.is_free ? null : values.price,
                    start_date: new Date(values.start_date).toISOString(),
                    end_date: new Date(values.end_date).toISOString(),
                }
            );
            if (response.data.status) {
                toast.success(response.data.message);
                router.get(route("admin.events.index"));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message || "Failed to create event"
                );
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
                        onClick={() => router.get(route("admin.events.index"))}
                        size="icon"
                    >
                        <PiArrowLeftDuotone className="size-4" />
                    </Button>
                    <h2 className="text-2xl font-black">Edit Event</h2>
                </div>
            }
        >
            <Head title="Create Event" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 p-4"
                >
                    <div className="grid grid-cols-3 gap-6">
                        {/* Left side - Content */}
                        <div className="col-span-2 space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Content</CardTitle>
                                </CardHeader>
                                <CardContent>
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
                                            className="space-y-4"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="id.title"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Title (ID)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
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
                                                            Content (ID)
                                                        </FormLabel>
                                                        <FormControl>
                                                            <TiptapEditor
                                                                content={
                                                                    field.value ??
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
                                </CardContent>
                            </Card>

                            {/* Event Details Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Start Date */}
                                        <FormField
                                            control={form.control}
                                            name="start_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Start Date
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="datetime-local"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* End Date */}
                                        <FormField
                                            control={form.control}
                                            name="end_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        End Date
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="datetime-local"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Event Type */}
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Event Type
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select event type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="online">
                                                            Online Event
                                                        </SelectItem>
                                                        <SelectItem value="offline">
                                                            Offline Event
                                                        </SelectItem>
                                                        <SelectItem value="hybrid">
                                                            Hybrid Event
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Conditional Fields Based on Type */}
                                    {(form.watch("type") === "offline" ||
                                        form.watch("type") === "hybrid") && (
                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Location
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Event location"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    {(form.watch("type") === "online" ||
                                        form.watch("type") === "hybrid") && (
                                        <div className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="platform"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Platform
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
                                                                    <SelectValue placeholder="Select platform" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="zoom">
                                                                    Zoom Meeting
                                                                </SelectItem>
                                                                <SelectItem value="gmeet">
                                                                    Google Meet
                                                                </SelectItem>
                                                                <SelectItem value="other">
                                                                    Other
                                                                    Platform
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="meeting_url"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Meeting URL
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Meeting link"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right side - Settings */}
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle>Event Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
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
                                                                src={`/storage/${field.value.path}`}
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

                                {/* Category */}
                                <FormField
                                    control={form.control}
                                    name="category_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
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
                                                                {category.label}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Tags */}
                                <FormField
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <MultiSelect
                                                options={tags}
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder="Select tags..."
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Registration Settings */}
                                <FormField
                                    control={form.control}
                                    name="is_free"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-2">
                                            <FormControl>
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel>Free Event</FormLabel>
                                        </FormItem>
                                    )}
                                />

                                {!form.watch("is_free") && (
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Event price"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <FormField
                                    control={form.control}
                                    name="quota"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Participant Quota
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Maximum participants"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="registration_url"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Registration URL
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Registration link"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Featured Status */}
                                <FormField
                                    control={form.control}
                                    name="is_featured"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-2">
                                            <FormControl>
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormLabel>
                                                Featured Event
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                router.get(route("admin.events.index"))
                            }
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Create Event"
                            )}
                        </Button>
                    </div>
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
        </Authenticated>
    );
};

export default Edit;
