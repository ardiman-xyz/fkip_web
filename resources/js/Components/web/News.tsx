import {News as NewsType} from "@/Pages/News/_types";
import {NewsItem} from "@/Components/web/NewsItem";

interface NewsProps {
    news: NewsType[]
}

export const NewsComponent = ({news}: NewsProps) => {

    console.info(news)

    return (
            <section className="bg-green-50 py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-bold mb-8 text-center">
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
