import { connectToDatabase } from "./db.server";
import bcrypt from "bcryptjs";

const client =  await connectToDatabase()
const usersCollection = client.db.collection("customers");

export async function createUser({ email, password, fullName,phone, birthDate }: { email: string; password: string,fullName: string, phone: string, birthDate: any }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await usersCollection.insertOne({
    fullName,
    email,
    password: hashedPassword,
    phone,
    birthDate,
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
