import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try {

        await connectDB();

        const {name,email,password} = await req.json();
        
        //Validation
        if(!name || !email || !password){
            return NextResponse.json(
                {
                    success : false,
                    message: "All fields are required"
                },
                {status : 400}
            );
        }

        if(password.length < 6){
            return NextResponse.json(
                {
                    success : false,
                    message: "Password must be at least 6 characters"
                },
                {status : 400}
            )
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return NextResponse.json(
                {
                    success : false,
                    message : "User already exists"
                },
                {status : 400}
            )
        }

        //Hash Password
        const hashed = await bcrypt.hash(password, 10);

        //Create User
        const newUser = await User.create(
            {
                
                name,
                email,
                password : hashed
            },
        );

        return NextResponse.json(
            {
                success : true,
                message: "User Registered Successfully",
                user:{
                    id: newUser._id ,
                    name: newUser.name,
                    email: newUser.email,
                },
            },

            {status : 201}
        );


        
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message : "Internal Server Error"
            },
            {status:500}
        );
    }
    
}