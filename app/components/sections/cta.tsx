import Books1 from "@assets/images/books/book-sale-1.jpg"
import Books2 from "@assets/images/books/book-sale-2.jpg"
import Books3 from "@assets/images/books/book-sale-3.jpg"
import Books4 from "@assets/images/books/book-sale-4.jpg"
import Books5 from "@assets/images/books/book-sale-5.jpg"
import Books6 from "@assets/images/books/book-sale-6.jpg"

const Cta = () => {
  return (
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
                        src={Books1}
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                      />
                    </div>

                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                      <img
                        alt=""
                        src={Books2}
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="flex-shrink-0">
                      <img
                        alt=""
                        src={Books3}
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                      />
                    </div>

                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                      <img
                        alt=""
                        src={Books4}
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8">
                    <div className="flex-shrink-0">
                      <img
                        alt=""
                        src={Books5}
                        className="h-64 w-64 rounded-lg object-cover md:h-72 md:w-72"
                      />
                    </div>

                    <div className="mt-6 flex-shrink-0 sm:mt-0">
                      <img
                        alt=""
                        src={Books6}
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

  )
}

export default Cta