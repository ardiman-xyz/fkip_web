// resources/js/Pages/Admin/StudyProgram/_components/DetailTabs/DescriptionTab.tsx
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { PiPlusDuotone, PiPencilSimpleDuotone } from "react-icons/pi";
import { useState } from "react";
import DescriptionModal from "../_components/DescriptionModal";
import { StudyProgramDescription } from "../_types/program-studi";

interface DescriptionTabProps {
    description?: StudyProgramDescription | null;
    studyProgramId: number;
}

const DescriptionTab = ({
    description,
    studyProgramId,
}: DescriptionTabProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDescription, setCurrentDescription] =
        useState<StudyProgramDescription | null>(description || null);

    const handleSuccess = (updatedDescription: StudyProgramDescription) => {
        setCurrentDescription(updatedDescription);
    };

    if (!currentDescription) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <p className="text-gray-500 text-center">
                    Belum ada informasi deskripsi dan akreditasi untuk program
                    studi ini.
                </p>
                <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
                    <PiPlusDuotone className="h-4 w-4" />
                    Tambah Deskripsi
                </Button>

                <DescriptionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleSuccess}
                    studyProgramId={studyProgramId}
                    initialData={null}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">
                            Deskripsi Program Studi
                        </h3>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PiPencilSimpleDuotone className="h-4 w-4" />
                            Edit
                        </Button>
                    </div>

                    {currentDescription.description ? (
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: currentDescription.description,
                            }}
                        />
                    ) : (
                        <p className="text-gray-500 italic">
                            Belum ada deskripsi
                        </p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Akreditasi</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500 font-medium">
                                Akreditasi
                            </h4>
                            <p className="text-base">
                                {currentDescription.accreditation || "-"}
                            </p>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500 font-medium">
                                Tanggal Akreditasi
                            </h4>
                            <p className="text-base">
                                {currentDescription.accreditation_date
                                    ? new Date(
                                          currentDescription.accreditation_date
                                      ).toLocaleDateString("id-ID", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                      })
                                    : "-"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <DescriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                studyProgramId={studyProgramId}
                initialData={currentDescription}
            />
        </div>
    );
};

export default DescriptionTab;
