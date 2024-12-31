import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { z } from "zod";
import { contactInfoSchema } from "../_schema/contactInfoSchema";
import { DialogError } from "../_components/DialogError";

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

const LocationContact = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const [errors, setErrors] = useState<string[]>([]);
    const [showErrors, setShowErrors] = useState(false);

    const [formData, setFormData] = useState<ContactInfo>({
        email: "",
        phone: "",
        fax: "",
        address: "",
        latitude: "",
        longitude: "",
        google_maps_url: "",
        social_media: {
            facebook: "",
            instagram: "",
            twitter: "",
            youtube: "",
            linkedin: "",
        },
        operating_hours: {
            monday_friday: "",
            saturday: "",
            sunday: "",
        },
        department_contacts: [],
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(route("admin.contact-info.get"));
            if (response.data.status && response.data.data) {
                setFormData(response.data.data);
            }

            console.info(response.data.data);
        } catch (error) {
            toast.error("Gagal memuat data");
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            const response = await axios.post(
                route("admin.contact-info.store"),
                formData
            );

            if (response.data.status) {
                toast.success(response.data.message);
                fetchData();
            }
        } catch (error) {
            console.info(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head title="Lokasi & Kontak" />

            <div className="space-y-6 container max-w-4xl mx-auto mt-7">
                <Card>
                    <CardHeader>
                        <CardTitle>Informasi Umum</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Email
                            </label>
                            <Input
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Telepon
                                </label>
                                <Input
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Fax
                                </label>
                                <Input
                                    value={formData.fax}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            fax: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Alamat
                            </label>
                            <Textarea
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Google Maps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                URL Google Maps
                            </label>
                            <Input
                                value={formData.google_maps_url}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        google_maps_url: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Latitude
                                </label>
                                <Input
                                    value={formData.latitude}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            latitude: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-2 block">
                                    Longitude
                                </label>
                                <Input
                                    value={formData.longitude}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            longitude: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Jam Operasional</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Senin - Jumat
                            </label>
                            <Input
                                value={formData.operating_hours.monday_friday}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        operating_hours: {
                                            ...prev.operating_hours,
                                            monday_friday: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Sabtu
                            </label>
                            <Input
                                value={formData.operating_hours.saturday}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        operating_hours: {
                                            ...prev.operating_hours,
                                            saturday: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Minggu
                            </label>
                            <Input
                                value={formData.operating_hours.sunday}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        operating_hours: {
                                            ...prev.operating_hours,
                                            sunday: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Media Sosial</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Facebook
                            </label>
                            <Input
                                value={formData.social_media.facebook}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        social_media: {
                                            ...prev.social_media,
                                            facebook: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Instagram
                            </label>
                            <Input
                                value={formData.social_media.instagram}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        social_media: {
                                            ...prev.social_media,
                                            instagram: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </div>
                        {/* Tambahkan social media lainnya */}
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button onClick={onSubmit} disabled={isLoading}>
                        {isLoading && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Simpan
                    </Button>
                </div>
            </div>

            <DialogError
                isOpen={showErrors}
                onClose={() => setShowErrors(false)}
                errors={errors}
            />
        </>
    );
};

export default LocationContact;
