import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json(
            {message : "Logout Successfull"},
        );

        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0),
            path:"/"
        });

        return response;

    } catch (error) {
        return NextResponse.json(
            {error : "Logout failed"},
            {status : 500}
        );
    };
}