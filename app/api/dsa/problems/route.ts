import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import DsaTopic from "@/models/DsaTopic";
import DsaProblem from "@/models/DsaProblem";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const topicSlug = searchParams.get("topic");

        if (!topicSlug) {
            return NextResponse.json({ error: "Topic slug is required" }, { status: 400 });
        }

        await connectDB();

        // Find the topic by slug
        const topic = await DsaTopic.findOne({ slug: topicSlug.toLowerCase() });

        if (!topic) {
            return NextResponse.json({ error: "Topic not found" }, { status: 404 });
        }

        // Fetch all problems for this topic
        const problems = await DsaProblem.find({ topicId: topic._id }).lean();

        // Format response to match the existing arrays: { id, name, difficulty, platform, url }
        const formattedProblems = problems.map((prob, index) => ({
            id: index + 1, // original frontend used manual ids
            _id: prob._id,
            name: prob.name,
            difficulty: prob.difficulty,
            platform: prob.platform,
            url: prob.url
        }));

        return NextResponse.json({ problems: formattedProblems }, { status: 200 });

    } catch (error) {
        console.error("Error fetching DSA problems:", error);
        return NextResponse.json({ error: "Failed to fetch problems" }, { status: 500 });
    }
}
