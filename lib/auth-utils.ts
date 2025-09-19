import { auth } from "@/lib/auth";
import type { DefaultSession } from "next-auth";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: string;
}

export { auth };

export async function getCurrentUser(): Promise<User | undefined> {
  const session = await auth();
  return session?.user as User | undefined;
}
