import type { MetaFunction } from "@remix-run/node";
import Hero from "@components/hero";
import Cta from "@components/sections/cta";
import { BookCard } from "@components/book-card";
import { books } from "@data/dummy";
import Discover from "@components/sections/discover";

export const meta: MetaFunction = () => {
  return [
    { title: "Bookstore" },
    { name: "description", content: "Welcome to Bookstore" },
  ];
};

export default function Index() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Most Populars */}
      <section aria-labelledby="category-heading" className="bg-zinc-50">
        <div className="default-container sm:py-32">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-zinc-900">
              Most Populars
            </h2>
            <a href="#" className="hidden text-sm font-semibold text-amber-500 hover:text-amber-600 duration-200 sm:block">
              Browse all most pupular products
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-6 grid grid-cols-5 gap-6">
            {books.slice(0, 5).map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <a href="#" className="block text-sm font-semibold text-amber-600 hover:text-amber-500">
              Browse all most pupular products
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <Discover />

      {/* World Classics */}
      <section aria-labelledby="category-heading" className="bg-zinc-50">
        <div className="default-container sm:py-32">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-zinc-900">
              World Classics
            </h2>
            <a href="#" className="hidden text-sm font-semibold text-amber-500 hover:text-amber-600 duration-200 sm:block">
              Browse all world classics
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>

          <div className="mt-6 grid grid-cols-5 gap-6">
            {books.slice(5, 10).map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <a href="#" className="block text-sm font-semibold text-amber-600 hover:text-amber-500">
              Browse all world classics
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Cta */}
      <Cta />
    </div >
  );
}
