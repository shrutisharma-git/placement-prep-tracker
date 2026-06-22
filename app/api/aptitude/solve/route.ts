import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const result = await verifyToken();

    if (result instanceof NextResponse) {
        return result;
    }

    const { questionName } = await req.json();

    await connectDB();

    const user = await User.findById(result.id);

    if (user.solvedQuestions.includes(questionName)) {
        return NextResponse.json({
            message: "Already solved!"
        });
    }

    await User.findByIdAndUpdate(
        result.id,
        {
            $inc: {
                "stats.aptitude": 1
            },

            $push: {
                solvedQuestions: questionName,
                activity: `Solved aptitude question: ${questionName}`
            }
        }
    );

    return NextResponse.json({
        message: "Question marked as solved"
    });
}