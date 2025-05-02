import { Button } from "@/Components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationProps) {
    // Fungsi untuk menghasilkan array nomor halaman
    const getPageNumbers = () => {
        const pageNumbers = [];

        // Jika totalPages <= 7, tampilkan semua nomor halaman
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        }

        // Jika currentPage di dekat awal
        if (currentPage <= 3) {
            return [1, 2, 3, 4, "...", totalPages];
        }

        // Jika currentPage di dekat akhir
        if (currentPage >= totalPages - 2) {
            return [
                1,
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        // Jika currentPage di tengah
        return [
            1,
            "...",
            currentPage - 1,
            currentPage,
            currentPage + 1,
            "...",
            totalPages,
        ];
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2">
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {pageNumbers.map((page, index) =>
                page === "..." ? (
                    <span key={`ellipsis-${index}`} className="mx-1">
                        ...
                    </span>
                ) : (
                    <Button
                        key={`page-${page}`}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        onClick={() => onPageChange(Number(page))}
                    >
                        {page}
                    </Button>
                )
            )}

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
