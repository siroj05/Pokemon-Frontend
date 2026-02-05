'use client'
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  total: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({
  total,
  pageSize,
  currentPage,
}: Props) {
  const totalPages = Math.ceil(total / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const getPages = () => {
    const pages: (number | string)[] = [];

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    // page 1
    pages.push(1);

    // left dots
    if (start > 2) {
      pages.push("...");
    }

    // middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // right dots
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 max-sm:gap-1 mt-6 flex-wrap">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="px-3 py-1 rounded bg-[#3D3D8A] disabled:opacity-50 max-md:px-2 py-1 max-md:text-xs"
      >
        Prev
      </button>

      {/* Pages */}
      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-gray-500 max-md:px-2 py-1 max-md:text-xs">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p as number)}
            className={`
              px-3 py-1 rounded max-md:px-2 py-1 max-md:text-xs
              ${(p as number) === currentPage
                ? "bg-[#3D3D8A] text-yellow-400"
                : "bg-gray-400"}
            `}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="px-3 py-1 rounded bg-[#3D3D8A] disabled:opacity-50 max-md:px-2 py-1 max-md:text-xs"
      >
        Next
      </button>
    </div>
  );
}
