import { FileText } from "lucide-react";

interface Props {
    title?: string;
    description?: string;
    icon?: React.ElementType;
}

export const EmptyState = ({
    title = "Data Belum Tersedia",
    description = "Data sedang dalam proses penambahan",
    icon: Icon = FileText,
}: Props) => {
    return (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
            <Icon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500">{description}</p>
        </div>
    );
};
