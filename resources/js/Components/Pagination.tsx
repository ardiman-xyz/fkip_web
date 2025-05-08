// Pagination.tsx
// Import komponen dari shadcn/ui
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";

interface MediaPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const MediaPagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: MediaPaginationProps) => {
    // Fungsi untuk menampilkan nomor halaman
    const renderPageNumbers = () => {
        const pageNumbers = [];

        // Selalu tampilkan halaman pertama
        pageNumbers.push(
            <PaginationItem key="page-1">
                <PaginationLink
                    isActive={currentPage === 1}
                    onClick={(e) => {
                        e.preventDefault();
                        onPageChange(1);
                    }}
                    href="#"
                >
                    1
                </PaginationLink>
            </PaginationItem>
        );

        // Jika total halaman <= 7, tampilkan semua halaman
        if (totalPages <= 7) {
            for (let i = 2; i <= totalPages; i++) {
                pageNumbers.push(
                    <PaginationItem key={`page-${i}`}>
                        <PaginationLink
                            isActive={currentPage === i}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(i);
                            }}
                            href="#"
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            // Jika halaman saat ini <= 4, tampilkan 1-5, ellipsis, dan halaman terakhir
            if (currentPage <= 4) {
                for (let i = 2; i <= 5; i++) {
                    pageNumbers.push(
                        <PaginationItem key={`page-${i}`}>
                            <PaginationLink
                                isActive={currentPage === i}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(i);
                                }}
                                href="#"
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
                pageNumbers.push(
                    <PaginationItem key="ellipsis-1">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            // Jika halaman saat ini >= totalPages - 3, tampilkan halaman pertama, ellipsis, dan (totalPages-4)-totalPages
            else if (currentPage >= totalPages - 3) {
                pageNumbers.push(
                    <PaginationItem key="ellipsis-1">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
                for (let i = totalPages - 4; i < totalPages; i++) {
                    pageNumbers.push(
                        <PaginationItem key={`page-${i}`}>
                            <PaginationLink
                                isActive={currentPage === i}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(i);
                                }}
                                href="#"
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
            }
            // Jika halaman saat ini di tengah, tampilkan halaman pertama, ellipsis, (currentPage-1)-(currentPage+1), ellipsis, halaman terakhir
            else {
                pageNumbers.push(
                    <PaginationItem key="ellipsis-1">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(
                        <PaginationItem key={`page-${i}`}>
                            <PaginationLink
                                isActive={currentPage === i}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(i);
                                }}
                                href="#"
                            >
                                {i}
                            </PaginationLink>
                        </PaginationItem>
                    );
                }
                pageNumbers.push(
                    <PaginationItem key="ellipsis-2">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            // Selalu tampilkan halaman terakhir jika total halaman > 1
            if (totalPages > 1) {
                pageNumbers.push(
                    <PaginationItem key={`page-${totalPages}`}>
                        <PaginationLink
                            isActive={currentPage === totalPages}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(totalPages);
                            }}
                            href="#"
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <div className="bottom-6 right-0 flex justify-center z-10">
            <div className="bg-white rounded-full shadow-lg border px-2 py-1">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) {
                                        onPageChange(currentPage - 1);
                                    }
                                }}
                                className={
                                    currentPage <= 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }
                            />
                        </PaginationItem>

                        {renderPageNumbers()}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) {
                                        onPageChange(currentPage + 1);
                                    }
                                }}
                                className={
                                    currentPage >= totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};
