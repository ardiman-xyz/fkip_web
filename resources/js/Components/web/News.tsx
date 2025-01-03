import { News as NewsType } from "@/Pages/News/_types";
import { NewsItem } from "@/Components/web/NewsItem";
import { Button } from "@/Components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";

interface NewsProps {
    news: NewsType[];
}

export const NewsSection = ({ news }: NewsProps) => {
    return (
        <section className="bg-white py-16">
            <div className="container max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">Berita Terbaru</h2>
                    <Link href="/berita">
                        <Button
                            variant="outline"
                            className="hidden md:flex items-center gap-2"
                        >
                            Lihat Semua
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((news) => (
                        <NewsItem news={news} key={news.id} />
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Link href="/berita">
                        <Button variant="outline" className="w-full">
                            Lihat Semua Berita
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
