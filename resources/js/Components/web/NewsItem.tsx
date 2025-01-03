// Components/web/NewsItem.tsx
import { News } from "@/Pages/News/_types";
import { useState } from "react";
import { Card } from "@/Components/ui/card";

interface NewsItemProps {
    news: News;
}

export const NewsItem = ({ news }: NewsItemProps) => {
    const translation = news.translations.id || news.translations.en;
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    if (!translation) return null;

    return (
        <Card className="group overflow-hidden bg-white h-[350px] flex flex-col  transition-all duration-300 p-4">
            <a
                href={`/berita/${translation.slug}`}
                className="w-full h-48 flex-shrink-0 relative overflow-hidden group cursor-pointer"
            >
                <img
                    src={news.media?.paths.blur || "/placeholder.svg"}
                    alt={translation.title ?? "Gambar"}
                    width={400}
                    height={200}
                    className={`w-full h-full object-cover absolute transition-opacity duration-500 ${
                        imageLoaded ? "opacity-0" : "opacity-100"
                    }`}
                />
                <img
                    src={news.media?.paths.thumbnail || "/placeholder.svg"}
                    alt={translation.title ?? "Gambar"}
                    width={400}
                    height={200}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onLoad={() => setImageLoaded(true)}
                />
            </a>

            <div className="p-4 flex flex-col flex-grow">
                {/* Category and Tags */}
                <div className="flex items-center gap-2 mb-2">
                    {news.category && news.category.translations.id && (
                        <a
                            href={`/kategori/${news.category.translations.id.name}`}
                            className="px-2.5 py-1 text-sm bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                        >
                            {news.category.translations.id.name}
                        </a>
                    )}
                    <div className="flex flex-wrap gap-1">
                        {news.tags.map((tag) => (
                            <a
                                key={tag.value}
                                href={`/tag/${tag.value}`}
                                className="text-sm text-gray-500 hover:text-green-600"
                            >
                                #{tag.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Title */}
                <a
                    href={`/berita/${translation.slug}`}
                    className="text-lg font-semibold line-clamp-2 min-h-[3.5rem] group-hover:text-green-600 transition-colors"
                >
                    {translation.title}
                </a>
            </div>
        </Card>
    );
};
