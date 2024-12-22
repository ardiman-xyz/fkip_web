import { Button } from "@/Components/ui/button";
import {ChevronUp, ChevronDown, Trash, Loader2} from "lucide-react";
import {Media} from "@/Pages/News/_types";
import {useState} from "react";
import {DeleteConfirm} from "@/Components/DeleteConfirmation";

interface SlideItemProps {
    id: number;
    media: Media;
    url?: string;
    order: number;
    isFirst: boolean;
    isLast: boolean;
    onMoveUp: (id: number) => void;
    onMoveDown: (id: number) => void;
    onDeleteConfirmed: (id: number) => void;
}

export const SlideItem = ({
                       id,
                       media,
                       url,
                       order,
                       isFirst,
                       isLast,
                       onMoveUp,
                       onMoveDown,
                              onDeleteConfirmed,
                   }: SlideItemProps) => {

    const[isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [loadingAction, setLoadingAction] = useState<"up" | "down" | null>(null);

    const deleteConfirm = (id: number) => {
        setIsModalDeleteOpen(true);
    }

    const onDeleteSuccess = (success: boolean) => {
        if (success) {
            onDeleteConfirmed(id);
        }
        setIsModalDeleteOpen(false);
    }

    const handleMoveUp = async () => {
        setLoadingAction("up");
        await onMoveUp(id); // Simpan logika asynchronous di sini
        setLoadingAction(null);
    };

    const handleMoveDown = async () => {
        setLoadingAction("down");
        await onMoveDown(id); // Simpan logika asynchronous di sini
        setLoadingAction(null);
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
            <div className="relative w-64 h-24">
                <img
                    src={media.path}
                    alt="Slide preview"
                    className="w-full h-full object-cover rounded"
                />
            </div>

            <div className="flex-grow">
                <p className="text-sm text-gray-500">Order: {order}</p>
                {url && (
                    <a href={url} target={"_blank"}
                       className="text-sm text-gray-500 truncate cursor-pointer underline ">
                        URL: {url}
                    </a>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleMoveUp}
                    disabled={isFirst || loadingAction === "up" || loadingAction === "down"}
                    className="size-8"
                >
                    {loadingAction === "up" ? (
                        <Loader2 className="animate-spin size-4"/>
                    ) : (
                        <ChevronUp className="size-4"/>
                    )}
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={handleMoveDown}
                    disabled={isLast || loadingAction === "down" || loadingAction === "up"}
                    className="size-8"
                >
                    {loadingAction === "down" ? (
                        <Loader2 className="animate-spin size-4"/>
                    ) : (
                        <ChevronDown className="size-4"/>
                    )}
                </Button>
            </div>

            <div className="flex gap-2">

                <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteConfirm(id)}
                    className="size-8"
                >
                    <Trash className="size-4"/>
                </Button>
            </div>

            {
                isModalDeleteOpen && <DeleteConfirm
                    onClose={() => onDeleteSuccess(true)}
                    id={id}
                    routeAction={"admin.slider.destroy"}
                />
            }
        </div>
    );
};

