import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import DsaTopic from "../models/DsaTopic";
import DsaProblem from "../models/DsaProblem";
import dotenv from "dotenv";

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI not found in .env.local");
    process.exit(1);
}

const seedDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB.");

        // Clear existing data to ensure idempotency
        console.log("Clearing existing DsaTopics and DsaProblems...");
        await DsaTopic.deleteMany({});
        await DsaProblem.deleteMany({});

        // Read seed data
        const dataPath = path.resolve(process.cwd(), "scripts/dsaSeedData.json");
        const rawData = fs.readFileSync(dataPath, "utf-8");
        const seedData = JSON.parse(rawData);

        console.log("Inserting topics...");
        const topicDocuments = await DsaTopic.insertMany(seedData.topics);

        // Create a map of topic slugs to their ObjectIds
        const topicMap: Record<string, string> = {};
        for (const topic of topicDocuments) {
            topicMap[topic.slug] = topic._id.toString();
        }

        console.log("Preparing problems...");
        const problemsToInsert = seedData.problems.map((prob: any) => {
            return {
                topicId: topicMap[prob.topicSlug],
                name: prob.name,
                difficulty: prob.difficulty,
                platform: prob.platform,
                url: prob.url
            };
        });

        console.log(`Inserting ${problemsToInsert.length} problems...`);
        await DsaProblem.insertMany(problemsToInsert);

        console.log("✅ Seed completed successfully!");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seedDatabase();
