import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState } from "react";
import {
    PiStudentDuotone,
    PiPlusDuotone,
    PiTrophyDuotone,
    PiBooksDuotone,
    PiUsersThreeDuotone,
} from "react-icons/pi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import StudentOrganizationList from "./_components/StudentOrganizationList";

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
                                    <TabsTrigger value="achievements">
                                        <PiTrophyDuotone className="mr-2 size-4" />
                                        Prestasi Mahasiswa
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
                                    value="achievements"
                                    className="space-y-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">
                                            Prestasi Mahasiswa
                                        </h3>
                                        <Button className="flex items-center gap-2">
                                            <PiPlusDuotone className="size-4" />
                                            Tambah Prestasi
                                        </Button>
                                    </div>

                                    <Card>
                                        <CardContent className="p-0">
                                            <div className="p-6 text-center text-gray-500">
                                                Data prestasi mahasiswa akan
                                                ditampilkan di sini.
                                                <br />
                                                Gunakan tombol "Tambah Prestasi"
                                                untuk menambahkan data baru.
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent
                                    value="scholarships"
                                    className="space-y-4"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">
                                            Program Beasiswa
                                        </h3>
                                        <Button className="flex items-center gap-2">
                                            <PiPlusDuotone className="size-4" />
                                            Tambah Beasiswa
                                        </Button>
                                    </div>

                                    <Card>
                                        <CardContent className="p-0">
                                            <div className="p-6 text-center text-gray-500">
                                                Data program beasiswa akan
                                                ditampilkan di sini.
                                                <br />
                                                Gunakan tombol "Tambah Beasiswa"
                                                untuk menambahkan data baru.
                                            </div>
                                        </CardContent>
                                    </Card>
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
