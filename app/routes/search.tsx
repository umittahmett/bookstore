// Components
import MobileFilter from "@components/sections/mobile-filter";
import SidebarFilter from "@components/sections/sidebar-filter";
import BookSearch from "@components/sections/book-search";
import { ArrowLeft, ArrowRight } from "lucide-react";
// Types

// Utils
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useSearchParams } from "@remix-run/react";
import { BookProps } from "~/types";
import { books } from "~/data/dummy";
import { BookCard } from "@components/book-card";
import BookCardSkeleton from "@components/skeletons/book-card-skeleton";

const ProjectList = () => {
  const pageIndex = '1';
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const currentPage = pageIndex ? parseInt(pageIndex) : 1;
  const [projects, setProjects] = useState<BookProps[]>([]);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setProjects(books);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "full";
    }
  }, [isMobileFilterOpen]);

  return (
    <div className="default-container pb-16 w-full relative mt-10 grid grid-cols-12 gap-6">
      {/* Filters */}
      <SidebarFilter />

      {/* Search */}
      <div className="col-span-full xl:col-span-9 lg:col-span-8">
        <BookSearch onFilterClick={() => setIsMobileFilterOpen(true)} />
        <div className="flex flex-col space-y-5 mt-5">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {loading
              ? Array(6)
                .fill(0)
                .map((_, index) => <BookCardSkeleton key={index} />)
              : projects.map((item: BookProps, index) => (
                <BookCard key={index} {...item} />
              ))}
          </div>

          <div className="flex  justify-center mt-10">
            <nav
              aria-label="Pagination"
              className="isolate  space-x-2 inline-flex rounded-md shadow-sm"
            >
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus:z-20 focus:outline-offset-0"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
              </a>

              {totalPages.map((pageItem: number) => (
                <a
                  key={pageItem}
                  href={`/projects?page=${pageItem}`}
                  aria-current="page"
                  className={clsx(
                    {
                      "bg-[#FF0000] text-white focus-visible:outline-red-600 z-10 font-semibold":
                        pageItem == currentPage,
                    },
                    {
                      "text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus:outline-offset-0":
                        pageItem != currentPage,
                    },
                    "relative inline-flex items-center px-4 py-2 text-sm focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  )}
                >
                  {pageItem}
                </a>
              ))}
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50 focus:z-20 focus:outline-offset-0"
              >
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Filter */}
      {isMobileFilterOpen && (
        <MobileFilter onCloseClick={() => setIsMobileFilterOpen(false)} />
      )}
    </div>
  );
};

export default ProjectList;
