import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();

        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email and OTP are required"
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found"
                },
                { status: 404 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User is already verified. Please login."
                },
                { status: 400 }
            );
        }

        if (user.verificationOTP !== otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid OTP"
                },
                { status: 400 }
            );
        }

        if (new Date() > new Date(user.verificationOTPExpires)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "OTP has expired. Please request a new one."
                },
                { status: 400 }
            );
        }

        // Mark user as verified and clear OTP fields
        user.isVerified = true;
        user.verificationOTP = "";
        
        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: "Email verified successfully!"
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error("VERIFY ERROR:", error);

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
