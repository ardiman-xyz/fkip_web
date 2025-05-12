// resources/js/Pages/Admin/StudyProgram/_components/DescriptionModal.tsx
import { TiptapEditor } from "@/Components/TiptapEditor";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Schema untuk deskripsi dan akreditasi
const descriptionSchema = z.object({
    description: z.string().min(1, "Deskripsi wajib diisi"),
    accreditation: z.string().optional(),
    accreditation_date: z.string().optional(),
});

type DescriptionFormValues = z.infer<typeof descriptionSchema>;

interface StudyProgramDescription {
    id?: number;
    study_program_id?: number;
    description: string | null;
    accreditation: string | null;
    accreditation_date: string | null;
}

interface DescriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (data: StudyProgramDescription) => void;
    studyProgramId: number;
    initialData?: StudyProgramDescription | null;
}

const DescriptionModal = ({
    isOpen,
    onClose,
    onSuccess,
    studyProgramId,
    initialData,
}: DescriptionModalProps) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const form = useForm<DescriptionFormValues>({
        resolver: zodResolver(descriptionSchema),
        defaultValues: {
            description: initialData?.description || "",
            accreditation: initialData?.accreditation || "",
            accreditation_date: initialData?.accreditation_date || "",
        },
    });

    // Mereset formulir ketika modal dibuka/ditutup atau data awal berubah
    useEffect(() => {
        if (isOpen) {
            form.reset({
                description: initialData?.description || "",
                accreditation: initialData?.accreditation || "",
                accreditation_date: initialData?.accreditation_date || "",
            });
        }
    }, [isOpen, initialData, form]);

    const onSubmit = async (values: DescriptionFormValues) => {
        if (isSubmitting) return;

        try {
            setIsSubmitting(true);

            // Jika deskripsi sudah ada, update; jika belum, buat baru
            const url = initialData?.id
                ? `/admin/study-programs/${studyProgramId}/description/${initialData.id}`
                : `/admin/study-programs/${studyProgramId}/description`;

            const method = initialData?.id ? "put" : "post";

            const response = await axios[method](url, values);

            if (response.data.status) {
                toast.success(
                    response.data.message || "Informasi berhasil disimpan"
                );
                onSuccess(response.data.data);
                onClose();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message ||
                    "Gagal menyimpan informasi";
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
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>
                        {initialData?.id ? "Edit" : "Tambah"} Deskripsi
                    </DialogTitle>
                    <DialogDescription>
                        Informasi deskriptif dan akreditasi program studi
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Deskripsi Program</FormLabel>
                                    <FormControl>
                                        <TiptapEditor
                                            content={field.value || ""}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Deskripsi umum program studi
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="accreditation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Akreditasi</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Contoh: A, B, C, Unggul, dll."
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Tingkat akreditasi program studi
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="accreditation_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Tanggal Akreditasi
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Tanggal diperolehnya akreditasi
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="gap-2"
                            >
                                <Save className="size-4" />
                                {isSubmitting ? "Menyimpan..." : "Simpan"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default DescriptionModal;
