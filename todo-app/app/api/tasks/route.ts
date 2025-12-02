// api/tasks/route.ts

import { NextRequest, NextResponse } from "next/server";

import {isEmpty} from "@/lib/helper/validators";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, created } from "@/lib/helper/response";

export async function POST(request:NextRequest) {
    //create new task 
    try{
        const user = await getCurrentUser(request.headers); 
        if(!user){ 
            return new NextResponse ("Don't have permission" , {status: 401})
        }
        
        const body = await request.json (); 
        const {title, description, priority, status, type, dueDate} = body; 
        
        if( isEmpty(title) || isEmpty(type))
        { return badRequest("All fields are required");}
        
        const newTask = await prisma.task.create({
            data :
            {
                title,
                description,
                priority,
                status,
                type,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                userId: user.id
            },  
        });

        return created ({ 
            title : newTask.title, 
            description : newTask.description, 
            priority : newTask.priority, 
            status : newTask.status, 
            type : newTask.type, 
            dueDate : newTask.dueDate, 
        })
        
    }catch(error){
        console.error(" ", error); 
                return NextResponse.json(
                    { error: "" },
                    { status: 500 }
                );
    }
}

