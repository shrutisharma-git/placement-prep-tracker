import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type UserPayload = {
    id: string,
    email: string,
    role: string
}

export async function verifyToken(){

    try {
        
        const cookieStore  =  await cookies();
        const token = cookieStore.get("token")?.value;

        if(!token){
            return NextResponse.json(
                {error : "Unauthorized-No token "},
                {status: 401}
            );
        }

        
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        )as UserPayload;

        return decoded;

         
    

    } catch (error) {
        return NextResponse.json(
            {error: "invalid or expired token"},
            {status: 401}
        )
    }
}