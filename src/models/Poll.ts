import mongoose, { Schema, Document } from "mongoose";

export interface IPoll extends Document {
    question: string;
    options: { text: string; votes: number }[];
}

const PollSchema: Schema = new Schema({
    question: { type: String, required: true },
    options: [
        {
            text: { type: String, required: true },
            votes: { type: Number, default: 0 },
        },
    ],
});

export default mongoose.models.Poll ||
    mongoose.model<IPoll>("Poll", PollSchema);
