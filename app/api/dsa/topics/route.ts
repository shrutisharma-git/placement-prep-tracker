import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import DsaTopic from "@/models/DsaTopic";
import DsaProblem from "@/models/DsaProblem";

export async function GET() {
    try {
        await connectDB();

        // Fetch all topics
        const topics = await DsaTopic.find({}).lean();

        // Iterate and count problems for each topic
        const topicIds = topics.map(t => t._id);

        // Perform an aggregation or simply count per topic
        const problemCounts = await DsaProblem.aggregate([
            { $match: { topicId: { $in: topicIds } } },
            { $group: { _id: "$topicId", count: { $sum: 1 } } }
        ]);

        // Format the response to match frontend expectations
        // original: { id, name, problems (count), color }
        const formattedTopics = topics.map((topic, index) => {
            const countObj = problemCounts.find(p => p._id.toString() === topic._id.toString());
            return {
                id: index + 1,
                _id: topic._id,
                name: topic.name,
                slug: topic.slug,
                color: topic.color,
                problems: countObj ? countObj.count : 0
            };
        });

        return NextResponse.json({ topics: formattedTopics }, { status: 200 });

    } catch (error) {
        console.error("Error fetching DSA topics:", error);
        return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
    }
}
