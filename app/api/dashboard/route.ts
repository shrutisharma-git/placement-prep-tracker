import connectDB from "@/lib/mongodb";
import { updateStreak } from "@/lib/updateStreak";
import { verifyToken } from "@/lib/verifyToken";
import User from "@/models/User";
import { NextResponse } from "next/server";

function checkRole(userRole:string,allowedRoles:string[]) {
    return allowedRoles.includes(userRole);
}

export async function GET() {
    const result  = await verifyToken();
    await updateStreak(result.id);
    
    if(result instanceof NextResponse){
        return result;
    }

    const user = result;

    if(!checkRole(user.role,["user","admin"])){
        return NextResponse.json(
            {message: "access denied"},
            {status:403}
        )
    }

    await connectDB();

    const dbUser = await User.findById(user.id);

    return NextResponse.json({
        message: "Welcome to Dashboard",
        user: {
            id: dbUser._id,
            email: dbUser.email
        },
    
        stats: dbUser.stats,
        activity: dbUser.activity,
        solvedProblems: dbUser.solvedProblems,
        solvedQuestions: dbUser.solvedQuestions,
        solvedInterviewQuestions: dbUser.solvedInterviewQuestions,
        streak: dbUser.streak,
        
    });
}