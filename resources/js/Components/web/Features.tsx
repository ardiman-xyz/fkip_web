import { Book, Calendar, Users } from "lucide-react";
import { Card } from "@/Components/ui/card";

export const FeaturesSection = () => {
    const features = [
        {
            icon: <Book className="w-12 h-12 text-green-600" />,
            title: "Kurikulum Terkini",
            description:
                "Kurikulum yang selalu diperbarui sesuai dengan perkembangan dunia pendidikan.",
        },
        {
            icon: <Users className="w-12 h-12 text-green-600" />,
            title: "Dosen Berkualitas",
            description:
                "Tim pengajar yang terdiri dari para ahli dan praktisi di bidang pendidikan.",
        },
        {
            icon: <Calendar className="w-12 h-12 text-green-600" />,
            title: "Program Magang",
            description:
                "Kesempatan magang di berbagai institusi pendidikan terkemuka.",
        },
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Program Unggulan
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        FKIP UMK menyediakan berbagai program unggulan untuk
                        memastikan kualitas pendidikan terbaik
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <Card
                            key={idx}
                            className="group hover:shadow-lg transition-all duration-300"
                        >
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-2xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
