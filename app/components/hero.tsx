import { ArrowRight } from "lucide-react"
import { Button } from "@components/ui/button"
import Book1 from "@assets/images/books/hero-book-1.webp"
import Book2 from "@assets/images/books/hero-book-2.webp"
import Book3 from "@assets/images/books/hero-book-3.webp"
import Book4 from "@assets/images/books/hero-book-4.webp"
import Book5 from "@assets/images/books/hero-book-5.webp"
import Book6 from "@assets/images/books/hero-book-6.jpg"
import Book7 from "@assets/images/books/hero-book-7.webp"

const Hero = () => {
  return (
    <div className="pb-80 overflow-hidden relative pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div className="sm:max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
            Discover Timeless Classics
          </h1>
          <p className="mt-4 text-xl text-zinc-500">
            Dive into the world of literature with our carefully curated selection of timeless masterpieces. Whether you're seeking adventure, profound reflections, or transformative tales, our collection has something for every reader.
          </p>
        </div>

        {/* Decorative image grid */}
        <div>
          <div className="mt-10">
            <div
              aria-hidden="true"
              className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                <div className="flex items-center space-x-6 lg:space-x-8">
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                      <img
                        alt=""
                        src={Book1}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src={Book2}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src={Book3}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src={Book4}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src={Book5}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src={Book6}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        alt=""
                        src={Book7}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a href="/"><Button>Shop Now <ArrowRight className="size-5" /></Button></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero