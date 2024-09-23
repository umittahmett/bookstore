import type { MetaFunction } from "@remix-run/node";
import Hero from "~/components/hero";
import { Button } from "@components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const favorites = [
    {
      id: 1,
      name: 'Black Basic Tee',
      price: '$32',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
      imageAlt: "Model wearing women's black cotton crewneck tee.",
    },
    {
      id: 2,
      name: 'Off-White Basic Tee',
      price: '$32',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
      imageAlt: "Model wearing women's off-white cotton crewneck tee.",
    },
    {
      id: 3,
      name: 'Mountains Artwork Tee',
      price: '$36',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg',
      imageAlt:
        "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
    },
  ]
  return (
    <div className="bg-white">

      <Hero />


      <main>
        {/* Category section */}
        <section aria-labelledby="category-heading" className="bg-zinc-50">
          <div className="default-container sm:py-32">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-zinc-900">
                Shop by Category
              </h2>
              <a href="#" className="hidden text-sm font-semibold text-amber-500 hover:text-amber-600 duration-200 sm:block">
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
              <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                <img
                  alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                  src="https://tailwindui.com/img/ecommerce-images/home-page-03-featured-category.jpg"
                  className="object-cover object-center group-hover:scale-105 duration-500"
                />
                <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                <div className="flex items-end p-6">
                  <div>
                    <h3 className="font-semibold text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        New Arrivals
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Shop now
                    </p>
                  </div>
                </div>
              </div>
              <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                <img
                  alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                  src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                  className="object-cover object-center group-hover:scale-105 duration-500 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                  <div>
                    <h3 className="font-semibold text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        Accessories
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Shop now
                    </p>
                  </div>
                </div>
              </div>
              <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                <img
                  alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                  src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                  className="object-cover object-center group-hover:scale-105 duration-500 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                />
                <div
                  aria-hidden="true"
                  className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                />
                <div className="flex items-end p-6 sm:absolute sm:inset-0">
                  <div>
                    <h3 className="font-semibold text-white">
                      <a href="#">
                        <span className="absolute inset-0" />
                        Workspace
                      </a>
                    </h3>
                    <p aria-hidden="true" className="mt-1 text-sm text-white">
                      Shop now
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:hidden">
              <a href="#" className="block text-sm font-semibold text-amber-600 hover:text-amber-500">
                Browse all categories
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* Featured section */}
        <section aria-labelledby="cause-heading">
          <div className="relative bg-zinc-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
            <div className="absolute inset-0 overflow-hidden">
              <img
                alt=""
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-zinc-900 bg-opacity-50" />
            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 id="cause-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Long-term thinking
              </h2>
              <p className="mt-3 text-xl text-white">
                We're committed to responsible, sustainable, and ethical manufacturing. Our small-scale approach allows
                us to focus on quality and reduce our impact. We're doing our best to delay the inevitable heat-death of
                the universe.
              </p>
              <Button variant='secondary' className="mt-8 sm:w-auto">Read our story</Button>
            </div>
          </div>
        </section>

        {/* Favorites section */}
        <section aria-labelledby="favorites-heading">
          <div className="default-container sm:py-32">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-zinc-900">
                Our Favorites
              </h2>
              <a href="#" className="hidden text-sm font-semibold text-amber-600 hover:text-amber-500 sm:block">
                Browse all favorites
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="group relative">
                  <div className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto">
                    <img
                      alt={favorite.imageAlt}
                      src={favorite.imageSrc}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-zinc-900">
                    <a href={favorite.href}>
                      <span className="absolute inset-0" />
                      {favorite.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{favorite.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <a href="#" className="block text-sm font-semibold text-amber-600 hover:text-amber-500">
                Browse all favorites
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section aria-labelledby="sale-heading">
          <div className="overflow-hidden pt-32 sm:pt-14">
            <div className="bg-zinc-800">
              <div className="default-container">
                <div className="relative pb-16 pt-48 sm:pb-24">
                  <div>
                    <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                      Final Stock.
                      <br />
                      Up to 50% off.
                    </h2>
                    <div className="mt-6 text-base">
                      <a href="#" className="font-semibold text-white">
                        Shop the sale
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    </div>
                  </div>

                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
                    <div className="ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8">
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                        <div className="flex-shrink-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>

                        <div className="mt-6 flex-shrink-0 sm:mt-0">
                          <img
                            alt=""
                            src="https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg"
                            className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
