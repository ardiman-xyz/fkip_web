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
        <div className="bg-white  overflow-hidden h-[300px] flex flex-col">
            <a href={`/berita/${translation.slug}`} className="w-full h-48 flex-shrink-0 relative overflow-hidden group cursor-pointer">
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

            <div className=" flex flex-col flex-grow">
                <div className="flex items-center gap-2 my-2">
                    <div>
                        {news.category && news.category.translations.id && (
                            <a
                                href={`/kategori/${news.category.translations.id.name}`}
                                className="text-sm text-green-600 hover:underline"
                            >
                                {news.category.translations.id.name}
                            </a>
                        )}
                    </div>
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
                <a href={`/berita/${translation.slug}`}
                   className="text-xl font-semibold mb-2 line-clamp-2 min-h-[3.5rem] hover:underline">
                    {translation.title}
                </a>
            </div>
        </div>
    );
};
