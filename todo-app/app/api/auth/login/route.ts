// api/auth/login/route.ts
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";


export async function POST(request :NextRequest) {
    //nhan request body: user name, password 
    const res = await request.json();
    const userName = res.userName;
    const password = res.password; 


    //create token - access token , refresh token for 3 months 
    //tra token 
}