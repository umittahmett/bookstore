import { useState } from 'react'
import { LogOut, Menu, Search, ShoppingBag, UserCircle } from 'lucide-react'
import { navigation } from '~/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import DarkLogo from "@assets/images/logos/dark-logo.png";
import { AvatarIcon } from '@radix-ui/react-icons'
import { NavbarProps } from '~/types'
import { Input } from '@components/ui/input'
import { Button } from '@components/ui/button'
import { useNavigate, useSearchParams } from '@remix-run/react'

const Navbar: React.FC<NavbarProps> = ({ user, productsInCart }) => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(searchParams.get("keyword") || '');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent
          className="w-dvw lg:hidden max-h-dvh overflow-y-auto"
        >
          {/* Links */}
          <Tabs className="mt-12">
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

          {/* Kullanıcı login değilse Sign In ve Create Account linkleri */}
          {!user ? (
            <div className="space-y-6 border-t border-zinc-200 px-4 py-6">
              <div className="flow-root">
                <a href="/auth/login" className="-m-2 block p-2 font-medium text-zinc-900">
                  Sign in
                </a>
              </div>
              <div className="flow-root">
                <a href="/auth/register" className="-m-2 block p-2 font-medium text-zinc-900">
                  Create account
                </a>
              </div>
            </div>
          ) : (
            <div className="border-t border-zinc-200 px-4 pt-4">
              <div className="flow-root">
                <a href="/profile" className="flex items-center gap-2.5 p-2 font-medium text-zinc-900">
                  <AvatarIcon className='size-6' />
                  My Account
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <header className="relative bg-white border-b border-zinc-200">
        <div className='flex items-center gap-8 flex-shrink-0 pt-2 !pr-10 default-container max-lg:hidden'>
          {navigation.pages.map((page) => (
            <a
              key={page.name}
              href={page.href}
              className="flex items-center text-xs font-medium text-zinc-600 hover:text-zinc-800 duration-200"
            >
              {page.name}
            </a>
          ))}
        </div>
        <nav aria-label="Top" className="default-container pb-2">
          <div className="">
            <div className="flex pt-3 pb-1 items-center">
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
                      <DropdownMenuTrigger className="outline-none relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-zinc-700 transition-colors duration-200 ease-out hover:text-zinc-800 duration-200 data-[open]:text-indigo-600">
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
                                          <a href={item.href} className="hover:text-zinc-800 duration-200">
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
                </div>
              </div>

              <div className="relative mx-8 w-full flex-1 max-lg:hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search aria-hidden="true" className="h-5 w-5 text-zinc-400" />
                </div>
                <Input
                  id="search"
                  name="search"
                  type="search"
                  placeholder="Search"
                  className="pl-12 pr-14"
                  onChange={handleInputChange}
                  defaultValue={keyword}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <div className="absolute inset-y-0 right-[7px] flex items-center pl-3">
                  <Button className="!h-9" size="sm" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="hidden">
                  <input type="submit" />
                </form>
              </div>

              <div className="ml-auto flex items-center">

                {!user &&
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a href="/auth/login" className="text-sm font-medium text-zinc-700 hover:text-zinc-800 duration-200">
                      Sign in
                    </a>
                    <span aria-hidden="true" className="h-6 w-px bg-zinc-200" />
                    <a href="/auth/register" className="text-sm font-medium text-zinc-700 hover:text-zinc-800 duration-200">
                      Create account
                    </a>
                  </div>
                }

                {/* Cart */}
                <div className="ml-4 lg:ml-6 flex items-center gap-6">
                  <a href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBag
                      aria-hidden="true"
                      className="h-6 w-6 flex-shrink-0 text-zinc-400 group-hover:text-zinc-800 duration-200"
                    />
                    <span className="ml-2 text-sm font-medium text-zinc-700 group-hover:text-zinc-800 duration-200">{productsInCart}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>

                  <DropdownMenu open={profileOpen} onOpenChange={setProfileOpen} >
                    <DropdownMenuTrigger>
                      <button className='p-2 pl-0'>
                        <UserCircle className='size-6 group-hover:text-zinc-800 duration-200 text-zinc-400' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      {user ?
                        (
                          <div>
                            {
                              navigation.profileNavigation.map((item, index) => (
                                <DropdownMenuItem key={index} className='p-0'>
                                  <a href={item.href} className='flex items-center gap-2 justify-start p-2.5 cursor-pointer'>
                                    <item.icon className='size-5' />
                                    {item.name}
                                  </a>

                                </DropdownMenuItem>
                              ))
                            }
                            <DropdownMenuItem className='p-0 bg-zinc-50 -m-1 -mt-0'>
                              <a href="/api/logout" className='flex items-center text-amber-500 gap-2 justify-start p-3.5 cursor-pointer'>
                                <LogOut className='size-5 rotate-180' />
                                Log out
                              </a>
                            </DropdownMenuItem>
                          </div>

                        )
                        :
                        <div className='flex flex-col gap-1'>
                          <a href="/auth/login">
                            <Button size="md" className="w-full">
                              Login
                            </Button>
                          </a>
                          <a href="/auth/register" className=''>
                            <Button size="md" variant='outline' className="w-full">
                              Create an account
                            </Button>
                          </a>
                        </div>
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-2 w-full flex-1 lg:hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search aria-hidden="true" className="h-5 w-5 text-zinc-400" />
            </div>
            <Input
              id="search"
              name="search"
              type="search"
              placeholder="Search"
              className="pl-12 pr-14"
              onChange={handleInputChange}
              defaultValue={keyword}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <div className="absolute inset-y-0 right-[7px] flex items-center pl-3">
              <Button className="!h-9" size="sm" onClick={handleSearch}>
                Search
              </Button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="hidden">
              <input type="submit" />
            </form>
          </div>
        </nav>
      </header>
    </div >
  )
}

export default Navbar