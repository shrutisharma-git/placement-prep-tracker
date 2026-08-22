import mongoose, { Document, Model } from "mongoose";

export interface IDsaTopic extends Document {
    name: string;
    slug: string;
    color: string;
}

const dsaTopicSchema = new mongoose.Schema<IDsaTopic>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        color: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default (mongoose.models.DsaTopic as Model<IDsaTopic>) ||
    mongoose.model<IDsaTopic>("DsaTopic", dsaTopicSchema);
