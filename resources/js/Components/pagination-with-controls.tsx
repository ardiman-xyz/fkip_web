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
import { Button } from "@/Components/ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

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
    const getPageNumbers = () => {
        const maxPagesToShow = 5;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxPagesToShow / 2)
        );
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        // Adjust if we're near the end
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        return { startPage, endPage };
    };

    const { startPage, endPage } = getPageNumbers();

    return (
        <div
            className={`flex flex-col md:flex-row items-center justify-between gap-4 py-4 ${className}`}
        >
            <div className="flex items-center text-sm text-muted-foreground">
                <span>
                    Menampilkan{" "}
                    {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{" "}
                    {Math.min(currentPage * pageSize, totalItems)} dari{" "}
                    {totalItems} data
                </span>

                {showPageSizeOptions && onPageSizeChange && (
                    <div className="ml-4 flex items-center space-x-2">
                        <span>Tampilkan</span>
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
                        <span>data</span>
                    </div>
                )}
            </div>

            <Pagination>
                <PaginationContent>
                    {/* Tombol First Page */}
                    <PaginationItem className="hidden md:inline-flex">
                        {currentPage === 1 ? (
                            <Button
                                variant="outline"
                                size="icon"
                                disabled
                                className="h-8 w-8 p-0"
                            >
                                <ChevronsLeft className="h-4 w-4" />
                                <span className="sr-only">Halaman pertama</span>
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onPageChange(1)}
                                className="h-8 w-8 p-0"
                            >
                                <ChevronsLeft className="h-4 w-4" />
                                <span className="sr-only">Halaman pertama</span>
                            </Button>
                        )}
                    </PaginationItem>

                    {/* Tombol Previous */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(currentPage - 1)}
                            className={
                                currentPage === 1
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>

                    {/* Halaman pertama */}
                    {startPage > 1 && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => onPageChange(1)}
                                isActive={currentPage === 1}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {/* Ellipsis sebelum */}
                    {startPage > 2 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {/* Halaman tengah */}
                    {Array.from({ length: endPage - startPage + 1 }).map(
                        (_, index) => {
                            const page = startPage + index;
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => onPageChange(page)}
                                        isActive={currentPage === page}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        }
                    )}

                    {/* Ellipsis setelah */}
                    {endPage < totalPages - 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {/* Halaman terakhir */}
                    {endPage < totalPages && (
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => onPageChange(totalPages)}
                                isActive={currentPage === totalPages}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {/* Tombol Next */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(currentPage + 1)}
                            className={
                                currentPage === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : ""
                            }
                        />
                    </PaginationItem>

                    {/* Tombol Last Page */}
                    <PaginationItem className="hidden md:inline-flex">
                        {currentPage === totalPages ? (
                            <Button
                                variant="outline"
                                size="icon"
                                disabled
                                className="h-8 w-8 p-0"
                            >
                                <ChevronsRight className="h-4 w-4" />
                                <span className="sr-only">
                                    Halaman terakhir
                                </span>
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onPageChange(totalPages)}
                                className="h-8 w-8 p-0"
                            >
                                <ChevronsRight className="h-4 w-4" />
                                <span className="sr-only">
                                    Halaman terakhir
                                </span>
                            </Button>
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
