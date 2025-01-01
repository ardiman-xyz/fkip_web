// pages/Contact.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FiFacebook } from "react-icons/fi";
import { ProfileSidebar } from "../_components/ProfileSidebar";
import { EmptyState } from "../_components/EmptyState";

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
                    <div className="grid grid-cols-12 gap-8 lg:gap-20">
                        <div className="col-span-12 lg:col-span-9">
                            {contact ? (
                                <div className="space-y-12">
                                    {/* Main Contact */}
                                    <section>
                                        <h1 className="text-2xl md:text-3xl font-bold mb-6">
                                            Lokasi & Kontak
                                        </h1>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            {/* Contact Info */}
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-5 h-5 mt-1 text-gray-600" />
                                                    <div>
                                                        <h3 className="font-medium mb-1">
                                                            Alamat
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {contact.address}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <Phone className="w-5 h-5 mt-1 text-gray-600" />
                                                    <div>
                                                        <h3 className="font-medium mb-1">
                                                            Telepon/Fax
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {contact.phone}
                                                        </p>
                                                        {contact.fax && (
                                                            <p className="text-gray-600">
                                                                Fax:{" "}
                                                                {contact.fax}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <Mail className="w-5 h-5 mt-1 text-gray-600" />
                                                    <div>
                                                        <h3 className="font-medium mb-1">
                                                            Email
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            {contact.email}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-3">
                                                    <Clock className="w-5 h-5 mt-1 text-gray-600" />
                                                    <div>
                                                        <h3 className="font-medium mb-1">
                                                            Jam Operasional
                                                        </h3>
                                                        <p className="text-gray-600">
                                                            Senin - Jumat:{" "}
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

                                            {contact.google_maps_url && (
                                                <div className="h-[300px] bg-gray-100 rounded-lg overflow-hidden">
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
                                            )}
                                        </div>
                                    </section>

                                    {Object.values(contact.social_media).some(
                                        Boolean
                                    ) && (
                                        <section>
                                            <h2 className="text-xl font-semibold mb-4">
                                                Media Sosial
                                            </h2>
                                            <div className="flex gap-4">
                                                {contact.social_media
                                                    .facebook && (
                                                    <a
                                                        href={
                                                            contact.social_media
                                                                .facebook
                                                        }
                                                        target="_blank"
                                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                    >
                                                        <FiFacebook className="w-6 h-6 text-blue-600" />
                                                    </a>
                                                )}
                                            </div>
                                        </section>
                                    )}

                                    {contact.department_contacts.length > 0 && (
                                        <section>
                                            <h2 className="text-xl font-semibold mb-4">
                                                Kontak Unit/Bagian
                                            </h2>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {contact.department_contacts.map(
                                                    (dept, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-4 bg-gray-50 rounded-lg"
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
                                        </section>
                                    )}
                                </div>
                            ) : (
                                <EmptyState
                                    title="Data Kontak Belum Tersedia"
                                    description="Data kontak fakultas sedang dalam proses penambahan"
                                />
                            )}
                        </div>

                        <div className="hidden lg:block lg:col-span-3">
                            <ProfileSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Contact;
