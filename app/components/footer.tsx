import { footerNavigation, socialLinks } from "@data/index";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import Logo from "@assets/images/logos/dark-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="default-container py-16">
        <div className="lg:flex lg:items-start lg:gap-8">
          <img src={Logo} className="h-14 w-auto" alt="Logo" />

          <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
            <div className="col-span-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Get the latest news!
                </h2>

                <p className="mt-4 text-gray-500">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse
                  non cupiditate quae nam molestias.
                </p>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
              <form className="w-full">
                <label htmlFor="UserEmail" className="sr-only">
                  {" "}
                  Email{" "}
                </label>

                <div className="relative">
                  <Input
                    type="email"
                    id="UserEmail"
                    placeholder="john@rhcp.com"
                    className="w-full border-none bg-gray-100 text-black h-16 focus:border-transparent focus:ring-transparent outline-none"
                  />

                  <Button className="absolute top-2 right-2">Sign Up</Button>
                </div>
              </form>
            </div>

            {footerNavigation.map((item, index) => (
              <div key={index} className="col-span-2 sm:col-span-1">
                <p className="font-medium text-gray-900">Services</p>

                <ul className="mt-6 space-y-4 text-sm">
                  {item.links?.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={subItem.href}
                        className="text-gray-700 transition hover:opacity-75"
                      >
                        {subItem.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end">
              {socialLinks.map((item, index) => (
                <a
                  href={item.href}
                  key={index}
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  {<item.icon className="size-5" />}
                </a>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <div className="sm:flex sm:justify-between">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Company Name. All rights reserved.
            </p>

            <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  {" "}
                  Terms & Conditions{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  {" "}
                  Privacy Policy{" "}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-500 transition hover:opacity-75"
                >
                  {" "}
                  Cookies{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
