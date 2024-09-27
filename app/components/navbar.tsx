import { useState } from 'react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { navigation } from '~/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent } from './ui/dialog'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import DarkLogo from "@assets/images/logos/dark-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent
          className="w-dvw lg:hidden max-h-dvh overflow-y-auto"
        >
          <div className="flex px-4 pb-2 pt-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-zinc-400"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <Tabs className="mt-2">
            <div className="border-b border-zinc-200">
              <TabsList className="-mb-px flex space-x-8 px-4">
                {navigation.categories.map((category, index) => (
                  <TabsTrigger
                    value={category.id}
                    key={index}
                    className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-zinc-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {navigation.categories.map((category) => (
              <TabsContent value={category.id} key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                <div className="grid grid-cols-2 gap-x-4">
                  {category.featured.map((item) => (
                    <div key={item.name} className="group relative text-sm">
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-zinc-100 duration-200 group-hover:opacity-75">
                        <img alt={item.imageAlt} src={item.imageSrc} className="object-cover object-center" />
                      </div>
                      <a href={item.href} className="mt-6 block font-medium text-zinc-900">
                        <span aria-hidden="true" className="absolute inset-0 z-10" />
                        {item.name}
                      </a>
                      <p aria-hidden="true" className="mt-1">
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
                {category.sections.map((section) => (
                  <div key={section.name}>
                    <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-zinc-900">
                      {section.name}
                    </p>
                    <ul
                      role="list"
                      aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                      className="mt-6 flex flex-col space-y-6"
                    >
                      {section.items.map((item) => (
                        <li key={item.name} className="flow-root">
                          <a href={item.href} className="-m-2 block p-2 text-zinc-500">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </TabsContent>
            ))}

          </Tabs>

          <div className="space-y-6 border-t border-zinc-200 px-4 py-6">
            {navigation.pages.map((page) => (
              <div key={page.name} className="flow-root">
                <a href={page.href} className="-m-2 block p-2 font-medium text-zinc-900">
                  {page.name}
                </a>
              </div>
            ))}
          </div>

          <div className="space-y-6 border-t border-zinc-200 px-4 py-6">
            <div className="flow-root">
              <a href="#" className="-m-2 block p-2 font-medium text-zinc-900">
                Sign in
              </a>
            </div>
            <div className="flow-root">
              <a href="#" className="-m-2 block p-2 font-medium text-zinc-900">
                Create account
              </a>
            </div>
          </div>

          <div className="border-t border-zinc-200 px-4 py-6">
            <a href="#" className="-m-2 flex items-center p-2">
              <img
                alt=""
                src="https://tailwindui.com/img/flags/flag-canada.svg"
                className="block h-auto w-5 flex-shrink-0"
              />
              <span className="ml-3 block text-base font-medium text-zinc-900">CAD</span>
              <span className="sr-only">, change currency</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      <header className="relative bg-white">
        <nav aria-label="Top" className="default-container">
          <div className="border-b border-zinc-200">
            <div className="flex h-24 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-zinc-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Menu aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src={DarkLogo}
                    className="h-8 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <DropdownMenu key={category.name} >
                      <DropdownMenuTrigger className="outline-none relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-zinc-700 transition-colors duration-200 ease-out hover:text-zinc-800 data-[open]:text-indigo-600">
                        {category.name}
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        className="left-0 w-dvw rounded-none !-top-2"
                      >
                        <div className="relative bg-white">
                          <div className="default-container">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-zinc-100 duration-200 group-hover:opacity-75">
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="object-cover object-center"
                                      />
                                    </div>
                                    <a href={item.href} className="mt-6 block font-medium text-zinc-900">
                                      <span aria-hidden="true" className="absolute inset-0 z-10" />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium text-zinc-900">
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a href={item.href} className="hover:text-zinc-800">
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </DropdownMenuContent>

                    </DropdownMenu>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-zinc-700 hover:text-zinc-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="/auth/login" className="text-sm font-medium text-zinc-700 hover:text-zinc-800">
                    Sign in
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-zinc-200" />
                  <a href="/auth/register" className="text-sm font-medium text-zinc-700 hover:text-zinc-800">
                    Create account
                  </a>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-zinc-700 hover:text-zinc-800">
                    <img
                      alt=""
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="/search" className="p-2 text-zinc-400 hover:text-zinc-500">
                    <span className="sr-only">Search</span>
                    <Search aria-hidden="true" className="h-6 w-6" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBag
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-zinc-400 group-hover:text-zinc-500"
                    />
                    <span className="ml-2 text-sm font-medium text-zinc-700 group-hover:text-zinc-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar