import { json, LoaderFunction, type MetaFunction } from "@remix-run/node";
import Hero from "@components/hero";
import Cta from "@components/sections/cta";
import { books } from "@data/dummy";
import Discover from "@components/sections/discover";
import ProductSlider from "@components/sections/poduct-slider";
import { db } from "@utils/db.server";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Bookstore" },
    { name: "description", content: "Welcome to Bookstore" },
  ];
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const { popularProducts } = loaderData;
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Most Populars */}
      <ProductSlider className="bg-zinc-50" title="Most Populars" browseAllText="Browse all most pupular products" browseAllLink="/" books={popularProducts} />

      {/* Discover Section */}
      <Discover />

      {/* World Classics */}
      <ProductSlider title="World Classics" browseAllText="Browse all world classics" browseAllLink="/" books={popularProducts} />

      {/* Cta */}
      <Cta />
    </div >
  );
}

// Loader Function
export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Get popular products from database by viewCount
    const popularProducts = await db.collection("products").find().sort({ reviewCount: -1 }).limit(10).toArray()
    return json({ popularProducts });
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};