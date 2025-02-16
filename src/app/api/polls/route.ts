import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Poll from "@/models/Poll";

// 🔗 CONNECT TO DATABASE
await connectToDatabase();

// 📌 GET: Fetch all polls OR a single poll by ID
export async function GET(req: Request) {
    await connectToDatabase();
    try {
        const { searchParams } = new URL(req.url);
        const pollId = searchParams.get("id");

        if (pollId) {
            const poll = await Poll.findById(pollId);
            if (!poll)
                return NextResponse.json(
                    { error: "Poll not found" },
                    { status: 404 }
                );
            return NextResponse.json(poll);
        } else {
            const polls = await Poll.find();
            return NextResponse.json(polls);
        }
    } catch (error) {
        console.error("Error fetching polls:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// 📝 POST: Create a new poll
export async function POST(req: Request) {
    try {
        const { question, options } = await req.json();
        if (!question || !options || options.length < 2) {
            return NextResponse.json(
                { error: "Invalid poll data" },
                { status: 400 }
            );
        }

        const newPoll = new Poll({
            question,
            options: options.map((text: string) => ({ text, votes: 0 })),
        });

        await newPoll.save();
        return NextResponse.json(newPoll, { status: 201 });
    } catch (error) {
        console.error("Error creating poll:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// ✅ PUT: Vote on a poll
export async function PUT(req: Request) {
    try {
        const { pollId, optionIndex } = await req.json();
        if (!pollId || optionIndex === undefined) {
            return NextResponse.json(
                { error: "Poll ID and option index required" },
                { status: 400 }
            );
        }

        const poll = await Poll.findById(pollId);
        if (!poll)
            return NextResponse.json(
                { error: "Poll not found" },
                { status: 404 }
            );

        poll.options[optionIndex].votes += 1;
        await poll.save();

        return NextResponse.json(poll);
    } catch (error) {
        console.error("Error submitting vote:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// ❌ DELETE: Remove a poll by ID
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const pollId = searchParams.get("id");

        if (!pollId) {
            return NextResponse.json(
                { error: "Poll ID is required" },
                { status: 400 }
            );
        }

        const deletedPoll = await Poll.findByIdAndDelete(pollId);
        if (!deletedPoll) {
            return NextResponse.json(
                { error: "Poll not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Poll deleted successfully" });
    } catch (error) {
        console.error("Error deleting poll:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
