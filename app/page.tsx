import { cookies } from "next/headers";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return <HomeClient isLoggedIn={!!token} />;
}