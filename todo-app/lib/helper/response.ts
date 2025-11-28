// utils/helper/response.ts
import { NextResponse } from "next/server";

//  types for response data
type ResponseData = {
    status: string;
    data?: unknown;
    message?: string;
};

type ErrorData = {
    status: string;
    message: string;
};

const jsonResponse = (data: ResponseData | ErrorData, status: number = 200) =>
    NextResponse.json(data, { status });

// SUCCESS RESPONSES
export const success = (data: unknown = null, message: string = "Success") => 
    jsonResponse({ status: "success", data, message }, 200);

export const created = (data: unknown = null, message: string = "Created") =>
    jsonResponse({ status: "created", data, message }, 201);

export const updated = (data: unknown = null, message: string = "Updated") =>
    jsonResponse({ status: "updated", data, message}, 200);

export const deleted = (data: unknown = null, message: string = "Deleted") =>
    jsonResponse({ status: "Deleted", data, message}, 200);


// ERROR RESPONSES
export const error = (message: string = "Error", code: number = 400) => 
    jsonResponse({ status: "error", message }, code);

export const badRequest = (message: string = "Bad Request") => 
    error(message, 400); 

export const notFound = (message: string = "Not Found") =>
    error(message, 404); 

export const unauthorized = (message: string = "Unauthorized") =>
    error(message, 401);