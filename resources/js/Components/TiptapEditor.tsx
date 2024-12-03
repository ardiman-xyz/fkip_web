import { useEditor, EditorContent } from "@tiptap/react";
import ImageResize from "tiptap-extension-resize-image";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/Components/ui/button";
import {
    PiAlignCenterHorizontalDuotone,
    PiAlignLeftDuotone,
    PiAlignRightDuotone,
    PiImageDuotone,
    PiLinkSimpleDuotone,
    PiListBulletsDuotone,
    PiListNumbersDuotone,
    PiQuotesDuotone,
    PiTextAlignJustifyDuotone,
    PiTextBBold,
    PiTextH,
    PiTextHDuotone,
    PiTextItalicDuotone,
    PiTextStrikethroughDuotone,
} from "react-icons/pi";
import { ChevronDown } from "lucide-react";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { useState } from "react";
import { Media } from "@/types/app";
import { MediaModal } from "./MediaModal";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface TiptapEditorProps {
    content: string;
    onChange?: (content: string) => void;
    disabled?: boolean;
}

export function TiptapEditor({
    content,
    onChange,
    disabled = false,
}: TiptapEditorProps) {
    const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            OrderedList,
            ListItem,
            BulletList,
            Image,
            ImageResize,
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        editable: !disabled,
    });

    const handleImageSelect = (media: Media) => {
        if (editor) {
            editor
                .chain()
                .focus()
                .setImage({
                    src: `/storage/${media.path}`,
                })
                .run();
        }
        setIsMediaModalOpen(false);
    };

    if (!editor) return null;

    const LinkButton = () => {
        const [value, setValue] = useState(
            editor?.getAttributes("link").href || ""
        );

        const onChange = (href: string) => {
            editor
                ?.chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href })
                .run();
            setValue("");
        };

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="sm">
                        <PiLinkSimpleDuotone className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                    <Input
                        placeholder="https://example.com"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button onClick={() => onChange(value)}>Apply</Button>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    const AlignButton = () => {
        const aligments = [
            {
                label: "Align Left",
                value: "left",
                icon: PiAlignLeftDuotone,
            },
            {
                label: "Align Center",
                value: "center",
                icon: PiAlignCenterHorizontalDuotone,
            },
            {
                label: "Align Right",
                value: "right",
                icon: PiAlignRightDuotone,
            },
            {
                label: "Align Justify",
                value: "justify",
                icon: PiTextAlignJustifyDuotone,
            },
        ];

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button type="button" variant="outline" size="sm">
                        <PiAlignLeftDuotone className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                    {aligments.map(({ label, value, icon: Icon }) => (
                        <button
                            key={value}
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setTextAlign(value)
                                    .run()
                            }
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.isActive({ textAlign: value }) &&
                                    "bg-neutral-200/80"
                            )}
                        >
                            <Icon className="size-4" />
                            <span className="text-sm">{label}</span>
                        </button>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (
        <div className="border rounded-md">
            <div className="border-b p-2 flex flex-wrap items-center gap-1">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    data-active={editor.isActive("bold")}
                    disabled={disabled}
                >
                    <PiTextBBold className="size-4" />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    data-active={editor.isActive("italic")}
                    disabled={disabled}
                >
                    <PiTextItalicDuotone className="size-4" />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    data-active={editor.isActive("strike")}
                    disabled={disabled}
                >
                    <PiTextStrikethroughDuotone className="size-4" />
                </Button>

                <div className="w-px h-6 bg-border mx-1" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            disabled={disabled}
                        >
                            <PiTextHDuotone className="size-4" />
                            <ChevronDown className="size-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run()
                            }
                            data-active={editor.isActive("heading", {
                                level: 1,
                            })}
                            className="gap-2"
                        >
                            <PiTextH className="size-4" />
                            Heading 1
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 2 })
                                    .run()
                            }
                            data-active={editor.isActive("heading", {
                                level: 2,
                            })}
                            className="gap-2"
                        >
                            <PiTextH className="size-4" />
                            Heading 2
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run()
                            }
                            data-active={editor.isActive("heading", {
                                level: 3,
                            })}
                            className="gap-2"
                        >
                            <PiTextH className="size-4" />
                            Heading 3
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                editor.chain().focus().setParagraph().run()
                            }
                            data-active={editor.isActive("paragraph")}
                            className="gap-2"
                        >
                            <PiTextH className="size-4" />
                            Normal Text
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    data-active={editor.isActive("bulletList")}
                    disabled={disabled}
                >
                    <PiListBulletsDuotone className="size-4" />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    data-active={editor.isActive("orderedList")}
                    disabled={disabled}
                >
                    <PiListNumbersDuotone className="size-4" />
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    data-active={editor.isActive("blockquote")}
                    disabled={disabled}
                >
                    <PiQuotesDuotone className="size-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsMediaModalOpen(true)}
                    disabled={disabled}
                >
                    <PiImageDuotone className="size-4" />
                </Button>

                <LinkButton />
                <AlignButton />
            </div>

            <EditorContent
                editor={editor}
                className="min-h-[300px] p-4 tiptap prose-base"
            />

            <MediaModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                onSelect={handleImageSelect}
            />
        </div>
    );
}
