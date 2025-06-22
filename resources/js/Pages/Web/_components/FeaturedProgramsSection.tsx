import React from "react";
import {
    PiBookOpenDuotone,
    PiUsersDuotone,
    PiCalendarDuotone,
    PiGraduationCapDuotone,
    PiChalkboardTeacherDuotone,
    PiStudentDuotone,
} from "react-icons/pi";

interface FeaturedProgram {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

const FeaturedProgramsSection = () => {
    // Data dummy untuk program unggulan
    const featuredPrograms: FeaturedProgram[] = [
        {
            id: 1,
            title: "Kurikulum Terkini",
            description:
                "Kurikulum yang selalu diperbarui sesuai dengan perkembangan dunia pendidikan.",
            icon: <PiBookOpenDuotone className="w-16 h-16" />,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            id: 2,
            title: "Dosen Berkualitas",
            description:
                "Tim pengajar yang terdiri dari para ahli dan praktisi di bidang pendidikan.",
            icon: <PiChalkboardTeacherDuotone className="w-16 h-16" />,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        {
            id: 3,
            title: "Program Magang",
            description:
                "Kesempatan magang di berbagai institusi pendidikan terkemuka.",
            icon: <PiGraduationCapDuotone className="w-16 h-16" />,
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Program Unggulan
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg">
                        FKIP UMK menyediakan berbagai program unggulan untuk
                        memastikan kualitas pendidikan terbaik
                    </p>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {featuredPrograms.map((program, index) => (
                        <div
                            key={program.id}
                            className={`${program.bgColor} rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer border border-green-100`}
                        >
                            {/* Icon */}
                            <div
                                className={`${program.color} mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                                {program.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">
                                {program.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {program.description}
                            </p>

                            {/* Learn More Button */}
                            <button className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold group-hover:underline transition-all duration-300">
                                Pelajari Lebih Lanjut
                                <svg
                                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Statistics Section */}
                <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                5+
                            </div>
                            <div className="text-green-100">Program Studi</div>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                100+
                            </div>
                            <div className="text-green-100">
                                Dosen Berpengalaman
                            </div>
                        </div>
                        <div className="group">
                            <div className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                                2000+
                            </div>
                            <div className="text-green-100">
                                Mahasiswa Aktif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProgramsSection;
