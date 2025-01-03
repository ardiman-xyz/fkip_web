import { Leader } from "@/Pages/AboutUs/_types/leader";
import { Card, CardContent } from "@/Components/ui/card";
import { GraduationCap } from "lucide-react";

interface LeaderSectionProps {
    title: string;
    leaders: Leader[];
    layout?: "large" | "grid";
}

export const LeaderSection = ({
    title,
    leaders,
    layout = "grid",
}: LeaderSectionProps) => {
    if (layout === "large") {
        return (
            <section>
                {title !== "Dekan" && (
                    <h2 className="text-2xl font-semibold mb-6">{title}</h2>
                )}
                <div className="space-y-6">
                    {leaders.map((leader) => (
                        <Card
                            key={leader.id}
                            className="hover:shadow-lg transition-all duration-300"
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="w-48 h-48 shrink-0">
                                        <img
                                            src={
                                                leader.media?.path ||
                                                "/placeholder.svg"
                                            }
                                            alt={
                                                leader.translations.id.full_name
                                            }
                                            className="w-full h-full object-cover rounded-lg bg-gray-100"
                                        />
                                    </div>

                                    <div className="space-y-6 flex-1">
                                        <div>
                                            <h3 className="text-xl font-semibold">
                                                {
                                                    leader.translations.id
                                                        .full_name
                                                }
                                                {leader.academic_title &&
                                                    `, ${leader.academic_title}`}
                                            </h3>
                                            <p className="text-gray-600">
                                                {
                                                    leader.translations.id
                                                        .position
                                                }
                                            </p>
                                        </div>

                                        <div className="flex gap-4">
                                            {leader.nip && (
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                                                    NIP. {leader.nip}
                                                </span>
                                            )}
                                            {leader.nidn && (
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                                                    NIDN. {leader.nidn}
                                                </span>
                                            )}
                                        </div>

                                        {/* Biography and Details */}
                                        <div className="space-y-6">
                                            {/* Biography */}
                                            <div className="prose prose-lg max-w-none">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: leader
                                                            .translations.id
                                                            .biography,
                                                    }}
                                                />
                                            </div>

                                            {/* Education */}
                                            <div className="p-4 bg-green-50 rounded-lg">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <GraduationCap className="w-5 h-5 text-green-600" />
                                                    <h4 className="font-medium">
                                                        Pendidikan
                                                    </h4>
                                                </div>
                                                <div className="prose prose-sm max-w-none">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: leader
                                                                .translations.id
                                                                .education_history,
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Research Interests */}
                                            {leader.translations.id
                                                .research_interests && (
                                                <div>
                                                    <h4 className="font-medium mb-2">
                                                        Bidang Penelitian
                                                    </h4>
                                                    <div className="prose prose-sm max-w-none">
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: leader
                                                                    .translations
                                                                    .id
                                                                    .research_interests,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section>
            <h2 className="text-2xl font-semibold mb-6">{title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {leaders.map((leader) => (
                    <Card
                        key={leader.id}
                        className="hover:shadow-lg transition-all duration-300"
                    >
                        <CardContent className="p-4">
                            <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={
                                        leader.media?.path || "/placeholder.svg"
                                    }
                                    alt={leader.translations.id.full_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold">
                                    {leader.translations.id.full_name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {leader.translations.id.position}
                                </p>
                                {leader.academic_title && (
                                    <p className="text-sm text-gray-500">
                                        {leader.academic_title}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
