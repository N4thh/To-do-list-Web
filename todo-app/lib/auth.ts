// app/lib/auth.ts

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function getCurrentUser() {
  try {
    //getcokkie
    const cookieStore = cookies();
    const token = (await cookieStore).get("authToken")?.value;
    if (!token) return null;
    //decode 
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username?: string };
    if (!decoded?.id) return null;
    //check db
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    return user || null;
  } catch (err) {
    console.error("Error getting current user:", err);
    return null;
  }
}

