import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

import { VisiMisi } from "./Tabs/VisiMisi";
import { Accreditation } from "./Tabs/Akreditasi";
import { Leaders } from "./Tabs/Leader";
import { OrganizationStructure } from "./Tabs/OrganizationStructure";
import History from "./Tabs/History";
import LocationContact from "./Tabs/LocationContact";

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
        { id: "history", title: "Sejarah", component: <History /> },
        { id: "visi-misi", title: "Visi & Misi", component: <VisiMisi /> },
        {
            id: "akreditasi",
            title: "Sertifikat Akreditasi",
            component: <Accreditation />,
        },
        {
            id: "struktur",
            title: "Struktur Organisasi",
            component: <OrganizationStructure />,
        },
        { id: "leader", title: "Pimpinan", component: <Leaders /> },
        {
            id: "contact",
            title: "Lokasi dan kontak",
            component: <LocationContact />,
        },
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
