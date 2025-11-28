// api/task/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";

import {isEmpty} from "@/lib/helper/validators";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { badRequest, updated, deleted } from "@/lib/helper/response";


export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    /*
    Get session/token
    If invalid → 401

    Get params.id (taskId)
    If missing → 400 Bad Request 

    Parse JSON
    Validate required fields
    Validate enum values

    Validate exis data
    update task to DB

    Return update task 
    */

    const user = await getCurrentUser(request.headers); 
    if(!user){ 
        return new NextResponse ("Don't have permission" , {status: 401})
    } 

    const { id: taskID } = await context.params;
    const exisTask = await prisma.task.findUnique ({
        where : {id : taskID},
    });
    if(!exisTask){
        return badRequest("Task not found");
    }

    const body = await request.json(); 
    const {title, description, priority, status, type, dueDate} = body; 
    if(isEmpty(title) || isEmpty(type)){
        return badRequest ("All fields are required");
    }

    const updateTask = await prisma.task.update({
        where: {
            id : taskID,
        },
        data: 
        {
            title : title,
            description : description, 
            priority : priority, 
            status : status , 
            type : type, 
            dueDate : dueDate,
        },
    });

    return updated ({ 
        title: updateTask.title, 
        description : updateTask.description, 
        priority : updateTask.priority, 
        status : updateTask.status, 
        type : updateTask.type, 
        dueDate : updateTask.dueDate,
    });

}

export async function DELETE(request: NextRequest, context: {params : Promise <{id: string}>}) {   //use context because Nexjs change the way to handle params
   /*
    Get session/token
    If invalid → 401

    Get params.id (taskId)
    If missing → 400 Bad Request

    Validate exis data
    Delete task to DB

    Return delete status 
    */
   const user = getCurrentUser(request.headers); 
   if(!user){
        return new NextResponse ("Don't have permission" , {status: 401})
   }

   const {id: TaskID} = await context.params;  //Next.JS app router: params now is Promise so need to await it
   const exisTask = await prisma.task.findUnique({
    where: {id: TaskID},
   });

   if(!exisTask){
    return badRequest("Task not found");
   }

   const deletedTask = await prisma.task.delete({
    where: {id: TaskID},
   });

   return deleted ({
    id: deletedTask.id,
   }); 
   
}
