import Guest2 from "@/Layouts/GuestLayout2";
import { ProfileSidebar } from "../_components/ProfileSidebar";
import { History as HistoryType } from "@/Pages/AboutUs/_types/history";
import { EmptyState } from "../_components/EmptyState";
import { School } from "lucide-react";

interface HistoryProps {
    history: HistoryType | undefined;
}

const History = ({ history }: HistoryProps) => {
    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-9">
                            {history ? (
                                <div>
                                    <h1 className="md:text-3xl text-xl font-bold mb-6 capitalize">
                                        {history.translations.id.title}
                                    </h1>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: history.translations.id
                                                .content,
                                        }}
                                    />
                                </div>
                            ) : (
                                <EmptyState
                                    title="Sejarah Belum Tersedia"
                                    description="Data sejarah fakultas sedang dalam proses penambahan"
                                    icon={School}
                                />
                            )}
                        </div>

                        <div className="col-span-3">
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default History;
