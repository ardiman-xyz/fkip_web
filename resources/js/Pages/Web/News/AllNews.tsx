// Web/News/AllNews.tsx
import Guest2 from "@/Layouts/GuestLayout2";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { formatDate } from "@/lib/utils";
import { Pagination } from "../_components/pagination";

interface Category {
    id: number;
    name: string;
    slug: string;
    count: number;
}

interface NewsItem {
    id: number;
    publish_date: string;
    is_featured: boolean;
    media: {
        id: number;
        path: string;
        paths: {
            thumbnail: string;
        };
    } | null;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
    translations: {
        id: {
            title: string;
            slug: string;
            content: string;
        };
        en?: {
            title: string;
            slug: string;
            content: string;
        };
    };
}

interface NewsIndexProps {
    news: {
        data: NewsItem[];
        links: any;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    categories: Category[];
    popularNews: NewsItem[];
    filters: {
        category?: number;
        tag?: number;
        search?: string;
    };
}

const NewsIndex = ({
    news,
    categories,
    popularNews,
    filters,
}: NewsIndexProps) => {
    const { data, setData, get } = useForm({
        search: filters.search || "",
        category: filters.category || "",
        page: 1,
    });

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        get("/berita", {
            preserveState: true,
        });
    };

    const handleCategoryFilter = (categoryId: number | string) => {
        setData("category", categoryId);
        get("/berita", {
            preserveState: true,
        });
    };

    const handlePageChange = (page: number) => {
        setData("page", page);
        get("/berita", {
            preserveState: true,
        });
    };

    // Ekstrak excerpt dari konten HTML
    const getExcerpt = (htmlContent: string, length = 120) => {
        const plainText = htmlContent.replace(/<[^>]+>/g, "");
        return plainText.length > length
            ? plainText.substring(0, length) + "..."
            : plainText;
    };

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
                                    <BreadcrumbPage>Berita</BreadcrumbPage>
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

                    <div className="mb-12">
                        <h2 className="text-xl font-semibold mb-4">
                            Kategori Berita
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant={!data.category ? "default" : "outline"}
                                className="hover:bg-green-50"
                                onClick={() => handleCategoryFilter("")}
                            >
                                Semua
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category.id}
                                    variant={
                                        data.category == category.id
                                            ? "default"
                                            : "outline"
                                    }
                                    className="hover:bg-green-50"
                                    onClick={() =>
                                        handleCategoryFilter(category.id)
                                    }
                                >
                                    {category.name}
                                    <span className="ml-2 text-sm text-gray-500">
                                        ({category.count})
                                    </span>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-8 mb-12">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="mb-6">
                                <form
                                    onSubmit={handleSearch}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="text"
                                        placeholder="Cari berita..."
                                        className="flex-1 px-4 py-2 border rounded-md"
                                        value={data.search}
                                        onChange={(e) =>
                                            setData("search", e.target.value)
                                        }
                                    />
                                    <Button type="submit">Cari</Button>
                                </form>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {news.data.length > 0 ? (
                                    news.data.map((item) => (
                                        <Card key={item.id}>
                                            <CardContent className="p-0">
                                                <div className="aspect-video relative">
                                                    {item.media ? (
                                                        <img
                                                            src={
                                                                item.media
                                                                    ?.paths
                                                                    .thumbnail
                                                            }
                                                            alt={
                                                                item
                                                                    .translations
                                                                    ?.id
                                                                    ?.title ||
                                                                "News image"
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-6">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {item.category && (
                                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                                                                {
                                                                    item
                                                                        .category
                                                                        .name
                                                                }
                                                            </span>
                                                        )}
                                                        <span className="text-sm text-gray-500">
                                                            {formatDate(
                                                                item.publish_date
                                                            )}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-semibold mb-2 line-clamp-2">
                                                        {
                                                            item.translations
                                                                ?.id?.title
                                                        }
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                        {getExcerpt(
                                                            item.translations.id
                                                                .content
                                                        )}
                                                    </p>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full"
                                                        asChild
                                                    >
                                                        <a
                                                            href={`/berita/${item.translations.id.slug}`}
                                                        >
                                                            Baca Selengkapnya
                                                            <ChevronRight className="w-4 h-4 ml-1" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <div className="col-span-2 py-12 text-center text-gray-500">
                                        Tidak ada berita yang ditemukan
                                    </div>
                                )}
                            </div>

                            {news.last_page > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <Pagination
                                        totalPages={news.last_page}
                                        currentPage={news.current_page}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <div className="sticky top-20">
                                <h3 className="font-semibold text-lg mb-4">
                                    Berita Populer
                                </h3>
                                <div className="space-y-4">
                                    {popularNews.map((item) => (
                                        <Card key={item.id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                                                        {item.media ? (
                                                            <img
                                                                src={
                                                                    item.media
                                                                        .paths
                                                                        .thumbnail
                                                                }
                                                                alt={
                                                                    item
                                                                        .translations
                                                                        .id
                                                                        .title
                                                                }
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
                                                                No Image
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {item.category && (
                                                            <span className="text-sm text-green-600 mb-1 block">
                                                                {
                                                                    item
                                                                        .category
                                                                        .name
                                                                }
                                                            </span>
                                                        )}
                                                        <h4 className="font-medium mb-1 line-clamp-2">
                                                            <a
                                                                href={`/berita/${item.translations.id.slug}`}
                                                            >
                                                                {
                                                                    item
                                                                        .translations
                                                                        .id
                                                                        .title
                                                                }
                                                            </a>
                                                        </h4>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {formatDate(
                                                                item.publish_date
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default NewsIndex;
