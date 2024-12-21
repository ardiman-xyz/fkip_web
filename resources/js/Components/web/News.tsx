import {News as NewsType} from "@/Pages/News/_types";
import {NewsItem} from "@/Components/web/NewsItem";

interface NewsProps {
    news: NewsType[]
}

export const NewsSection = ({news}: NewsProps) => {

    return (
            <section className="bg-white py-10">
                <div className="container max-w-6xl mx-auto px-4">
                    <h3 className="text-2xl font-bold mb-8 ">
                        Berita Terbaru
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            news.map((news) => (
                                <NewsItem news={news} key={news.id} />
                            ))
                        }
                    </div>
                </div>
            </section>
    )
}
