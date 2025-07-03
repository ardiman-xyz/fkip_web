import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    current_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    last_page: number;
    links: PaginationLink[];
    prev_page_url: string | null;
    next_page_url: string | null;
}

interface MediaPaginationProps {
    paginationData: PaginationData;
    filters?: {
        per_page?: number;
        sort_by?: string;
        sort_order?: string;
        search?: string;
    };
}

export const MediaPagination = ({ paginationData, filters = {} }: MediaPaginationProps) => {
    const handlePageChange = (url: string | null) => {
        if (!url) return;

        router.get(url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePerPageChange = (perPage: string) => {
        router.get(route('admin.media.indexView'), {
            ...filters,
            per_page: perPage,
            page: 1, // Reset to first page when changing per_page
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getPageNumbers = () => {
        const { current_page, last_page } = paginationData;
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        // Calculate start and end page numbers
        const start = Math.max(1, current_page - delta);
        const end = Math.min(last_page, current_page + delta);

        // Add page numbers to range
        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        // Add first page and dots if needed
        if (start > 1) {
            rangeWithDots.push(1);
            if (start > 2) {
                rangeWithDots.push('...');
            }
        }

        // Add the main range
        rangeWithDots.push(...range);

        // Add dots and last page if needed
        if (end < last_page) {
            if (end < last_page - 1) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(last_page);
        }

        return rangeWithDots;
    };

    const getPageUrl = (page: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page.toString());
        return url.pathname + url.search;
    };

    if (paginationData.last_page <= 1) {
        return null;
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            {/* Info */}
            <div className="text-sm text-muted-foreground">
                Showing {paginationData.from} to {paginationData.to} of{" "}
                {paginationData.total} results
            </div>

            {/* Per Page Selector */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show:</span>
                <Select
                    value={filters.per_page?.toString() || "20"}
                    onValueChange={handlePerPageChange}
                >
                    <SelectTrigger className="w-20" >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">per page</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
                {/* Previous Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(paginationData.prev_page_url)}
                    disabled={!paginationData.prev_page_url}
                    className="h-9 w-9 p-0"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNum, index) => {
                    if (pageNum === '...') {
                        return (
                            <span
                                key={`dots-${index}`}
                                className="px-3 py-2 text-sm text-muted-foreground"
                            >
                                ...
                            </span>
                        );
                    }

                    const page = pageNum as number;
                    const isActive = page === paginationData.current_page;

                    return (
                        <Button
                            key={page}
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(getPageUrl(page))}
                            className="h-9 w-9 p-0"
                        >
                            {page}
                        </Button>
                    );
                })}

                {/* Next Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(paginationData.next_page_url)}
                    disabled={!paginationData.next_page_url}
                    className="h-9 w-9 p-0"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
