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
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import Checkbox from "@/Components/Checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { MediaModal } from "@/Components/MediaModal";
import { Media } from "@/types/app";

const Create = () => {
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

    const [editorContent, setEditorContent] = useState({
        id: "",
        en: "",
    });

    const [title, setTitle] = useState({
        id: "",
        en: "",
    });

    const handleSave = () => {
        console.info(editorContent);
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
            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <div className="grid grid-cols-1 gap-4">
                    <Card className="relative overflow-hidden">
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
                                            <DropdownMenuItem className="cursor-pointer">
                                                <PiCheckFatDuotone className="size-4" />
                                                Save & Publish
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <PiArchiveDuotone className="size-4" />
                                                Draft
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardTitle>
                            <CardDescription>
                                Manage and organize content categories across
                                multiple languages
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2">
                                    <Tabs defaultValue="id" className="w-full">
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
                                            <div className="space-y-2">
                                                <Label>
                                                    Title (Indonesian)
                                                </Label>
                                                <Input
                                                    placeholder="Enter title in Indonesian"
                                                    value={title.id}
                                                    onChange={(e) =>
                                                        setTitle((prev) => ({
                                                            ...prev,
                                                            id: e.target.value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>
                                                    Content (Indonesian)
                                                </Label>
                                                <TiptapEditor
                                                    content={editorContent.id}
                                                    onChange={(content) =>
                                                        setEditorContent(
                                                            (prev) => ({
                                                                ...prev,
                                                                id: content,
                                                            })
                                                        )
                                                    }
                                                />
                                            </div>
                                        </TabsContent>
                                        <TabsContent
                                            value="en"
                                            className="space-y-4 pt-5"
                                        >
                                            <div className="space-y-2">
                                                <Label>Title (English)</Label>
                                                <Input
                                                    placeholder="Enter title in English"
                                                    value={title.en}
                                                    onChange={(e) =>
                                                        setTitle((prev) => ({
                                                            ...prev,
                                                            en: e.target.value,
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Content (English)</Label>
                                                <TiptapEditor
                                                    content={editorContent.en}
                                                    onChange={(content) =>
                                                        setEditorContent(
                                                            (prev) => ({
                                                                ...prev,
                                                                en: content,
                                                            })
                                                        )
                                                    }
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold mb-4">
                                            Article Details
                                        </h2>
                                        <p className="text-sm text-muted-foreground mb-6">
                                            Provide additional information about
                                            your article.
                                        </p>

                                        <div className="space-y-2 mb-4">
                                            <Label>
                                                Featured Image (Optional)
                                            </Label>
                                            <div className="space-y-4">
                                                {selectedMedia ? (
                                                    <div className="relative group">
                                                        <img
                                                            src={`/storage/${selectedMedia.path}`}
                                                            alt={
                                                                selectedMedia.name
                                                            }
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
                                                            >
                                                                Change
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() =>
                                                                    setSelectedMedia(
                                                                        null
                                                                    )
                                                                }
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
                                                        className="w-full h-32 flex flex-col items-center justify-center"
                                                    >
                                                        <PiImageDuotone className="size-8 mb-2 text-muted-foreground" />
                                                        <span>
                                                            Choose from Media
                                                            Library
                                                        </span>
                                                    </Button>
                                                )}

                                                <MediaModal
                                                    isOpen={isMediaModalOpen}
                                                    onClose={() =>
                                                        setIsMediaModalOpen(
                                                            false
                                                        )
                                                    }
                                                    onSelect={(media) => {
                                                        setSelectedMedia(media);
                                                        setIsMediaModalOpen(
                                                            false
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Category</Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="news">
                                                            News
                                                        </SelectItem>
                                                        <SelectItem value="events">
                                                            Events
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Publish Date</Label>
                                                <Input type="date" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Author</Label>
                                                <Input placeholder="Enter author's name" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Tags</Label>
                                                <Input
                                                    placeholder="Enter tags separated by commas"
                                                    className="mb-1"
                                                />
                                                <p className="text-sm text-muted-foreground">
                                                    Add relevant tags to help
                                                    categorize your article.
                                                </p>
                                            </div>

                                            <div className="pt-2">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="featured" />
                                                    <div className="grid gap-1.5 leading-none">
                                                        <label
                                                            htmlFor="featured"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            Featured Article
                                                        </label>
                                                        <p className="text-sm text-muted-foreground">
                                                            This article will
                                                            appear in the
                                                            featured section of
                                                            the homepage.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Authenticated>
    );
};

export default Create;
