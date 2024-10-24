import MobileFilter from "@components/sections/mobile-filter";
import SidebarFilter from "@components/sections/sidebar-filter";
import BookSearch from "@components/sections/book-search";
import { Suspense, useEffect, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { BookProps, FilterCategory } from "~/types";
import ProductList from "@components/sections/product-list";
import BookCardSkeleton from "@components/skeletons/book-card-skeleton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@components/ui/pagination";
import { LoaderFunction, json } from "@remix-run/node";
import { connectToDatabase } from "@utils/db.server";

const ProjectList = () => {
  const loaderData = useLoaderData<typeof loader>();
  const { products, filters } = loaderData;
  const totalPages = Array.from({ length: 10 }, (_, i) => i + 1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Disable scrolling when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100dvh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "full";
    }
  }, [isMobileFilterOpen]);

  // Get the min and max price range
  const getMinMaxPriceRange = () => {
    const prices = products.map((product: BookProps) => product.price);
    const minPriceRange = Math.min(...prices);
    const maxPriceRange = Math.max(...prices);
    return { minPriceRange, maxPriceRange };
  }

  return (
    <div className="default-container pb-16 w-full relative mt-10 grid gird-cols-1 lg:grid-cols-12 gap-6">
      {/* Filters */}
      <div className="col-span-4 xl:col-span-3 max-lg:hidden">
        {filters && <SidebarFilter filters={filters} maxPriceRange={getMinMaxPriceRange().maxPriceRange} minPriceRange={getMinMaxPriceRange().minPriceRange} />}
      </div>

      {/* Search */}
      <div className="col-span-8 xl:col-span-9 ">
        <BookSearch productsCount={products.length} onFilterClick={() => setIsMobileFilterOpen(true)} />
        <div className="flex flex-col space-y-5 mt-5">
          <Suspense fallback={
            <div className="grid gap-5 w-full">
              <BookCardSkeleton />
            </div>
          }>
            <ProductList products={products} />
          </Suspense>

          {/* Pagination */}
          {
            products.length > 10 &&
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                {totalPages.map((item: number) => (
                  <PaginationItem key={item}>
                    <PaginationLink href="#">{item}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          }
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


// Server action
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") || "";
  const author = url.searchParams.get("author")?.split(',');
  const genre = url.searchParams.get("genre")?.split(',');
  const language = url.searchParams.get("language")?.split(',');
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");
  const { db } = await connectToDatabase();
  const collection = db.collection('products');
  const query: any = {};

  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } }
    ];
  }

  const filteredProductsByKeyword = await collection.find(query).toArray();

  // Get unique authors and languages
  let authors: FilterCategory[] = [];
  let languages: FilterCategory[] = [];
  let genres: FilterCategory[] = [];


  // Get unique authors
  filteredProductsByKeyword.map((product: any) => {
    if (!authors.find((author) => author.name.toLowerCase() === product.author.trim().toLowerCase())) {
      authors.push({ name: product.author.trim() });
    }
  });

  // Get unique languages
  filteredProductsByKeyword.map((product: any) => {
    if (!languages.find((language) => language.name.toLowerCase() === product.language.trim().toLowerCase())) {
      languages.push({ name: product.language.trim() });
    }
  });

  // Get unique genres
  filteredProductsByKeyword.map((product: any) => {
    if (!genres.find((genre) => genre.name.toLowerCase() === product.genre.trim().toLowerCase())) {
      genres.push({ name: product.genre.trim() });
    }
  });

  const filters = [
    { name: "Genre", subCategories: [...genres] },
    { name: "Author", subCategories: [...authors] },
    { name: "Language", subCategories: [...languages] },
  ]

  // Filter by author
  if (author) { query.author = { $in: author } }

  // Filter by genre
  if (genre) { query.genre = { $in: genre } }

  // Filter by language
  if (language) { query.language = { $in: language } }

  // Filter by price (min and/or max)
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = parseFloat(maxPrice);
    }
  }

  const products = await collection.find(query).toArray();
  return json({ products, filters });
};