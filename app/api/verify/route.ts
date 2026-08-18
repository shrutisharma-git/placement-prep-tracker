import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import * as OTPAuth from "otpauth";

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

        let totp = new OTPAuth.TOTP({
            issuer: "Placement Prep Tracker",
            label: user.email,
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(user.totpSecret),
        });

        const delta = totp.validate({ token: otp, window: 1 });

        if (delta === null) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid or expired Authenticator code"
                },
                { status: 400 }
            );
        }

        // Mark user as verified
        user.isVerified = true;

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
