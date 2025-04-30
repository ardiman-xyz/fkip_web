import { Card, CardContent } from "@/Components/ui/card";
import { Construction } from "lucide-react";

interface UnderDevelopmentProps {
    title?: string;
    message?: string;
    expectedDate?: string;
}

export const UnderDevelopment = ({
    title = "Halaman Dalam Pengembangan",
    message = "Mohon maaf, halaman ini sedang dalam tahap pengembangan. Silahkan kunjungi kembali dalam beberapa waktu.",
    expectedDate,
}: UnderDevelopmentProps) => {
    return (
        <Card className="max-w-3xl mx-auto my-12 border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <Construction className="h-8 w-8 text-yellow-600" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {title}
                        </h2>
                        <p className="text-gray-600 mb-4">{message}</p>

                        {expectedDate && (
                            <p className="text-sm text-gray-500">
                                Perkiraan selesai:{" "}
                                <span className="font-medium">
                                    {expectedDate}
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
