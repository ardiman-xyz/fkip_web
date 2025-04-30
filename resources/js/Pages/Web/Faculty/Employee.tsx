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

interface Staff {
    id: number;
    nip?: string;
    unit?: string;
    translations: {
        id: {
            full_name: string;
            position?: string;
        };
    };
    media?: {
        id: number;
        path: string;
    };
}

interface EmployeeDirectoryProps {
    staff: Staff[];
}

const EmployeeDirectory = ({ staff = [] }: EmployeeDirectoryProps) => {
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

                                    {/* Staff List */}
                                    {staff.length > 0 ? (
                                        <div className="space-y-4">
                                            {staff.map((staffMember) => (
                                                <Card key={staffMember.id}>
                                                    <CardContent className="p-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                                                {staffMember.media ? (
                                                                    <img
                                                                        src={
                                                                            staffMember
                                                                                .media
                                                                                .path
                                                                        }
                                                                        alt={
                                                                            staffMember
                                                                                .translations
                                                                                .id
                                                                                .full_name
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <UserSquare2 className="w-full h-full p-3 text-gray-400" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-medium text-gray-900">
                                                                    {
                                                                        staffMember
                                                                            .translations
                                                                            .id
                                                                            .full_name
                                                                    }
                                                                </h3>
                                                                {staffMember.nip && (
                                                                    <p className="text-sm text-gray-500">
                                                                        NIP.{" "}
                                                                        {
                                                                            staffMember.nip
                                                                        }
                                                                    </p>
                                                                )}
                                                                <p className="text-sm text-gray-600">
                                                                    {
                                                                        staffMember
                                                                            .translations
                                                                            .id
                                                                            .position
                                                                    }
                                                                    {staffMember.unit &&
                                                                        staffMember
                                                                            .translations
                                                                            .id
                                                                            .position &&
                                                                        " - "}
                                                                    {
                                                                        staffMember.unit
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            Belum ada data tenaga kependidikan
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <div className="sticky top-20">
                                <ProfileSidebar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default EmployeeDirectory;
