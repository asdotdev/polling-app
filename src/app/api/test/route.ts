import connectToDatabase from "@/lib/mongodb";
import Poll from "@/models/Poll";

export async function GET() {
    await connectToDatabase();
    const polls = await Poll.find();
    return new Response("Vercel", Response.json(polls));
}
