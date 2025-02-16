"use client";

import { useEffect, useState } from "react";
import { Poll } from "@/interfaces/polls";
import Link from "next/link";

export default function PollList() {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const res = await fetch("/api/polls");
            if (!res.ok) throw new Error("Failed to fetch polls");

            const data = await res.json();
            setPolls(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deletePoll = async (pollId: string) => {
        if (!confirm("Are you sure you want to delete this poll?")) return;

        try {
            const res = await fetch(`/api/polls?id=${pollId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete poll");

            setPolls((prevPolls) =>
                prevPolls.filter((poll) => poll._id !== pollId)
            );
        } catch (err) {
            console.error("Error deleting poll:", err);
        }
    };

    if (loading)
        return <p className="text-gray-400 text-center">Loading polls...</p>;
    if (polls.length === 0)
        return <p className="text-gray-400 text-center">No polls available.</p>;

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Available Polls</h2>
            {polls.map((poll) => (
                <div
                    key={poll._id}
                    className="flex justify-between items-center p-4 bg-gray-800 border border-gray-700 rounded mb-2"
                >
                    <Link
                        href={`/polls/${poll._id}`}
                        className="flex-1 hover:underline"
                    >
                        {poll.question}
                    </Link>
                    <button
                        onClick={() => deletePoll(poll._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}
