import { generateOTP } from "@/lib/generateOTP";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import * as OTPAuth from "otpauth";
import qrcode from "qrcode";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        await connectDB();

        const { name, email, password } = await req.json();

        //Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required"
                },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password must be at least 6 characters"
                },
                { status: 400 }
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
            const secret = new OTPAuth.Secret({ size: 20 });
            const secretString = secret.base32;
            existingUser.totpSecret = secretString;
            await existingUser.save();

            let totp = new OTPAuth.TOTP({
                issuer: "Placement Prep Tracker",
                label: email,
                algorithm: "SHA1",
                digits: 6,
                period: 30,
                secret: secret,
            });
            const otpauth_url = totp.toString();
            const qrCodeUrl = await qrcode.toDataURL(otpauth_url);

            return NextResponse.json(
                {
                    success: true,
                    message: "Account already exists but is not verified. A new QR code has been generated.",
                    qrCode: qrCodeUrl,
                    secret: secretString
                },
                { status: 200 }
            );
        }


        const secret = new OTPAuth.Secret({ size: 20 });
        const secretString = secret.base32;

        //Hash Password
        const hashed = await bcrypt.hash(password, 10);


        console.log("Creating user...");
        //Create User
        const newUser = await User.create(
            {

                name,
                email,
                password: hashed,

                isVerified: false,
                totpSecret: secretString,
            },


        );

        let totp = new OTPAuth.TOTP({
            issuer: "Placement Prep Tracker",
            label: email,
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: secret,
        });

        const otpauth_url = totp.toString();
        const qrCodeUrl = await qrcode.toDataURL(otpauth_url);

        console.log("User created, sending TOTP QR Code");

        return NextResponse.json(
            {
                success: true,
                message: "Scan the QR code to verify your account.",
                qrCode: qrCodeUrl,
                secret: secretString,
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            },

            { status: 201 }
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