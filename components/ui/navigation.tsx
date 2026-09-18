import React from "react";

export interface HeaderNavProps {
  className?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ className = "" }) => {
  return (
    <header
      className={`bg-white border border-[#E0E0E0] rounded-[14px] px-6 py-3 flex items-center justify-between shadow-xs ${className}`}
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#232323] rounded-[6px] text-white flex items-center justify-center font-bold text-lg">
            C
          </div>
          <span className="font-oswald text-[22px] font-bold tracking-tight text-[#232323]">
            CURA
          </span>
        </div>
        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="text-[14px] font-semibold text-[#232323] hover:text-[#A0A0A0] transition-colors"
          >
            New Arrivals
          </a>
          <a
            href="#"
            className="text-[14px] font-semibold text-[#232323] hover:text-[#A0A0A0] transition-colors"
          >
            Shop By Category
          </a>
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
    { label: "All Categories", href: "#" },
    { label: "Shop By Category", href: "#" },
    { label: "Sales", href: "#" },
    { label: "About" },
  ],
  className = "",
}) => {
  return (
    <nav className={`flex items-center gap-2 text-[14px] ${className}`}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <span className="text-[#A0A0A0] font-normal">&gt;</span>
            )}
            {isLast || !item.href ? (
              <span className="font-semibold text-[#232323]">{item.label}</span>
            ) : (
              <a
                href={item.href}
                className="text-[#676767] hover:text-[#232323] transition-colors"
              >
                {item.label}
              </a>
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
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="w-9 h-9 rounded-[8px] border border-[#E0E0E0] bg-white flex items-center justify-center text-[#232323] hover:border-[#232323] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        &lt;
      </button>

      {[1, 2, 3].map((p) => (
        <button
          key={p}
          type="button"
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

      <span className="px-1 text-[#676767] text-[14px]">...</span>

      <button
        type="button"
        onClick={() => onPageChange?.(totalPages)}
        className={`w-9 h-9 rounded-[8px] font-semibold text-[14px] flex items-center justify-center transition-colors cursor-pointer ${
          currentPage === totalPages
            ? "bg-[#232323] text-white"
            : "bg-white border border-[#E0E0E0] text-[#232323] hover:border-[#232323]"
        }`}
      >
        {totalPages}
      </button>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="w-9 h-9 rounded-[8px] border border-[#E0E0E0] bg-white flex items-center justify-center text-[#232323] hover:border-[#232323] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        &gt;
      </button>
    </div>
  );
};
