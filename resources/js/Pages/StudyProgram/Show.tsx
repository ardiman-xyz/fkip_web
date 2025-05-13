import { Head } from "@inertiajs/react";
import {
    PiArrowLeft,
    PiPencilSimpleDuotone,
    PiGraduationCapDuotone,
} from "react-icons/pi";

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
import BasicInfoTab from "./_tabs/BasicInfoTab";
import DescriptionTab from "./_tabs/DescriptionTab";
import LecturersTab from "./_tabs/LecturersTab";
import ContactsTab from "./_tabs/ContactsTab";
import { Lecturer, StudyProgramDescription } from "./_types/program-studi";

interface StudyProgram {
    id: number;
    name: string;
    program_code: string | null;
    department_id: number;
    education_level_id: number;
    faculty_id: number;
    faculty_name: string;
    status: string;
    created_at: string;
    updated_at: string;
    education_level?: {
        id: number;
        name: string;
        code: string;
    };
    department?: {
        id: number;
        name: string;
    };
    description?: StudyProgramDescription;
    contact?: StudyProgramContact;
    lecturers?: Lecturer[];
}

interface StudyProgramContact {
    id: number;
    study_program_id: number;
    website: string | null;
    email: string | null;
    phone: string | null;
    whatsapp: string | null;
    instagram: string | null;
    youtube: string | null;
    address: string | null;
}

interface Props {
    studyProgram: StudyProgram;
}

export default function Show({ studyProgram }: Props) {
    return (
        <Authenticated
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black">
                        Detail Program Studi
                    </h2>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.history.back()}
                    >
                        <PiArrowLeft className="mr-2 h-4 w-4" /> Kembali
                    </Button>
                </div>
            }
        >
            <Head title={`${studyProgram.name} - Detail Program Studi`} />

            <div className="p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 p-2 rounded-lg">
                                    <PiGraduationCapDuotone className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl">
                                        {studyProgram.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {studyProgram.education_level?.name} (
                                        {studyProgram.education_level?.code})
                                        {studyProgram.program_code &&
                                            ` · Kode: ${studyProgram.program_code}`}
                                    </CardDescription>
                                </div>
                            </div>
                            <Button asChild className="gap-2">
                                <a
                                    href={`/admin/study-programs/${studyProgram.id}/edit`}
                                >
                                    <PiPencilSimpleDuotone className="h-4 w-4" />
                                    Edit Program Studi
                                </a>
                            </Button>
                        </div>

                        <div className="mt-2">
                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                    studyProgram.status === "active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                            >
                                {studyProgram.status === "active"
                                    ? "Aktif"
                                    : "Nonaktif"}
                            </span>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="basic-info" className="w-full">
                            <TabsList className="w-full justify-start mb-4">
                                <TabsTrigger value="basic-info">
                                    Informasi Dasar
                                </TabsTrigger>
                                <TabsTrigger value="description">
                                    Deskripsi & Akreditasi
                                </TabsTrigger>
                                <TabsTrigger value="lecturers">
                                    Dosen
                                </TabsTrigger>
                                <TabsTrigger value="contacts">
                                    Kontak
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic-info">
                                <BasicInfoTab studyProgram={studyProgram} />
                            </TabsContent>

                            <TabsContent value="description">
                                <DescriptionTab
                                    description={studyProgram.description}
                                    studyProgramId={studyProgram.id}
                                />
                            </TabsContent>

                            <TabsContent value="lecturers">
                                <LecturersTab
                                    studyProgramId={studyProgram.id}
                                />
                            </TabsContent>

                            <TabsContent value="contacts">
                                <ContactsTab contact={studyProgram.contact} />
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </Authenticated>
    );
}
