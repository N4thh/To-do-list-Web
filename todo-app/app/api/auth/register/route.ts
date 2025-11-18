// api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
 
import { prisma } from "@/lib/prisma";
import { isEmail, isEmpty, isStrongPassword } from "@/lib/helper/validators";
import { badRequest, created } from "@/lib/helper/response";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json(); 
        const { firstName, lastName, userName, email, password } = body;
        
        // VALIDATION 
        if (
            isEmpty(firstName) ||
            isEmpty(lastName) ||
            isEmpty(userName) ||
            isEmpty(email) ||
            isEmpty(password)
        ) {
            return badRequest("All fields are required");
        }
 
        if (!isEmail(email)) {
            return badRequest("Invalid email format"); 
        }

        if (!isStrongPassword(password)) { 
            return badRequest("Password must be at least 8 characters with 1 uppercase and 1 number");
        }

        // CHECK EXISTING USER 
        const existUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        });
        if (existUserByEmail) {
            return badRequest("This email is already registered");
        }

        const existUserByUsername = await prisma.user.findUnique({
            where: { username: userName }
        });
        if (existUserByUsername) { 
            return badRequest("This username is already taken");
        }
        
        //hash
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // CREATE USER
        const newUser = await prisma.user.create({
            data: { 
                firstName: firstName, 
                lastName: lastName, 
                username: userName, 
                email: email, 
                password: hashedPassword,
            },
        });
    
        return created(
            {
                id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            },
            "Registration successful"
        );

    } catch (error) {
        console.error("Registration error:", error); 
        return NextResponse.json(
            { error: "An error occurred during registration" },
            { status: 500 }
        );
    }
}