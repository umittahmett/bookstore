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
    const token = await tokenCookie.parse(request.headers.get("Cookie"));

    if (!token) {
      console.log("Token bulunamadı, kullanıcı login değil.");
      return json({ user: null });
    }

    const user = verifyJWT(token);

    if (!user) {
      console.log("Token geçersiz veya süresi dolmuş.");
      return json({ user: null });
    }

    console.log("User bulundu:", user);
    return json({ user });
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar user={loaderData.user} />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
