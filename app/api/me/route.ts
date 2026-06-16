import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie");

  if (!cookie) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  console.log("COOKIE:", cookie);

  const token = cookie.split("token=")[1]?.split(";")[0];

  if (!token) {
    return NextResponse.json(
      { message: "Token missing" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    return NextResponse.json({
      user: decoded,
    });

  } catch (error) {
    console.log("JWT ERROR:", error); // 🔥 debug

    return NextResponse.json(
      { message: "Invalid Token" },
      { status: 401 }
    );
  }
}