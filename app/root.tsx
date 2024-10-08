import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import "./tailwind.css";
import Footer from "@components/footer";
import Navbar from "@components/navbar";
import { Toaster } from "@components/ui/sonner";
import { tokenCookie } from "@utils/cookie";
import { verifyJWT } from "@utils/auth.server";
import { useAtom, useAtomValue } from "jotai";
import { isLoadingAtom } from "@utils/jotai";
import { AnimatedCircularProgressBarDemo } from "./components/ui/progress";
import { ObjectId } from "mongodb";
import { JwtPayload } from "jsonwebtoken";
import { db } from "@utils/db.server";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Check token
    const token = await tokenCookie.parse(request.headers.get("Cookie"));
    if (!token) { return json({ user: null }) }
    const user = verifyJWT(token) as JwtPayload
    if (!user) { return json({ user: null }) }

    // get user cart products length
    const userCart = await db.collection('carts').findOne({ _id: new ObjectId(user.cartId as string) })
    let productsInCart: number = 0
    if (userCart) {
      userCart.products.map((product: any) => {
        productsInCart += product.quantity
      })
    }
    return json({ user, productsInCart });
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>();
  const isLoading = useAtomValue(isLoadingAtom);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar productsInCart={loaderData.productsInCart} user={loaderData.user} />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <Toaster />
        {isLoading && (
          <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-50 flex justify-center items-center'>
            <AnimatedCircularProgressBarDemo isLoading={isLoading} />
          </div>
        )}
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
