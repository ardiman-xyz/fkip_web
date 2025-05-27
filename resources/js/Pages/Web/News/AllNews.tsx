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
            </div>
        </Guest2>
    );
};

export default RedesignedAllNews;
