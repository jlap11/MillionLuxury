'use client';

interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly loading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  loading = false,
}: Readonly<PaginationProps>) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || loading}
        className="px-6 py-2 border border-[#c9a961] text-[#c9a961] rounded-md font-sans text-sm tracking-wider uppercase hover:bg-[#c9a961] hover:text-black hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
      >
        Previous
      </button>

      {getPageNumbers().map((page, idx) => {
        if (page === -1) {
          return (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            disabled={loading}
            className={`px-4 py-2 border rounded-md font-sans transition-all duration-300 ${
              currentPage === page
                ? 'bg-[#c9a961] text-black border-[#c9a961] font-medium'
                : 'border-[#c9a961]/30 text-gray-300 hover:bg-[#c9a961]/20 hover:border-[#c9a961] hover:cursor-pointer'
            } disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || loading}
        className="px-6 py-2 border border-[#c9a961] text-[#c9a961] rounded-md font-sans text-sm tracking-wider uppercase hover:bg-[#c9a961] hover:text-black hover:cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
      >
        Next
      </button>
    </div>
  );
}
