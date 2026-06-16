import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {
        await connectDB();

        const {email, password} = await req.json();

        if(!email || !password){
            return NextResponse.json(
                {
                    success: false,
                    message : "All fields are required"
                },
                {status : 400}
            )
        }

        //check user
        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json(
                {
                    success: true,
                    message: "Invalid email or password"
                },
                {status: 400}
            )
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return NextResponse.json(
                {
                    success:false,
                    message : "Invalid email or password"
                },
                {status : 400}
            );
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },

            process.env.JWT_SECRET as string,
            {
                expiresIn : "1d"
            }
        );

        // //refresh token cookie
        // const refreshToken = jwt.sign(
        //     {id : user.id},
        //     process.env.JWT_SECRET as string,
        //     {
        //         expiresIn : "7d"
        //     }
        // );

        const response =  NextResponse.json(
            {
                success: true,
                message : "User logged in successfully"
            },
            {status : 200}
        )

        response.cookies.set("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 10 * 60, // 10 minutes
            path: "/"
            }
        );

        // response.cookies.set("refreshToken", refreshToken,{
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "strict",
        //     maxAge: 7 * 24 * 60 * 60, // 7 days
        //     path: "/"
        //     }
        // );

        return response; 

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message : "Something went wrong"
            },
            {status : 500}
        )
    }
}