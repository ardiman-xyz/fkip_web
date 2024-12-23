// pages/Admin/AboutUs/index.tsx
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { VisiMisi } from "./Tabs/VisiMisi";
import { Akreditasi } from "./Tabs/Akreditasi";
import { Struktur } from "./Tabs/Struktur";
import { Dekan } from "./Tabs/Dekan";

const AboutUs = () => {
    const { url } = usePage();
    const searchParams = new URLSearchParams(window.location.search);
    const activeTab = searchParams.get("active") || "visi-misi";

    const handleTabChange = (value: string) => {
        router.get(
            `/admin/about-us?active=${value}`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const tabs = [
        { id: "visi-misi", title: "Visi & Misi", component: <VisiMisi /> },
        {
            id: "akreditasi",
            title: "Sertifikat Akreditasi",
            component: <Akreditasi />,
        },
        {
            id: "struktur",
            title: "Struktur Organisasi",
            component: <Struktur />,
        },
        { id: "dekan", title: "Profil Dekan", component: <Dekan /> },
    ];

    return (
        <Authenticated
            header={
                <h2 className="text-2xl font-black">About Us Management</h2>
            }
        >
            <Head title="About Us Management" />

            <div className="p-4">
                <Tabs
                    value={activeTab}
                    onValueChange={handleTabChange}
                    className="w-full"
                >
                    <TabsList className="w-full justify-start">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.id} value={tab.id}>
                                {tab.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabs.map((tab) => (
                        <TabsContent key={tab.id} value={tab.id}>
                            {tab.component}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </Authenticated>
    );
};

export default AboutUs;
