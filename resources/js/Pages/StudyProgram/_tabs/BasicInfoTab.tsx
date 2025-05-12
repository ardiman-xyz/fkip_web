import { Card, CardContent } from "@/Components/ui/card";

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
}

interface BasicInfoTabProps {
    studyProgram: StudyProgram;
}

const BasicInfoTab = ({ studyProgram }: BasicInfoTabProps) => {
    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Informasi Dasar
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm text-gray-500 font-medium">
                                    Nama Program Studi
                                </h4>
                                <p className="text-base">{studyProgram.name}</p>
                            </div>

                            <div>
                                <h4 className="text-sm text-gray-500 font-medium">
                                    Kode Program Studi
                                </h4>
                                <p className="text-base">
                                    {studyProgram.program_code || "-"}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm text-gray-500 font-medium">
                                    Jenjang Pendidikan
                                </h4>
                                <p className="text-base">
                                    {studyProgram.education_level
                                        ? `${studyProgram.education_level.name} (${studyProgram.education_level.code})`
                                        : "-"}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm text-gray-500 font-medium">
                                    Departemen
                                </h4>
                                <p className="text-base">
                                    {studyProgram.department
                                        ? studyProgram.department.name
                                        : "-"}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm text-gray-500 font-medium">
                                    Fakultas
                                </h4>
                                <p className="text-base">
                                    {studyProgram.faculty_name}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm text-gray-500 font-medium">
                                    Status
                                </h4>
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        Informasi Sistem
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm text-gray-500 font-medium">
                                ID
                            </h4>
                            <p className="text-base">{studyProgram.id}</p>
                        </div>

                        <div>
                            <h4 className="text-sm text-gray-500 font-medium">
                                Terakhir Diperbarui
                            </h4>
                            <p className="text-base">
                                {new Date(
                                    studyProgram.updated_at
                                ).toLocaleString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BasicInfoTab;
