// resources/js/Pages/Web/News/Detail.tsx
import {Head, Link} from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { News } from "@/Pages/News/_types";
import {formatDate} from "@/lib/utils";
import Guest2 from "@/Layouts/GuestLayout2";
import {ShareButtons} from "@/Components/web/ShareButtons";

interface Props {
    news: News;
}

const Detail = ({ news }: Props)=> {

    const translation = news.translations.id || news.translations.en;

    if (!translation) return null;

    return (
        <Guest2>
            <Head title={translation.title ?? "FKIP"}  />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container max-w-5xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link
                            href="/berita"
                            className="text-green-600 hover:underline flex items-center"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1"/>
                            Kembali ke Berita
                        </Link>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                {news.category?.translations.id && (
                                    <Link
                                        href={`/kategori/${news.category.translations.id.name}`}
                                        className="text-green-600 hover:underline"
                                    >
                                        {news.category.translations.id.name}
                                    </Link>
                                )}
                                <span className="text-gray-400">•</span>
                                <time className="text-gray-500">
                                    {formatDate(news.publish_date ?? "")}
                                </time>
                            </div>
                            <h1 className="text-3xl font-bold mb-4">{translation.title}</h1>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {news.tags.map(tag => (
                                    <Link
                                        key={tag.value}
                                        href={`/tag/${tag.value}`}
                                        className="text-sm text-gray-500 hover:text-green-600 hover:underline"
                                    >
                                        #{tag.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Featured Image */}
                        {news.media?.path && (
                            <div className="mb-8">
                                <img
                                    src={news.media.path}
                                    className="w-full h-[400px] object-cover rounded-lg"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className="prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{__html: translation.content ?? ""}}
                        />

                        <ShareButtons
                            url={window.location.href}
                            title={translation.title ? translation.title : ""}
                        />
                    </div>
                </div>
            </div>
        </Guest2>
    );
}


export default Detail;
