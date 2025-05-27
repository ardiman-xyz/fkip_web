import React, { useState } from "react";
import { Search, TrendingUp } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface NewsHeroSectionProps {
    onSearch: (query: string) => void;
    searchQuery: string;
    totalNews?: number;
    categories?: any[];
}

const NewsHeroSection: React.FC<NewsHeroSectionProps> = ({
    onSearch,
    searchQuery,
    totalNews = 0,
    categories = [],
}) => {
    const [query, setQuery] = useState(searchQuery);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            onSearch(query);
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
            <div className="container max-w-7xl mx-auto px-4 py-16">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">
                            Berita Terkini FKIP UMK
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Pusat Informasi Terpercaya
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                        Dapatkan informasi terbaru seputar kegiatan akademik,
                        penelitian, pengabdian masyarakat, dan prestasi
                        mahasiswa di Fakultas Keguruan dan Ilmu Pendidikan
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari berita, topik, atau kata kunci..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-12 pr-32 py-4 rounded-2xl border-0 text-gray-800 placeholder-gray-500 text-lg focus:ring-4 focus:ring-white/30 focus:outline-none shadow-xl"
                            />
                            <Button
                                onClick={() => onSearch(query)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-2 rounded-xl shadow-lg"
                            >
                                Cari
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsHeroSection;
