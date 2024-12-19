import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { News } from "@/Pages/News/_types";
import {useState} from "react";

interface NewsItemProps {
    news: News;
}

export const NewsItem = ({ news }: NewsItemProps) => {
    const translation = news.translations.id || news.translations.en;

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    if (!translation) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md h-[370px] flex flex-col">
            <div className="w-full h-48 flex-shrink-0 relative">
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
                    src={news.media?.path || "/placeholder.svg"}
                    alt={translation.title ?? "Gambar"}
                    width={400}
                    height={200}
                    loading="lazy"
                    className="w-full h-full object-cover transition-opacity duration-500"
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                    {news.category && news.category.translations.id && (
                        <a
                            href={`/kategori/${news.category.translations.id.name}`}
                            className="text-sm text-green-600 hover:underline"
                        >
                            {news.category.translations.id.name}
                        </a>
                    )}
                    {news.category && news.tags.length > 0 && (
                        <span className="text-gray-400">•</span>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {news.tags.map(tag => (
                            <a
                                key={tag.value}
                                href={`/tag/${tag.value}`}
                                className="text-sm text-gray-500 hover:text-green-600 hover:underline"
                            >
                                #{tag.label}
                            </a>
                        ))}
                    </div>
                </div>
                <h4 className="text-xl font-semibold mb-2 line-clamp-2 min-h-[3.5rem]">
                    {translation.title}
                </h4>

                <a
                    href={`/berita/${translation.slug}`}
                    className="text-green-600 font-semibold flex items-center hover:underline mt-auto"
                >
                    Baca Selengkapnya{" "}
                    <ChevronRight className="w-4 h-4 ml-1"/>
                </a>
            </div>
        </div>
    );
};
