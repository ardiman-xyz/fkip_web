import { Leader } from "@/Pages/AboutUs/_types/leader";

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
                <h2 className="text-2xl font-semibold mb-6">{title}</h2>
                <div className="space-y-6">
                    {leaders.map((leader) => (
                        <div
                            key={leader.id}
                            className="bg-white rounded-lg shadow-sm border p-6"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-48 h-48 shrink-0">
                                    <img
                                        src={leader.media?.path}
                                        alt={leader.translations.id.full_name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {leader.translations.id.full_name}
                                            {leader.academic_title &&
                                                `, ${leader.academic_title}`}
                                        </h3>
                                        <p className="text-gray-600">
                                            {leader.translations.id.position}
                                        </p>
                                    </div>
                                    <div>
                                        {leader.nip && (
                                            <p className="text-sm text-gray-600">
                                                NIP. {leader.nip}
                                            </p>
                                        )}
                                        {leader.nidn && (
                                            <p className="text-sm text-gray-600">
                                                NIDN. {leader.nidn}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="prose max-w-none">
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: leader.translations
                                                        .id.biography,
                                                }}
                                            />
                                        </div>

                                        {/* Education */}
                                        <div>
                                            <h4 className="font-medium mb-1">
                                                Pendidikan
                                            </h4>
                                            <div className="prose max-w-none">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: leader
                                                            .translations.id
                                                            .education_history,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Research Interests if exists */}
                                        {leader.translations.id
                                            .research_interests && (
                                            <div>
                                                <h4 className="font-medium mb-1">
                                                    Bidang Penelitian
                                                </h4>
                                                <div className="prose max-w-none">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: leader
                                                                .translations.id
                                                                .research_interests,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    <div
                        key={leader.id}
                        className="bg-white rounded-lg shadow-sm border p-4"
                    >
                        <div className="aspect-square mb-4">
                            <img
                                src={leader.media?.path}
                                alt={leader.translations.id.full_name}
                                className="w-full h-full object-cover rounded-lg"
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
                    </div>
                ))}
            </div>
        </section>
    );
};
