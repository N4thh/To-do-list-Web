import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete("token"); 
  cookieStore.delete("session"); // nếu có

  return NextResponse.json({ success: true });
}
