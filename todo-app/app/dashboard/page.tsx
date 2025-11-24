import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login"); 
  }

  return (
    <div>
      <h1>Welcome {user.username}</h1>
    </div>
  );
}
