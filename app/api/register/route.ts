import { verificationEmailTemplate } from "@/lib/emailTemplate";
import { generateOTP } from "@/lib/generateOTP";
import connectDB from "@/lib/mongodb";
import { sendEmail } from "@/lib/sendEmail";
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

        const existingUser = await User.findOne({ email });

    if (existingUser) {

        // Already verified account
        if (existingUser.isVerified) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists. Please login."
                },
                { status: 400 }
            );
        }

        // User exists but not verified
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        existingUser.verificationOTP = otp;
        existingUser.verificationOTPExpires = otpExpires;

        await existingUser.save();

        await sendEmail(
            email,
            "Verify your email",
            verificationEmailTemplate(existingUser.name, otp)
        );

        return NextResponse.json(
            {
                success: true,
                message: "Account already exists but is not verified. A new OTP has been sent."
            },
            { status: 200 }
        );
    }


        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

        //Hash Password
        const hashed = await bcrypt.hash(password, 10);

        
        console.log("Creating user...");
        //Create User
        const newUser = await User.create(
            {
                
                name,
                email,
                password : hashed,
                
                isVerified: false,
                verificationOTP: otp,
                verificationOTPExpires: otpExpires,
            },
            
            
        );
        console.log("User created");
        console.log("Sending OTP:", otp);
        console.log("To:", email);

        await sendEmail(
            email,
            "Verify your email",
            verificationEmailTemplate(name, otp)
        );


        console.log("Email sent");

        return NextResponse.json(
            {
                success : true,
                message: "OTP sent successfully. Please verify your email.",
                user:{
                    id: newUser._id ,
                    name: newUser.name,
                    email: newUser.email,
                },
            },

            {status : 201}
        );


        
    } catch (error: any) {
        console.error("REGISTER ERROR:", error);
    
        return NextResponse.json(
            {
                success: false,
                message: error.message || "Internal Server Error",
            },
            {
                status: 500,
            }
        );
    }
    
}