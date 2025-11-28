//lib/auth.ts
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function getCurrentUser(reqHeaders?: Headers) {
  try {
    // 1. Lấy token từ cookie
    const cookieStore = cookies();
    let token = (await cookieStore).get("authToken")?.value;

    // 2. Nếu không có cookie, thử lấy từ Authorization header
    if (!token && reqHeaders) {
      const authHeader = reqHeaders.get("Authorization");
      if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username?: string };
    if (!decoded?.id) return null;

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    return user || null;
  } catch (err) {
    console.error("Error getting current user:", err);
    return null;
  }
}
