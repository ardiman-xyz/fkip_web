import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Calendar, Eye, TrendingUp, Bookmark } from "lucide-react";

interface NewsStatsCardsProps {
    totalNews: number;
    totalViews?: number;
    monthlyNews?: number;
    totalCategories: number;
}

const NewsStatsCards: React.FC<NewsStatsCardsProps> = ({
    totalNews,
    totalViews = 0,
    monthlyNews = 0,
    totalCategories,
}) => {
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    };

    const statsData = [
        {
            icon: Calendar,
            value: totalNews,
            label: "Total Berita",
            gradient: "from-blue-500 to-blue-600",
            bgColor: "bg-white/80",
        },
        {
            icon: Eye,
            value: formatNumber(totalViews),
            label: "Total Views",
            gradient: "from-green-500 to-green-600",
            bgColor: "bg-white/80",
        },
        {
            icon: TrendingUp,
            value: monthlyNews,
            label: "Bulan ini",
            gradient: "from-purple-500 to-purple-600",
            bgColor: "bg-white/80",
        },
        {
            icon: Bookmark,
            value: totalCategories,
            label: "Kategori",
            gradient: "from-orange-500 to-orange-600",
            bgColor: "bg-white/80",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 -mt-8">
            {statsData.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                    <Card
                        key={index}
                        className={`${stat.bgColor} backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                    >
                        <CardContent className="p-6 text-center">
                            <div
                                className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-3`}
                            >
                                <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-2xl font-bold text-gray-800 mb-1">
                                {typeof stat.value === "string"
                                    ? stat.value
                                    : stat.value.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                                {stat.label}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default NewsStatsCards;
