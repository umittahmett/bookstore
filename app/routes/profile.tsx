import { Button } from "@components/ui/button"
import { Link, Outlet, useLocation } from "@remix-run/react"
import { profileNavigation } from "~/data"
import clsx from "clsx"
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { tokenCookie } from "@utils/cookie";
import { verifyJWT } from "@utils/auth.server";
import { ChevronLeft } from "lucide-react";

// Enum for mapping pathnames to page names
enum PageNames {
  "/profile" = "Profile",
  "/profile/orders" = "Orders",
  "/profile/addresses" = "Addresses",
  "/profile/user-info" = "User Information",
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const token = await tokenCookie.parse(request.headers.get("Cookie"));

    if (!token) {
      console.log("Token bulunamadı, kullanıcı login değil.");
      return redirect("/auth/login");
    }

    const user = verifyJWT(token);

    if (!user) {
      console.log("Token geçersiz veya süresi dolmuş.");
      return redirect("/auth/login");
    }

    return json({ user });
  } catch (error) {
    console.error("Loader sırasında bir hata oluştu:", error);
    throw new Error("Sunucu hatası: Kullanıcı doğrulama işlemi başarısız.");
  }
};

export default function ProfileLayout() {
  const location = useLocation()
  const pathName = location.pathname

  // Get the page name from the enum, or use a default if not found
  const pageName = PageNames[pathName as keyof typeof PageNames] || "Profilim"

  return (
    <div className="flex default-container h-fit pb-10">
      {/* Sidebar */}
      <aside className="w-64 max-lg:hidden bg-zinc-50 p-6 h-dvh mt-6 rounded-lg border border-zinc-200">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Ümit Ahmet</h2>
        </div>
        <nav>
          {
            profileNavigation.map((item, index) => (
              <a key={index} href={item.href}>
                <Button variant="ghost" className={clsx("w-full mt-2.5 justify-start hover:bg-amber-100", pathName === item.href && "bg-amber-500 hover:bg-amber-500 text-white hover:text-white")}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </a>
            ))
          }
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:p-6 overflow-auto py-6">
        {pageName !== "Profile" &&
          <div className="flex items-center justify-start gap-2.5 pb-6">
            <Link to='/profile'>
              <Button size='icon' variant='outline'>
                <ChevronLeft className="size-6" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">{pageName}</h1>
          </div>
        }
        <div className="w-full">
          <Outlet />
        </div>
      </main >
    </div >
  )
}