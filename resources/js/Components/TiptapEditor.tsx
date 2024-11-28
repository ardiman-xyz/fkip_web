import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/Components/ui/button";
import {
    PiImageDuotone,
    PiListBulletsDuotone,
    PiListNumbersDuotone,
    PiQuotesDuotone,
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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

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
    const editor = useEditor({
        extensions: [StarterKit, OrderedList, ListItem, BulletList, Image],
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

    if (!editor) return null;

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
                    onClick={() => {
                        const url = window.prompt("Enter image URL");
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run();
                        }
                    }}
                    disabled={disabled}
                >
                    <PiImageDuotone className="size-4" />
                </Button>
            </div>

            <EditorContent
                editor={editor}
                className="min-h-[300px] p-4 tiptap prose-base"
            />
        </div>
    );
}
