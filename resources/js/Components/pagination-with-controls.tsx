// components/ui/pagination-with-controls.tsx
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";

interface PaginationWithControlsProps {
    currentPage: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    pageSizeOptions?: number[];
    showPageSizeOptions?: boolean;
    className?: string;
}

export function PaginationWithControls({
    currentPage,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50, 100],
    showPageSizeOptions = true,
    className = "",
}: PaginationWithControlsProps) {
    const totalPages = Math.ceil(totalItems / pageSize);

    // Generate page numbers to display
    const getVisiblePages = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const pages = [];

        // Always include page 1
        pages.push(1);

        // Calculate range around current page
        const rangeStart = Math.max(2, currentPage - delta);
        const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

        // Add ellipsis if there's a gap after page 1
        if (rangeStart > 2) {
            pages.push("ellipsis-start");
        }

        // Add pages in the middle range
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }

        // Add ellipsis if there's a gap before the last page
        if (rangeEnd < totalPages - 1) {
            pages.push("ellipsis-end");
        }

        // Always include the last page if we have more than one page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div
            className={`flex flex-col md:flex-row items-center justify-between py-4 ${className}`}
        >
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
                Menampilkan{" "}
                {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{" "}
                {Math.min(currentPage * pageSize, totalItems)} dari {totalItems}{" "}
                data
            </div>

            <div className="flex items-center space-x-2">
                {showPageSizeOptions && onPageSizeChange && (
                    <div className="flex items-center space-x-2 mr-4">
                        <span className="text-sm">Tampilkan</span>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(value) =>
                                onPageSizeChange(Number(value))
                            }
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue
                                    placeholder={pageSize.toString()}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {pageSizeOptions.map((size) => (
                                    <SelectItem
                                        key={size}
                                        value={size.toString()}
                                    >
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="text-sm">data</span>
                    </div>
                )}

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(1);
                                }}
                                className={`border rounded px-2 py-1 ${
                                    currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : "hover:bg-muted"
                                }`}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1)
                                        onPageChange(currentPage - 1);
                                }}
                                className={`border rounded px-2 py-1 ${
                                    currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : "hover:bg-muted"
                                }`}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Previous</span>
                            </PaginationLink>
                        </PaginationItem>

                        {visiblePages.map((page, index) => {
                            if (
                                page === "ellipsis-start" ||
                                page === "ellipsis-end"
                            ) {
                                return (
                                    <PaginationItem key={`ellipsis-${index}`}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onPageChange(Number(page));
                                        }}
                                        isActive={currentPage === page}
                                        className={`border rounded px-3 py-1 ${
                                            currentPage === page
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                        }`}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages)
                                        onPageChange(currentPage + 1);
                                }}
                                className={`border rounded px-2 py-1 ${
                                    currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : "hover:bg-muted"
                                }`}
                            >
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Next</span>
                            </PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(totalPages);
                                }}
                                className={`border rounded px-2 py-1 ${
                                    currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : "hover:bg-muted"
                                }`}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
