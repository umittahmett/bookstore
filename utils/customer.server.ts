import { mongodb, ObjectId } from "./db.server";
import bcrypt from "bcryptjs";

const usersCollection = mongodb.db("bookstore").collection("customers");

export async function createUser({ email, password, fullName }: { email: string; password: string,fullName: string }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await usersCollection.insertOne({
    fullName,
    email,
    password: hashedPassword,
  });
  return result.insertedId;
}

export async function findUserByEmail(email: string) {
  return await usersCollection.findOne({ email });
}

export async function validatePassword(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}
