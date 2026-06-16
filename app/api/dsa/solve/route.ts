import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const result = await verifyToken();

    if (result instanceof NextResponse) {
        return result;
    }

    const { problemName } = await req.json();

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
        result.id,
        {
            $inc: {
                "stats.dsa": 1
            },

            $push: {
                activity: `Solved ${problemName} problem`
            }
        },

        {
            new: true
        }
    );

    console.log(updatedUser?.stats);

    return NextResponse.json({
        message: "DSA count updated",
        stats: updatedUser?.stats
    });
}