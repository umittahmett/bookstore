import { redirect } from "@remix-run/node";
import { tokenCookie } from "@utils/cookie";

export async function loader() {
  const headers = new Headers();
  headers.append("Set-Cookie", await tokenCookie.serialize("", { maxAge: 0 }));
  return redirect("/", {
    headers,
  });
}