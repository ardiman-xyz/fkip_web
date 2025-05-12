import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Badge } from "@/Components/ui/badge";
import { PiPlusDuotone, PiUserDuotone } from "react-icons/pi";

interface Lecturer {
    id: number;
    name: string;
    nip: string | null;
    nidn: string | null;
    position: string | null;
    education: string | null;
    photo: string | null;
    pivot: {
        role: string | null;
        is_active: boolean;
    };
}

interface LecturersTabProps {
    lecturers: Lecturer[];
}

const LecturersTab = ({ lecturers }: LecturersTabProps) => {
    if (lecturers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <p className="text-gray-500 text-center">
                    Belum ada dosen yang terdaftar untuk program studi ini.
                </p>
                <Button className="gap-2">
                    <PiPlusDuotone className="h-4 w-4" />
                    Tambah Dosen
                </Button>
            </div>
        );
    }

    // Filter and sort by role
    const kaprodi = lecturers.find(
        (l) =>
            l.pivot.role?.toLowerCase().includes("kepala") ||
            l.pivot.role?.toLowerCase().includes("kaprodi")
    );

    const sekretaris = lecturers.find((l) =>
        l.pivot.role?.toLowerCase().includes("sekretaris")
    );

    const regularLecturers = lecturers.filter(
        (l) =>
            !(
                l.pivot.role?.toLowerCase().includes("kepala") ||
                l.pivot.role?.toLowerCase().includes("kaprodi") ||
                l.pivot.role?.toLowerCase().includes("sekretaris")
            )
    );

    return (
        <div className="space-y-6">
            {/* Kepala Program Studi */}
            {kaprodi && (
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Kepala Program Studi
                        </h3>

                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                {kaprodi.photo ? (
                                    <AvatarImage
                                        src={kaprodi.photo}
                                        alt={kaprodi.name}
                                    />
                                ) : null}
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    <PiUserDuotone className="h-8 w-8" />
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <h4 className="text-base font-medium">
                                    {kaprodi.name}
                                </h4>
                                {kaprodi.nidn && (
                                    <p className="text-sm text-gray-500">
                                        NIDN: {kaprodi.nidn}
                                    </p>
                                )}
                                {kaprodi.position && (
                                    <p className="text-sm text-gray-500">
                                        {kaprodi.position}
                                    </p>
                                )}
                                {kaprodi.education && (
                                    <p className="text-sm text-gray-500">
                                        {kaprodi.education}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Sekretaris Program Studi */}
            {sekretaris && (
                <Card>
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                            Sekretaris Program Studi
                        </h3>

                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                {sekretaris.photo ? (
                                    <AvatarImage
                                        src={sekretaris.photo}
                                        alt={sekretaris.name}
                                    />
                                ) : null}
                                <AvatarFallback className="bg-primary/10 text-primary">
                                    <PiUserDuotone className="h-8 w-8" />
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <h4 className="text-base font-medium">
                                    {sekretaris.name}
                                </h4>
                                {sekretaris.nidn && (
                                    <p className="text-sm text-gray-500">
                                        NIDN: {sekretaris.nidn}
                                    </p>
                                )}
                                {sekretaris.position && (
                                    <p className="text-sm text-gray-500">
                                        {sekretaris.position}
                                    </p>
                                )}
                                {sekretaris.education && (
                                    <p className="text-sm text-gray-500">
                                        {sekretaris.education}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Dosen Lainnya */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                            Dosen Program Studi
                        </h3>
                        <Button size="sm" className="gap-2">
                            <PiPlusDuotone className="h-4 w-4" />
                            Tambah Dosen
                        </Button>
                    </div>

                    {regularLecturers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {regularLecturers.map((lecturer) => (
                                <div
                                    key={lecturer.id}
                                    className="flex items-center gap-3 p-3 border rounded-lg"
                                >
                                    <Avatar className="h-12 w-12">
                                        {lecturer.photo ? (
                                            <AvatarImage
                                                src={lecturer.photo}
                                                alt={lecturer.name}
                                            />
                                        ) : null}
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            <PiUserDuotone className="h-6 w-6" />
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium line-clamp-1">
                                                {lecturer.name}
                                            </h4>
                                            {!lecturer.pivot.is_active && (
                                                <Badge
                                                    variant="outline"
                                                    className="text-red-500 border-red-200 bg-red-50"
                                                >
                                                    Nonaktif
                                                </Badge>
                                            )}
                                        </div>
                                        {lecturer.nidn && (
                                            <p className="text-xs text-gray-500">
                                                NIDN: {lecturer.nidn}
                                            </p>
                                        )}
                                        {lecturer.position && (
                                            <p className="text-xs text-gray-500">
                                                {lecturer.position}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">
                            Belum ada dosen lainnya
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default LecturersTab;
