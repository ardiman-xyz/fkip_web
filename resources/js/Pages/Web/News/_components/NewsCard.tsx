import React, { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Calendar, Eye, Bookmark, Share2, ArrowUpRight } from "lucide-react";

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

interface NewsCardProps {
    item: NewsItem;
    viewMode: "grid" | "list";
    onBookmark?: (id: number) => void;
    onShare?: (item: NewsItem) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
    item,
    viewMode,
    onBookmark,
    onShare,
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getExcerpt = (content: string, length = 120) => {
        const plainText = content.replace(/<[^>]+>/g, "");
        return plainText.length > length
            ? plainText.substring(0, length) + "..."
            : plainText;
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
    };

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onBookmark?.(item.id);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onShare?.(item);
    };

    console.info(item);

    return (
        <Card
            className={`group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                item.is_featured ? "ring-2 ring-blue-500/20" : ""
            } ${viewMode === "list" ? "flex flex-row" : ""}`}
        >
            {/* Image Section */}
            <div
                className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-80 flex-shrink-0" : "aspect-video"
                }`}
            >
                {item.media && !imageError ? (
                    <>
                        {/* Blur placeholder */}
                        {item.media.paths.blur && !imageLoaded && (
                            <img
                                src={item.media.paths.blur}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm"
                            />
                        )}
                        {/* Main image */}
                        <img
                            src={item.media.paths.thumbnail}
                            alt={item.translations?.id.title}
                            className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            loading="lazy"
                        />
                    </>
                ) : (
                    /* Fallback when no image */
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-gray-400 text-center">
                            <Calendar className="w-12 h-12 mx-auto mb-2" />
                            <span className="text-sm">No Image</span>
                        </div>
                    </div>
                )}

                {/* Featured Badge */}
                {item.is_featured && (
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">
                            Featured
                        </Badge>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2"
                        onClick={handleBookmark}
                    >
                        <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2"
                        onClick={handleShare}
                    >
                        <Share2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Content Section */}
            <CardContent className="p-6 flex-1">
                {/* Meta Information */}
                <div className="flex items-center gap-3 mb-3">
                    {item.category && (
                        <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                            {item.category.name}
                        </Badge>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={item.publish_date}>
                            {formatDate(item.publish_date)}
                        </time>
                    </div>
                </div>

                {/* Title */}
                <h3
                    className={`font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-200 ${
                        viewMode === "list"
                            ? "text-xl line-clamp-2"
                            : "text-lg line-clamp-2"
                    }`}
                >
                    <a
                        href={`/berita/${item.translations.id.slug}`}
                        className="hover:text-blue-600 transition-colors duration-200"
                    >
                        {item.translations.id.title}
                    </a>
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {getExcerpt(item.translations.id.content)}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    {/* View Count */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        {item.view_count && (
                            <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                <span>{item.view_count.toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    {/* Read More Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 group/button p-0"
                        asChild
                    >
                        <a href={`/berita/${item.translations.id.slug}`}>
                            <span>Baca Selengkapnya</span>
                            <ArrowUpRight className="w-4 h-4 ml-1 group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform duration-200" />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default NewsCard;
