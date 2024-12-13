import Guest2 from "@/Layouts/GuestLayout2";
import { Link } from "@inertiajs/react";
import { ArrowLeft, Calendar, User } from "lucide-react";
import React from "react";

const Detail = () => {
    const news = {
        title: "Mahasiswa FKIP Raih Prestasi Gemilang dalam Kompetisi Nasional Pendidikan",
        date: "12 Desember 2024",
        author: "Dr. Ahmad Syafiq",
        image: "/placeholder.svg?height=600&width=1200&text=Foto+Berita",
        content: `
          <p class="text-lg leading-relaxed mb-6">
            Fakultas Keguruan dan Ilmu Pendidikan (FKIP) kembali mengukir prestasi membanggakan melalui tim mahasiswa yang berhasil meraih juara dalam Kompetisi Nasional Pendidikan 2024. Kompetisi yang diselenggarakan oleh Kementerian Pendidikan ini diikuti oleh berbagai universitas terkemuka di Indonesia.
          </p>
    
          <h2 class="text-2xl font-bold mb-4">Inovasi dalam Pendidikan</h2>
          
          <p class="text-lg leading-relaxed mb-6">
            Tim yang terdiri dari mahasiswa Program Studi Pendidikan Matematika dan Pendidikan Bahasa Indonesia ini menghadirkan inovasi pembelajaran yang menggabungkan teknologi augmented reality dengan metode pembelajaran konvensional.
          </p>
    
          <div class="bg-green-50 border-l-4 border-green-600 p-4 my-6">
            <p class="text-lg italic">
              "Prestasi ini merupakan bukti nyata bahwa mahasiswa FKIP memiliki kapasitas untuk berinovasi dalam bidang pendidikan," ujar Dekan FKIP dalam sambutannya.
            </p>
          </div>
    
          <h2 class="text-2xl font-bold mb-4">Dampak dan Keberlanjutan</h2>
          
          <p class="text-lg leading-relaxed mb-6">
            Inovasi yang dikembangkan oleh tim mahasiswa FKIP ini telah mendapatkan perhatian dari berbagai pihak, termasuk beberapa sekolah yang tertarik untuk mengimplementasikan metode pembelajaran ini.
          </p>
        `,
    };

    return (
        <Guest2>
            <div className="min-h-screen bg-white">
                <article className="container mx-auto px-4 py-8 max-w-4xl">
                    <h1 className="text-4xl md:text-3xl font-bold mb-6 leading-tight">
                        {news.title}
                    </h1>

                    <div className="flex items-center gap-6 text-gray-600 mb-8">
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            <time dateTime={news.date}>{news.date}</time>
                        </div>
                        <div className="flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            <span>{news.author}</span>
                        </div>
                    </div>

                    <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
                        <img
                            src={news.image}
                            alt={news.title}
                            className="object-cover"
                        />
                    </div>

                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />

                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <h3 className="text-xl font-semibold mb-4">
                            Bagikan Artikel
                        </h3>
                        <div className="flex gap-4">
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                                Facebook
                            </button>
                            <button className="px-6 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600">
                                Twitter
                            </button>
                            <button className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        </Guest2>
    );
};

export default Detail;
