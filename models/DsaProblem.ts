import mongoose, { Document, Model, Schema } from "mongoose";

export interface IDsaProblem extends Document {
    topicId: mongoose.Types.ObjectId;
    name: string;
    difficulty: "Easy" | "Medium" | "Hard";
    platform: string;
    url: string;
}

const dsaProblemSchema = new mongoose.Schema<IDsaProblem>(
    {
        topicId: {
            type: Schema.Types.ObjectId,
            ref: "DsaTopic",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default (mongoose.models.DsaProblem as Model<IDsaProblem>) ||
    mongoose.model<IDsaProblem>("DsaProblem", dsaProblemSchema);
