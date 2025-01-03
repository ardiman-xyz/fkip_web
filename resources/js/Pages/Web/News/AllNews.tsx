// pages/News/Index.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

const NewsIndex = () => {
    // Data tag/kategori berita
    const newsTags = [
        { id: "prestasi", name: "Prestasi", count: 24 },
        { id: "pendidikan", name: "Pendidikan", count: 36 },
        { id: "penelitian", name: "Penelitian", count: 18 },
        { id: "pengabdian", name: "Pengabdian", count: 15 },
        { id: "kemahasiswaan", name: "Kemahasiswaan", count: 42 },
    ];

    // Data berita terbaru
    const latestNews = [
        {
            title: "Workshop Pengembangan Aplikasi Mobile untuk Pemula",
            date: "31 Desember 2024",
            tag: "Pendidikan",
            excerpt:
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...",
            image: "/path/to/image.jpg",
        },
        {
            title: "Mahasiswa FKIP Raih Juara Nasional",
            date: "30 Desember 2024",
            tag: "Prestasi",
            excerpt:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            image: "/path/to/image2.jpg",
        },
    ];

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
                                    <BreadcrumbLink href="/berita">
                                        Berita
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold mb-4">Berita </h1>
                        <p className="text-gray-600">
                            Informasi terkini seputar kegiatan akademik,
                            prestasi, dan berbagai program di FKIP UMK.
                        </p>
                    </div>

                    {/* Tag Categories */}
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold mb-4">
                            Kategori Berita
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {newsTags.map((tag) => (
                                <Button
                                    key={tag.id}
                                    variant="outline"
                                    className="hover:bg-green-50"
                                >
                                    {tag.name}
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({tag.count})
                                    </span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Featured News */}
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold mb-6">
                            Berita Unggulan
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src="/path/to/featured-image.jpg"
                                    alt="Featured news"
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <span className="px-3 py-1 rounded-full text-sm bg-green-500 mb-2 inline-block">
                                        Prestasi
                                    </span>
                                    <h3 className="text-xl font-semibold mb-2">
                                        Tim Robotik FKIP Juara Internasional
                                    </h3>
                                    <p className="text-sm opacity-90">
                                        28 Desember 2024
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-medium text-gray-500">
                                    Berita Populer
                                </h3>
                                {Array(3)
                                    .fill(null)
                                    .map((_, idx) => (
                                        <Card key={idx}>
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                                                        <img
                                                            src="/path/to/thumbnail.jpg"
                                                            alt="News thumbnail"
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm text-green-600 mb-1 block">
                                                            Penelitian
                                                        </span>
                                                        <h4 className="font-medium mb-1 line-clamp-2">
                                                            Dosen FKIP Publikasi
                                                            Jurnal Internasional
                                                        </h4>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            27 Desember 2024
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Latest News */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">
                                Berita Terbaru
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {latestNews.map((news, idx) => (
                                <Card key={idx}>
                                    <CardContent className="p-0">
                                        <div className="aspect-video relative">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                                                    {news.tag}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {news.date}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold mb-2 line-clamp-2">
                                                {news.title}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                {news.excerpt}
                                            </p>
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                Baca Selengkapnya
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default NewsIndex;
