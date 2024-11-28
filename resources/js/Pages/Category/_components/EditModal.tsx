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

import { CustomModal } from "@/Components/CustomModal";
import { Category } from "../_types";
import { categoryFormSchema, type CategoryFormValues } from "../_schema";

interface ModalEditProps {
    category: Category;
    isOpen: boolean;
    onClose: (action: string) => void;
}

export const EditCategoryModal = ({
    category,
    isOpen,
    onClose,
}: ModalEditProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            id: {
                name: category.translations.id.name,
            },
            en: {
                name: category.translations.en.name || "",
            },
        },
    });

    const handleClose = () => {
        onClose("no action");
    };

    const onSubmit = async (values: CategoryFormValues) => {
        try {
            setIsLoading(true);

            const response = await axios.put(
                route("admin.category.update", { id: category.id }),
                values
            );

            if (response.data.status) {
                toast.success(response.data.message);
                form.reset();
                onClose("action");
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
            title="Create New Category"
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
                                            placeholder="Enter category name"
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
                                            placeholder="Enter category name"
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
                                "Save Category"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </CustomModal>
    );
};
