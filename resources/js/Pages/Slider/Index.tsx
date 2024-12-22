import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {Head} from "@inertiajs/react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/Components/ui/card";
import {PiNewspaperDuotone} from "react-icons/pi";
import {Button} from "@/Components/ui/button";
import {CreateSlideModal} from "@/Pages/Slider/_components/CreateSlideModal";
import {Slider} from "@/Pages/Slider/_types";
import {SlideItem} from "@/Pages/News/_components/SlideItem";
import {toast} from "sonner";
import axios from "axios";
import {Loader, } from "lucide-react";

interface IndexProps {
    sliders: Slider[]
}

const DefaultComponent = ({sliders }: IndexProps) => {

    const [slides, setSlides] = React.useState<Slider[]>(sliders ||[]);
    const [isModalAddOpen, setIsModalAddOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchSlides = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(route('admin.slider.get'));
            setSlides(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch slides');
        }finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleCreateSuccess = async () => {
        await fetchSlides();
        setIsModalAddOpen(false);
    };


    const handleMoveUp = async (id: number) => {
        try {
            await axios.post(route('admin.slider.move-up', id));
            await fetchSlides();
            toast.success('Slide order updated');
        } catch (error) {
            toast.error('Failed to update slide order');
        }
    };

    const handleMoveDown = async (id: number) => {
        try {
            await axios.post(route('admin.slider.move-down', id));
            await fetchSlides();
            toast.success('Slide order updated');
        } catch (error) {
            toast.error('Failed to update slide order');
        }
    };



    const handleDelete = (id: number) => {
        setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== id));
    };


    return (
        <Authenticated
            header={<h2 className="text-2xl font-black">Slide Content Management</h2>}
        >
            <Head title="News Management" />
            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <div className="grid grid-cols-1 gap-4">
                    <Card className="relative overflow-hidden">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                <div className="flex items-center gap-x-2">
                                    <PiNewspaperDuotone className="size-7" />

                                    <span>Content Slide</span>
                                </div>
                                <div>
                                    <Button onClick={() => setIsModalAddOpen(true)}>
                                        Add slide
                                    </Button>
                                </div>
                            </CardTitle>
                            <CardDescription>
                                Manage and organize your slide image information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative flex flex-col gap-4">
                            {isLoading ? (
                                <Loader className="animate-spin size-8 text-gray-500 mx-auto" />
                            ) : (
                                slides.map((slide, index) => (
                                    <SlideItem
                                        key={slide.id}
                                        id={slide.id}
                                        media={slide.media}
                                        url={slide.url}
                                        order={slide.order}
                                        isFirst={index === 0}
                                        isLast={index === slides.length - 1}
                                        onMoveUp={handleMoveUp}
                                        onMoveDown={handleMoveDown}
                                        onDeleteConfirmed={handleDelete}
                                    />
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <CreateSlideModal
                isOpen={isModalAddOpen}
                onClose={handleCreateSuccess}
            />
        </Authenticated>
    );
};

export default DefaultComponent;
