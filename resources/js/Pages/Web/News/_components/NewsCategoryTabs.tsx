import React from "react";
import { Badge } from "@/Components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Grid3X3, List } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface Category {
    id: number;
    name: string;
    slug: string;
    count: number;
}

interface NewsCategoryTabsProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortBy: string;
    onSortChange: (sort: string) => void;
    viewMode: "grid" | "list";
    onViewModeChange: (mode: "grid" | "list") => void;
}

const NewsCategoryTabs: React.FC<NewsCategoryTabsProps> = ({
    categories,
    selectedCategory,
    onCategoryChange,
    sortBy,
    onSortChange,
    viewMode,
    onViewModeChange,
}) => {
    const sortOptions = [
        { value: "latest", label: "Terbaru" },
        { value: "popular", label: "Terpopuler" },
        { value: "oldest", label: "Terlama" },
        { value: "title", label: "Judul A-Z" },
    ];

    return (
        <Tabs
            value={selectedCategory}
            onValueChange={onCategoryChange}
            className="mb-8"
        >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                {/* Category Tabs */}
                <div className="overflow-x-auto">
                    <TabsList className="inline-flex min-w-full lg:min-w-0 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border shadow-lg">
                        <TabsTrigger
                            value="all"
                            className="rounded-xl px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-md whitespace-nowrap"
                        >
                            Semua
                        </TabsTrigger>
                        {categories.slice(0, 5).map((category) => (
                            <TabsTrigger
                                key={category.id}
                                value={category.id.toString()}
                                className="rounded-xl px-4 py-2 data-[state=active]:bg-white data-[state=active]:shadow-md whitespace-nowrap"
                            >
                                <span>{category.name}</span>
                                <Badge
                                    variant="secondary"
                                    className="ml-2 text-xs"
                                >
                                    {category.count}
                                </Badge>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    {/* Sort Dropdown */}
                    <Select value={sortBy} onValueChange={onSortChange}>
                        <SelectTrigger className="w-48 bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-xl">
                            <SelectValue placeholder="Urutkan berdasarkan" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* View Mode Toggle */}
                    <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-lg">
                        <Button
                            variant={viewMode === "grid" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => onViewModeChange("grid")}
                            className="rounded-lg"
                        >
                            <Grid3X3 className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={viewMode === "list" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => onViewModeChange("list")}
                            className="rounded-lg"
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Tabs>
    );
};

export default NewsCategoryTabs;
