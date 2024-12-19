import Guest2 from "@/Layouts/GuestLayout2";
import { Head, Link } from "@inertiajs/react";
import { Book, Calendar, ChevronRight, Clock, Users } from "lucide-react";
import {News} from "@/Pages/News/_types";
import {Event} from "@/Pages/Event/_types";
import {NewsComponent} from "@/Components/web/News";
import {EventSection} from "@/Components/web/EventSection";

interface WelcomeProps {
    news : News[]
    events: Event[]
}

export default function Welcome({news, events}:  WelcomeProps) {

    console.info(events)

    return (
        <Guest2>
            <Head title="Home" />
            <section className="bg-green-700 text-white md:py-32 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="md:text-4xl text-2xl font-bold mb-4">
                        Selamat Datang di Fakultas Keguruan dan Ilmu Pendidikan
                    </h2>
                    <p className="md:text-xl text-base mb-8">
                        Membentuk Pendidik Profesional untuk Masa Depan Bangsa
                    </p>
                    <a
                        target="_blank"
                        href="https://admisi.umkendari.ac.id/"
                        className="bg-white text-green-600 px-6 py-3 rounded-sm font-semibold hover:bg-green-100 transition duration-300"
                    >
                        Pelajari Lebih Lanjut
                    </a>
                </div>
            </section>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-bold mb-8 text-center">
                        Program Unggulan
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <Book className="w-12 h-12 text-green-600 mb-4" />
                            <h4 className="text-xl font-semibold mb-2">
                                Kurikulum Terkini
                            </h4>
                            <p className="text-gray-600">
                                Kurikulum yang selalu diperbarui sesuai dengan
                                perkembangan dunia pendidikan.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <Users className="w-12 h-12 text-green-600 mb-4" />
                            <h4 className="text-xl font-semibold mb-2">
                                Dosen Berkualitas
                            </h4>
                            <p className="text-gray-600">
                                Tim pengajar yang terdiri dari para ahli dan
                                praktisi di bidang pendidikan.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <Calendar className="w-12 h-12 text-green-600 mb-4" />
                            <h4 className="text-xl font-semibold mb-2">
                                Program Magang
                            </h4>
                            <p className="text-gray-600">
                                Kesempatan magang di berbagai institusi
                                pendidikan terkemuka.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <NewsComponent news={news} />
            <EventSection events={events} />
        </Guest2>
    );
}
