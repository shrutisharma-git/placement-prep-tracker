import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/sendEmail";

export async function GET() {
  try {
    await sendEmail(
      "er.shruti.sharma21@gmail.com", // apni verified email
      "Resend Test",
      "<h1>Congratulations 🎉</h1><p>Resend is connected successfully.</p>"
    );

    return NextResponse.json({
      message: "Email Sent Successfully",
    });
  } catch (error: any) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      {
        message: "Email Failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}