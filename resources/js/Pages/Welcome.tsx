import Guest2 from "@/Layouts/GuestLayout2";
import { Head, Link } from "@inertiajs/react";
import { Book, Calendar, ChevronRight, Clock, Users } from "lucide-react";

export default function Welcome() {
    return (
        <Guest2>
            <Head title="Welcome" />
            <section className="bg-green-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Selamat Datang di Fakultas Keguruan dan Ilmu Pendidikan
                    </h2>
                    <p className="text-xl mb-8">
                        Membentuk Pendidik Profesional untuk Masa Depan Bangsa
                    </p>
                    <Link
                        href="#"
                        className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300"
                    >
                        Pelajari Lebih Lanjut
                    </Link>
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

            <section className="bg-green-50 py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-bold mb-8 text-center">
                        Berita Terbaru
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="bg-white rounded-lg overflow-hidden shadow-md"
                            >
                                <img
                                    src={`/placeholder.svg?height=200&width=400&text=Berita ${item}`}
                                    alt={`Berita ${item}`}
                                    width={400}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold mb-2">
                                        Judul Berita {item}
                                    </h4>
                                    <p className="text-gray-600 mb-4">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua.
                                    </p>
                                    <Link
                                        href={"/berita"}
                                        className="text-green-600 font-semibold flex items-center hover:underline"
                                    >
                                        Baca Selengkapnya{" "}
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="">
                        <h3 className="text-2xl font-bold mb-8 text-center">
                            Agenda
                        </h3>
                        <p className="text-sm text-muted-foreground text-center">
                            Berbagai agenda dan agenda mendatang
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                        {[
                            {
                                title: "Seminar Pendidikan Nasional",
                                date: "15 Agustus 2023",
                                time: "09:00 - 15:00",
                                image: "/placeholder.svg?height=200&width=400&text=Seminar+Pendidikan",
                            },
                            {
                                title: "Workshop Metode Pembelajaran Inovatif",
                                date: "22 Agustus 2023",
                                time: "13:00 - 17:00",
                                image: "/placeholder.svg?height=200&width=400&text=Workshop+Pembelajaran",
                            },
                            {
                                title: "Kuliah Umum: Teknologi dalam Pendidikan",
                                date: "5 September 2023",
                                time: "10:00 - 12:00",
                                image: "/placeholder.svg?height=200&width=400&text=Kuliah+Umum",
                            },
                        ].map((event, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg overflow-hidden shadow-md"
                            >
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold mb-2">
                                        {event.title}
                                    </h4>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span>{event.time}</span>
                                    </div>
                                    <Link
                                        href="/agenda/sadfasdf"
                                        className="text-green-600 font-semibold flex items-center hover:underline"
                                    >
                                        Detail Event{" "}
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </Guest2>
    );
}
