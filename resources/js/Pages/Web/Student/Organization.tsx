import Guest2 from "@/Layouts/GuestLayout2";
import { UnderDevelopment } from "@/Components/UnderDevelopment";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

const OrganisasiKemahasiswaan = () => {
    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
                    {/* Breadcrumb */}
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
                                    <BreadcrumbPage>
                                        Organisasi Kemahasiswaan
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <h1 className="text-3xl font-bold mb-8">
                        Organisasi Kemahasiswaan
                    </h1>

                    <UnderDevelopment />
                </div>
            </div>
        </Guest2>
    );
};

export default OrganisasiKemahasiswaan;
