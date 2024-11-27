import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/Components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { DialogTrigger } from "@/Components/ui/dialog";

import { tagFormSchema, type TagFormValues } from "@/lib/validations/tag";
import { CustomModal } from "@/Components/CustomModal";

interface TagFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRefresh: () => void;
}

export const TagFormModal = ({
    isOpen,
    onClose,
    onRefresh,
}: TagFormModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<TagFormValues>({
        resolver: zodResolver(tagFormSchema),
        defaultValues: {
            id: {
                name: "",
            },
            en: {
                name: "",
            },
        },
    });

    const handleClose = () => {
        onClose();
        onRefresh();
    };

    const onSubmit = async (data: TagFormValues) => {
        try {
            setIsLoading(true);

            const response = await axios.post("/admin/tags", data);

            if (response.data.status) {
                toast.success(response.data.message);
                form.reset();
                handleClose();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message || "Something went wrong";
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
            setIsLoading(false);
        }
    };

    return (
        <CustomModal
            title="Create New Tag"
            isOpen={isOpen}
            onClose={handleClose}
            className="max-w-[500px]"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <h3 className="font-semibold">
                            Bahasa Indonesia (Required)
                        </h3>

                        <FormField
                            control={form.control}
                            name="id.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter tag name"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">English (Optional)</h3>

                        <FormField
                            control={form.control}
                            name="en.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter tag name"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <DialogTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                        </DialogTrigger>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Tag"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </CustomModal>
    );
};
