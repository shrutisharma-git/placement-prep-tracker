import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const cookieStore = await cookies();
        const token = cookieStore.get("refreshToken")?.value;

        if(!token){
            return NextResponse.json(
                {error : "No Refresh token"},
                {status: 401}
            )
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {id:string};

        const user = await User.findById(decoded.id);

        if(!user){
            return NextResponse.json(
                {error: "user not found"},
                {status: 404}
            )
        };

        //new accessToken
        const newAccessToken = jwt.sign(
            {
                id : decoded.id,
                email : user.email,
                role : user.role
            },
            process.env.JWT_SECRET as string,
            {expiresIn : "10m"}
            
        );

        const response = NextResponse.json(
            {message: "access token refresed"},
            {status: 200}
        );

        response.cookies.set("accessToken",newAccessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 60, //10 minutes
            path: "/"
        });

        return response;

        
    } catch (error) {
        return NextResponse.json(
            {error: "Invalid or expired refresh token"},
            {status: 401}
        )   
    }
}