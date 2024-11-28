import { Card, CardContent } from "@/Components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface MediaPreviewProps {
    url: string;
    onRemove: () => void;
}

export function MediaPreview({ url, onRemove }: MediaPreviewProps) {
    return (
        <Card className="relative group">
            <CardContent className="p-2">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                        src={url}
                        alt="Selected media"
                        className="object-cover"
                    />
                    <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={onRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
