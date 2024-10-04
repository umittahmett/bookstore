// utils/auth.server.ts

import jwt from "jsonwebtoken";

export function createJWT(user: any) {
  return jwt.sign({ id: user._id, email: user.email, fullName: user.fullName, cartId: user.cartId }, process.env.SECRET_KEY || "", {
    expiresIn: "1h",
  });
}

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY || "");
  } catch (e) {
    return null;
  }
}
