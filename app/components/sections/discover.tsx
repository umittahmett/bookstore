import { Button } from "@components/ui/button"
import DiscoverBackground from "@assets/images/backgrounds/discover-section-background.webp"

const Discover = () => {
  return (
    <section aria-labelledby="cause-heading">
      <div className="relative bg-zinc-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
        <div className="absolute inset-0 overflow-hidden">
          <img
            alt="Discover new worlds"
            src={DiscoverBackground}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-zinc-900 bg-opacity-50" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 id="cause-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Discover New Worlds
          </h2>
          <p className="mt-3 text-xl text-white">
            Dive into our collection of books and explore new adventures, knowledge, and stories. Our curated selection ensures you find the perfect read for every mood.
          </p>
          <Button variant='secondary' className="mt-8 sm:w-auto">Browse our collection</Button>
        </div>
      </div>
    </section>
  )
}

export default Discover