// resources/js/Pages/Admin/StudyProgram/Index.tsx
import {
    PiGraduationCapDuotone,
    PiPlusDuotone,
    PiDotsThreeVerticalBold,
    PiPencilSimpleDuotone,
    PiTrashDuotone,
    PiEyeDuotone,
} from "react-icons/pi";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AddProgramStudiModal from "./_components/AddProgramStudyModal";

interface StudyProgram {
    id: number;
    name: string;
    program_code: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}

interface EducationLevel {
    id: number;
    name: string;
    code: string;
    slug: string;
    study_programs: StudyProgram[];
    study_programs_count: number;
}

interface Props {
    educationLevels: EducationLevel[];
}

const Index = ({ educationLevels }: Props) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [activeTab, setActiveTab] = useState(
        educationLevels[0]?.code.toLowerCase() || "s1"
    );

    return (
        <Authenticated
            header={
                <h2 className="text-2xl font-black">Informasi Program Studi</h2>
            }
        >
            <Head title="Program Studi" />
            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <div className="grid grid-cols-1 gap-4">
                    <Card className="relative overflow-hidden shadow-none border-none">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                <div className="flex items-center gap-x-2">
                                    <PiGraduationCapDuotone className="size-7" />
                                    <span>Program Studi</span>
                                </div>
                                <div>
                                    <Button
                                        className="flex items-center gap-2"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        <PiPlusDuotone className="size-4" />
                                        Tambah Program Studi
                                    </Button>
                                </div>
                            </CardTitle>
                            <CardDescription>
                                Pengaturan data program studi fakultas beserta
                                informasi akreditasi dan website resmi.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative flex flex-col gap-2">
                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="w-full"
                            >
                                <TabsList className="w-full justify-start">
                                    {educationLevels.map((level) => (
                                        <TabsTrigger
                                            key={level.id}
                                            value={level.code.toLowerCase()}
                                        >
                                            {level.name} ({level.code})
                                            <span className="ml-1 px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                {level.study_programs_count}
                                            </span>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {educationLevels.map((level) => (
                                    <TabsContent
                                        key={level.id}
                                        value={level.code.toLowerCase()}
                                    >
                                        <ProgramList
                                            programs={level.study_programs}
                                        />
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <AddProgramStudiModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                educationLevels={educationLevels}
            />
        </Authenticated>
    );
};

// Component untuk menampilkan list program studi
const ProgramList = ({ programs }: { programs: StudyProgram[] }) => {
    const handleView = (id: number) => {
        router.visit(`/admin/study-programs/${id}`);
    };

    const handleEdit = (id: number) => {
        console.log(`Edit program studi with ID: ${id}`);
        // Implementasi untuk edit program studi
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus program studi ini?")) {
            console.log(`Delete program studi with ID: ${id}`);
            // Implementasi untuk hapus program studi
        }
    };

    if (programs.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Belum ada program studi
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1 mt-2">
            {programs.map((program) => (
                <div
                    key={program.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                >
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-base">
                            {program.name}
                        </h3>
                        {program.program_code && (
                            <p className="text-sm text-gray-500">
                                Kode: {program.program_code}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                program.status === "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                        >
                            {program.status === "active" ? "Aktif" : "Nonaktif"}
                        </span>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    onClick={() => handleView(program.id)}
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                >
                                    <PiDotsThreeVerticalBold className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => handleView(program.id)}
                                >
                                    <PiEyeDuotone className="mr-2 h-4 w-4" />
                                    <span>Detail</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleEdit(program.id)}
                                >
                                    <PiPencilSimpleDuotone className="mr-2 h-4 w-4" />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleDelete(program.id)}
                                    className="text-red-600 focus:text-red-600"
                                >
                                    <PiTrashDuotone className="mr-2 h-4 w-4" />
                                    <span>Hapus</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Index;
