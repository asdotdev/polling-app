import mongoose from "mongoose";

const MONGO_URI: string = process.env.DB_CONN_STRING as string;

if (!MONGO_URI) {
    throw new Error("Please define the DB_CONN_STRING environment variable");
}

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export default connectToDatabase;
