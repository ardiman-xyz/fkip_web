import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import { UserSquare2 } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { ProfileSidebar } from "../_components/ProfileSidebar";

interface Employee {
    id: number;
    nip?: string;
    translations: {
        id: {
            full_name: string;
            position: string;
        };
    };
    department?: {
        translations: {
            id: {
                name: string;
            };
        };
    };
}

const dummyEmployees: Employee[] = [
    {
        id: 1,
        nip: "198501012015011001",
        translations: {
            id: {
                full_name: "Ahmad Subagyo",
                position: "Kepala Bagian Tata Usaha",
            },
        },
        department: {
            translations: {
                id: {
                    name: "Bagian Tata Usaha",
                },
            },
        },
    },
    {
        id: 2,
        nip: "199001022016012001",
        translations: {
            id: {
                full_name: "Siti Aminah",
                position: "Staf Akademik",
            },
        },
        department: {
            translations: {
                id: {
                    name: "Bagian Akademik",
                },
            },
        },
    },
    // ... tambahkan data dummy lainnya
];

const EmployeeDirectory = () => {
    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="mb-8">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">
                                        Beranda
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="text-muted-foreground">
                                        Profil
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Tenaga Kependidikan
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            <Card>
                                <CardContent className="p-6">
                                    <h1 className="text-3xl font-bold mb-8">
                                        Tenaga Kependidikan
                                    </h1>

                                    {/* Employee List */}
                                    <div className="space-y-4">
                                        {dummyEmployees.map((employee) => (
                                            <Card key={employee.id}>
                                                <CardContent className="p-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                                            <UserSquare2 className="w-full h-full p-3 text-gray-400" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">
                                                                {
                                                                    employee
                                                                        .translations
                                                                        .id
                                                                        .full_name
                                                                }
                                                            </h3>
                                                            {employee.nip && (
                                                                <p className="text-sm text-gray-500">
                                                                    NIP.{" "}
                                                                    {
                                                                        employee.nip
                                                                    }
                                                                </p>
                                                            )}
                                                            {employee.department && (
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        employee
                                                                            .translations
                                                                            .id
                                                                            .position
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        employee
                                                                            .department
                                                                            .translations
                                                                            .id
                                                                            .name
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default EmployeeDirectory;
