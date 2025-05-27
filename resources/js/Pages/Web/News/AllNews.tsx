import React, { useState } from "react";
import { Head, router, useForm } from "@inertiajs/react";
import Guest2 from "@/Layouts/GuestLayout2";
import { Clock } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

// Import your components (you'll need to create these based on the artifacts above)
import NewsHeroSection from "./_components/NewsHeroSection";
import NewsStatsCards from "./_components/NewsStatsCards";
import NewsCategoryTabs from "./_components/NewsCategoryTabs";
import NewsCard from "./_components/NewsCard";

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
            blur?: string;
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
    view_count?: number;
}

interface NewsIndexProps {
    news: {
        data: NewsItem[];
        links: any;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    categories: Category[];
    popularNews: NewsItem[];
    filters: {
        category?: number;
        tag?: number;
        search?: string;
    };
}

const RedesignedAllNews: React.FC<NewsIndexProps> = ({
    news,
    categories,
    popularNews,
    filters,
}) => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState("latest");
    const [selectedCategory, setSelectedCategory] = useState<string>(
        filters.category ? filters.category.toString() : "all"
    );

    const { data, setData, get } = useForm({
        search: filters.search || "",
        category: filters.category || "",
        page: 1,
    });

    // Handle search
    const handleSearch = (query: string) => {
        setData("search", query);
        get("/berita", {
            preserveState: true,
        });
    };

    // Handle category change
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setData("category", category === "all" ? "" : category);
        get("/berita", {
            preserveState: true,
        });
    };

    // Handle sort change
    const handleSortChange = (sort: string) => {
        setSortBy(sort);
        // Implement sorting logic here
    };

    // Handle pagination
    const handlePageChange = (page: number) => {
        setData("page", page);
        get("/berita", {
            preserveState: true,
        });
    };

    // Handle bookmark (placeholder)
    const handleBookmark = (id: number) => {
        console.log("Bookmark news:", id);
        // Implement bookmark functionality
    };

    // Handle share (placeholder)
    const handleShare = (item: NewsItem) => {
        if (navigator.share) {
            navigator.share({
                title: item.translations.id.title,
                url: `/berita/${item.translations.id.slug}`,
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(
                `${window.location.origin}/berita/${item.translations.id.slug}`
            );
        }
    };

    return (
        <Guest2>
            <Head title="Semua Berita - FKIP UMK" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                {/* Hero Section */}
                <NewsHeroSection
                    onSearch={handleSearch}
                    searchQuery={data.search}
                    totalNews={news.total}
                    categories={categories}
                />

                <div className="container max-w-7xl mx-auto px-4 py-12">
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
                                    <BreadcrumbPage>Berita</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* News Grid/List */}
                    {news.data.length > 0 ? (
                        <>
                            <div
                                className={`grid gap-8 mb-12 ${
                                    viewMode === "grid"
                                        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                        : "grid-cols-1"
                                }`}
                            >
                                {news.data.map((item) => (
                                    <NewsCard
                                        key={item.id}
                                        item={item}
                                        viewMode={viewMode}
                                        onBookmark={handleBookmark}
                                        onShare={handleShare}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {news.last_page > 1 && (
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        variant="outline"
                                        disabled={news.current_page === 1}
                                        onClick={() =>
                                            handlePageChange(
                                                news.current_page - 1
                                            )
                                        }
                                        className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                                    >
                                        Sebelumnya
                                    </Button>

                                    {Array.from(
                                        { length: Math.min(5, news.last_page) },
                                        (_, i) => {
                                            const page = i + 1;
                                            return (
                                                <Button
                                                    key={page}
                                                    variant={
                                                        page ===
                                                        news.current_page
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    onClick={() =>
                                                        handlePageChange(page)
                                                    }
                                                    className={
                                                        page ===
                                                        news.current_page
                                                            ? "bg-blue-600 hover:bg-blue-700"
                                                            : "bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                                                    }
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        }
                                    )}

                                    <Button
                                        variant="outline"
                                        disabled={
                                            news.current_page === news.last_page
                                        }
                                        onClick={() =>
                                            handlePageChange(
                                                news.current_page + 1
                                            )
                                        }
                                        className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                                    >
                                        Selanjutnya
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                                {data.search || data.category
                                    ? "Tidak ada berita yang sesuai"
                                    : "Belum ada berita"}
                            </h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                {data.search || data.category
                                    ? "Coba ubah kata kunci pencarian atau filter yang digunakan"
                                    : "Berita akan ditampilkan di sini ketika tersedia"}
                            </p>
                            {(data.search || data.category) && (
                                <Button
                                    onClick={() => {
                                        setData({
                                            search: "",
                                            category: "",
                                            page: 1,
                                        });
                                        setSelectedCategory("all");
                                        get("/berita", { preserveState: true });
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Hapus semua filter
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                {/* {popularNews.length > 0 && (
                    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 hidden xl:block z-10">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">
                            Berita Populer
                        </h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {popularNews.slice(0, 3).map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                        {item.media ? (
                                            <img
                                                src={item.media.paths.thumbnail}
                                                alt={
                                                    item.translations?.id.title
                                                }
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                                            <a
                                                href={`/berita/${item.translations?.id.slug}`}
                                                className="hover:text-blue-600 transition-colors"
                                            >
                                                {item.translations?.id.title}
                                            </a>
                                        </h4>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Clock className="w-3 h-3 mr-1" />
                                            <span>
                                                {new Date(
                                                    item.publish_date
                                                ).toLocaleDateString("id-ID")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-4"
                            asChild
                        >
                            <a href="/berita?sort=popular">
                                Lihat Semua Berita Populer
                            </a>
                        </Button>
                    </div>
                )} */}
            </div>
        </Guest2>
    );
};

export default RedesignedAllNews;
