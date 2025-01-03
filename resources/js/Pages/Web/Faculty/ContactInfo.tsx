import Guest2 from "@/Layouts/GuestLayout2";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FiFacebook } from "react-icons/fi";
import { ProfileSidebar } from "../_components/ProfileSidebar";
import { EmptyState } from "../_components/EmptyState";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

interface SocialMedia {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
}

interface DepartmentContact {
    name: string;
    phone: string;
    email: string;
}

interface ContactInfo {
    id?: number;
    email: string;
    phone: string;
    fax: string;
    address: string;
    latitude: string;
    longitude: string;
    google_maps_url: string;
    social_media: SocialMedia;
    operating_hours: {
        monday_friday: string;
        saturday: string;
        sunday: string;
    };
    department_contacts: DepartmentContact[];
}

const Contact = ({ contact }: { contact: ContactInfo | null }) => {
    return (
        <Guest2>
            <div className="min-h-screen bg-white py-12">
                <div className="container max-w-6xl mx-auto px-4">
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
                                    <BreadcrumbPage className="text-muted-foreground">
                                        Profil
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Kontak</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            {contact ? (
                                <div className="space-y-12">
                                    <Card>
                                        <CardContent className="p-6">
                                            <h1 className="text-3xl font-bold mb-8">
                                                Lokasi & Kontak
                                            </h1>
                                            <div className="grid md:grid-cols-2 gap-8">
                                                <div className="space-y-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2 bg-gray-100 rounded-lg">
                                                            <MapPin className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium mb-2">
                                                                Alamat
                                                            </h3>
                                                            <p className="text-gray-600">
                                                                {
                                                                    contact.address
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2 bg-gray-100 rounded-lg">
                                                            <Phone className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium mb-2">
                                                                Telepon/Fax
                                                            </h3>
                                                            <p className="text-gray-600">
                                                                {contact.phone}
                                                            </p>
                                                            {contact.fax && (
                                                                <p className="text-gray-600">
                                                                    Fax:{" "}
                                                                    {
                                                                        contact.fax
                                                                    }
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2 bg-gray-100 rounded-lg">
                                                            <Mail className="w-5 h-5 text-orange-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium mb-2">
                                                                Email
                                                            </h3>
                                                            <p className="text-gray-600">
                                                                {contact.email}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-4">
                                                        <div className="p-2 bg-gray-100 rounded-lg">
                                                            <Clock className="w-5 h-5 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium mb-2">
                                                                Jam Operasional
                                                            </h3>
                                                            <div className="space-y-1">
                                                                <p className="text-gray-600">
                                                                    Senin -
                                                                    Jumat:{" "}
                                                                    {
                                                                        contact
                                                                            .operating_hours
                                                                            .monday_friday
                                                                    }
                                                                </p>
                                                                <p className="text-gray-600">
                                                                    Sabtu:{" "}
                                                                    {
                                                                        contact
                                                                            .operating_hours
                                                                            .saturday
                                                                    }
                                                                </p>
                                                                <p className="text-gray-600">
                                                                    Minggu:{" "}
                                                                    {
                                                                        contact
                                                                            .operating_hours
                                                                            .sunday
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {Object.values(contact.social_media).some(
                                        Boolean
                                    ) && (
                                        <Card>
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-semibold mb-4">
                                                    Media Sosial
                                                </h2>
                                                <div className="flex gap-4">
                                                    {contact.social_media
                                                        .facebook && (
                                                        <a
                                                            href={
                                                                contact
                                                                    .social_media
                                                                    .facebook
                                                            }
                                                            target="_blank"
                                                            className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                                        >
                                                            <FiFacebook className="w-6 h-6 text-blue-600" />
                                                        </a>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {contact.department_contacts.length > 0 && (
                                        <Card>
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-semibold mb-6">
                                                    Kontak Unit/Bagian
                                                </h2>
                                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {contact.department_contacts.map(
                                                        (dept, index) => (
                                                            <div
                                                                key={index}
                                                                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                            >
                                                                <h3 className="font-medium mb-2">
                                                                    {dept.name}
                                                                </h3>
                                                                <p className="text-sm text-gray-600">
                                                                    {dept.phone}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {dept.email}
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {contact.google_maps_url && (
                                        <Card>
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-semibold mb-4">
                                                    Lokasi Fakultas
                                                </h2>
                                                <div className="h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                                                    <iframe
                                                        src={
                                                            contact.google_maps_url
                                                        }
                                                        width="100%"
                                                        height="100%"
                                                        style={{ border: 0 }}
                                                        allowFullScreen
                                                        loading="lazy"
                                                        referrerPolicy="no-referrer-when-downgrade"
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}

                                    {/* Department Contacts */}
                                    {contact.department_contacts.length > 0 && (
                                        <Card>
                                            <CardContent className="p-6">
                                                <h2 className="text-xl font-semibold mb-6">
                                                    Kontak Unit/Bagian
                                                </h2>
                                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {contact.department_contacts.map(
                                                        (dept, index) => (
                                                            <div
                                                                key={index}
                                                                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                            >
                                                                <h3 className="font-medium mb-2">
                                                                    {dept.name}
                                                                </h3>
                                                                <p className="text-sm text-gray-600">
                                                                    {dept.phone}
                                                                </p>
                                                                <p className="text-sm text-gray-600">
                                                                    {dept.email}
                                                                </p>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            ) : (
                                <EmptyState
                                    title="Data Kontak Belum Tersedia"
                                    description="Data kontak fakultas sedang dalam proses penambahan"
                                    icon={Phone}
                                />
                            )}
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Contact;
