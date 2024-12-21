import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"

interface Video {
    id: number
    title: string
    thumbnail: string
    tag?: string
}

const videos: Video[] = [
    {
        id: 1,
        title: "ITB FOR SOCIETY - Dari Sampah Menjadi Solusi ITB dan Pengelolaan Lingkungan",
        thumbnail: "/placeholder.svg",
    },
    {
        id: 2,
        title: "After Movie PMB ITB 2024",
        thumbnail: "/placeholder.svg"
    },
    {
        id: 3,
        title: "Look Around ITB Kampus Jatinangor",
        thumbnail: "/placeholder.svg"
    },
    {
        id: 4,
        title: "Kebaikan untuk Hari Esok yang Lebih Baik",
        thumbnail: "/placeholder.svg"
    }
]

export default function VideoSection() {
    return (
        <section className="py-8 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Video</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {videos.map((video) => (
                        <Card key={video.id} className="group overflow-hidden shadow-none border-none bg-transparent">
                            <CardContent className="p-0">
                                <div className="relative aspect-video">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                    {video.tag && (
                                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-full">
                                            {video.tag}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                                        {video.title}
                                    </h3>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-end">
                    <Button variant="outline">
                        Selengkapnya
                    </Button>
                </div>
            </div>
        </section>
    )
}

