import { Button } from "@components/ui/button"
import { Outlet, useLocation } from "@remix-run/react"
import { profileNavigation } from "~/data"
import clsx from "clsx"

export default function OrderManagement() {
  const location = useLocation()
  const pathName = location.pathname

  return (
    <div className="flex default-container h-fit pb-10">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-50 p-6 h-dvh mt-6 rounded-lg border border-zinc-200">
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
      <main className="flex-1 p-6 overflow-auto">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}