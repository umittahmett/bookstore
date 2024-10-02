import { createCookie } from "@remix-run/node";

export const tokenCookie = createCookie("token", {
  maxAge: 60 * 60,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});
