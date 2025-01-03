import { Head, Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { News } from "@/Pages/News/_types";
import { formatDate } from "@/lib/utils";
import Guest2 from "@/Layouts/GuestLayout2";
import { ShareButtons } from "@/Components/web/ShareButtons";
import { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

interface Props {
    news: News;
}

const Detail = ({ news }: Props) => {
    const translation = news.translations.id || news.translations.en;
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    if (!translation) return null;

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
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        {translation.title}
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-12 gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="mb-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            {news.category?.translations.id && (
                                                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                                                    {
                                                        news.category
                                                            .translations.id
                                                            .name
                                                    }
                                                </span>
                                            )}
                                            <time className="text-sm text-gray-500">
                                                {formatDate(
                                                    news.publish_date ?? ""
                                                )}
                                            </time>
                                        </div>
                                        <h1 className="text-3xl font-bold mb-4">
                                            {translation.title}
                                        </h1>
                                        <div className="flex flex-wrap gap-2">
                                            {news.tags.map((tag) => (
                                                <Link
                                                    key={tag.value}
                                                    href={`/tag/${tag.value}`}
                                                    className="text-sm text-gray-500 hover:text-green-600"
                                                >
                                                    #{tag.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {news.media?.path && (
                                        <div className="mb-8 relative rounded-lg overflow-hidden">
                                            <img
                                                src={
                                                    news.media?.paths.blur ||
                                                    "/placeholder.svg"
                                                }
                                                alt={
                                                    translation.title ??
                                                    "Gambar"
                                                }
                                                width={400}
                                                height={200}
                                                className={`w-full h-[400px] object-cover absolute transition-opacity duration-500 ${
                                                    imageLoaded
                                                        ? "opacity-0"
                                                        : "opacity-100"
                                                }`}
                                            />
                                            <img
                                                src={
                                                    news.media?.path ||
                                                    "/placeholder.svg"
                                                }
                                                alt={
                                                    translation.title ??
                                                    "Gambar"
                                                }
                                                width={400}
                                                height={200}
                                                loading="lazy"
                                                className="w-full h-[400px] object-cover"
                                                onLoad={() =>
                                                    setImageLoaded(true)
                                                }
                                            />
                                        </div>
                                    )}

                                    <div
                                        className="prose prose-lg max-w-none mb-8"
                                        dangerouslySetInnerHTML={{
                                            __html: translation.content ?? "",
                                        }}
                                    />

                                    <div className="pt-6 border-t">
                                        <ShareButtons
                                            url={window.location.href}
                                            title={translation.title ?? ""}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="col-span-12 lg:col-span-4">
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Berita Terkait
                                    </h2>
                                    <div className="text-sm text-gray-500">
                                        Belum ada berita terkait
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Guest2>
    );
};

export default Detail;
