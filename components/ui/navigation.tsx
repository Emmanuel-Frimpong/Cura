import React from "react";
import Link from "next/link";

export interface HeaderNavProps {
  className?: string;
  newArrivalsHref?: string;
  shopHref?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  className = "",
  newArrivalsHref = "/new-arrivals",
  shopHref = "/shop",
}) => {
  return (
    <header
      className={`bg-white border border-[#E0E0E0] rounded-[14px] px-6 py-3 flex items-center justify-between shadow-xs ${className}`}
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#232323] rounded-[6px] text-white flex items-center justify-center font-bold text-lg">
            C
          </div>
          <span className="font-oswald text-[22px] font-bold tracking-tight text-[#232323]">
            CURA
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href={newArrivalsHref}
            className="text-[14px] font-semibold text-[#232323] hover:text-[#A0A0A0] transition-colors"
          >
            New Arrivals
          </Link>
          <Link
            href={shopHref}
            className="text-[14px] font-semibold text-[#232323] hover:text-[#A0A0A0] transition-colors"
          >
            Shop By Category
          </Link>
        </nav>
      </div>
    </header>
  );
};

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items = [
    { label: "All Categories", href: "/shop" },
    { label: "Shop By Category", href: "/shop" },
    { label: "Sales", href: "/sale" },
    { label: "About" },
  ],
  className = "",
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-[14px] ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <span className="text-[#A0A0A0] font-normal" aria-hidden="true">&gt;</span>
            )}
            {isLast || !item.href ? (
              <span className="font-semibold text-[#232323]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-[#676767] hover:text-[#232323] transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 8,
  onPageChange,
  className = "",
}) => {
  // Derive valid visible page range around currentPage
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    let start = Math.max(1, currentPage - 1);
    let end = start + 2;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - 2);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();
  const showLastPage = totalPages > 1 && !visiblePages.includes(totalPages);

  return (
    <nav aria-label="Pagination Navigation" className={`flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="w-9 h-9 rounded-[8px] border border-[#E0E0E0] bg-white flex items-center justify-center text-[#232323] hover:border-[#232323] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        &lt;
      </button>

      {visiblePages.map((p) => (
        <button
          key={p}
          type="button"
          aria-label={`Page ${p}`}
          aria-current={currentPage === p ? "page" : undefined}
          onClick={() => onPageChange?.(p)}
          className={`w-9 h-9 rounded-[8px] font-semibold text-[14px] flex items-center justify-center transition-colors cursor-pointer ${
            currentPage === p
              ? "bg-[#232323] text-white"
              : "bg-white border border-[#E0E0E0] text-[#232323] hover:border-[#232323]"
          }`}
        >
          {p}
        </button>
      ))}

      {showLastPage && (
        <>
          <span className="px-1 text-[#676767] text-[14px]" aria-hidden="true">...</span>
          <button
            type="button"
            aria-label={`Page ${totalPages}`}
            aria-current={currentPage === totalPages ? "page" : undefined}
            onClick={() => onPageChange?.(totalPages)}
            className={`w-9 h-9 rounded-[8px] font-semibold text-[14px] flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === totalPages
                ? "bg-[#232323] text-white"
                : "bg-white border border-[#E0E0E0] text-[#232323] hover:border-[#232323]"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="w-9 h-9 rounded-[8px] border border-[#E0E0E0] bg-white flex items-center justify-center text-[#232323] hover:border-[#232323] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        &gt;
      </button>
    </nav>
  );
};

