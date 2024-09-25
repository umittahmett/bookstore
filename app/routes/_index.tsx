import type { MetaFunction } from "@remix-run/node";
import Hero from "@components/hero";
import Cta from "@components/sections/cta";
import { BookCard } from "@components/book-card";
import { books } from "@data/dummy";
import Discover from "@components/sections/discover";
import ProductSlider from "~/components/sections/poduct-slider";

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
      <ProductSlider className="bg-zinc-50" title="Most Populars" browseAllText="Browse all most pupular products" browseAllLink="/" books={books} />

      {/* Discover Section */}
      <Discover />

      {/* World Classics */}
      <ProductSlider title="World Classics" browseAllText="Browse all world classics" browseAllLink="/" books={books} />

      {/* Cta */}
      <Cta />
    </div >
  );
}
