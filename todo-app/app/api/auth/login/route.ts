// api/auth/login/route.ts
import {  NextRequest, NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {error, notFound} from "@/lib/helper/response"


  
export async function POST(request: NextRequest) {
    try{ 
        const body = await request.json();
        const {userName, password} = body; 
        const prisma = new PrismaClient();
        
        //Validate 
        if(!userName || !password){ 
            return error("Missing field");
        }
       
        //Check DB
        const user = await prisma.user.findUnique ({
            where : {username : userName}
        })
        if(!user){ 
            return notFound("User not found");
        }
        
        //password compare
        const isMatch = await bcrypt.compare(password, user.password); 
        if(!isMatch){ 
            return error("Wrong password");
        }
        
        //generate token
        const payload = { 
            id : user.id, 
            username : user.username
        }; 
        const secret = process.env.JWT_SECRET; 
        if(!secret){
            return error("Server misconfigured: JWT secret missing");
        }
        const token = jwt.sign(payload,secret, {expiresIn : "7d"}); 
        
        //set cookie then return token 
        const res = NextResponse.json(
            {message: "Login Successful!", token : token},
            {status: 201},
         
        );
        res.cookies.set ("authToken", token,{
            httpOnly: true,         //cookie cant read by jvs in browser
            secure: true,           //cookie just sending on https
            sameSite: "strict",     //CSRF
            maxAge: 60 * 60 * 24 * 7, //7days    
        });
        return res; 
        
        
    }catch{ 
          console.error("Registration error:", error); 
        return NextResponse.json(
            { error: "An error occurred during login" },
            { status: 500 }
        );
    }
}