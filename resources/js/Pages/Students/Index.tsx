import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import {
    PiStudentDuotone,
    PiBooksDuotone,
    PiUsersThreeDuotone,
} from "react-icons/pi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import StudentOrganizationList from "./_components/StudentOrganizationList";
import ScholarshipList from "./_components/ScholarshipList";

const Index = () => {
    const [activeTab, setActiveTab] = useState("organizations");

    return (
        <Authenticated
            header={<h2 className="text-2xl font-black">Kemahasiswaan</h2>}
        >
            <Head title="Kemahasiswaan" />
            <div className="flex flex-col gap-4 overflow-y-auto scroll-smooth p-4">
                <div className="grid grid-cols-1 gap-4">
                    <Card className="relative overflow-hidden shadow-none border-none">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-2xl font-bold">
                                <div className="flex items-center gap-x-2">
                                    <PiStudentDuotone className="size-7" />
                                    <span>Kemahasiswaan</span>
                                </div>
                            </CardTitle>
                            <CardDescription>
                                Pengelolaan data kemahasiswaan termasuk
                                organisasi mahasiswa, prestasi, dan beasiswa.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="relative flex flex-col gap-2">
                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className="w-full"
                            >
                                <TabsList className="w-full justify-start mb-4">
                                    <TabsTrigger value="organizations">
                                        <PiUsersThreeDuotone className="mr-2 size-4" />
                                        Organisasi Mahasiswa
                                    </TabsTrigger>

                                    <TabsTrigger value="scholarships">
                                        <PiBooksDuotone className="mr-2 size-4" />
                                        Beasiswa
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="organizations">
                                    <StudentOrganizationList />
                                </TabsContent>

                                <TabsContent
                                    value="scholarships"
                                    className="space-y-4"
                                >
                                    <ScholarshipList />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Authenticated>
    );
};

export default Index;
