"use client";

import { useEffect, useState } from "react";
import { Poll } from "@/interfaces/polls";

export default function PollResults({ pollId }: { pollId: string }) {
    const [poll, setPoll] = useState<Poll | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const res = await fetch(`/api/polls?id=${pollId}`);
                if (!res.ok) throw new Error("Failed to fetch poll");

                const data = await res.json();
                setPoll(data);
            } catch (err) {
                console.error("Error loading poll:", err);
                setError("Error loading poll");
            }
        };

        fetchPoll();
        const interval = setInterval(fetchPoll, 5000);
        return () => clearInterval(interval);
    }, [pollId]);

    const vote = async (optionIndex: number) => {
        try {
            const res = await fetch("/api/polls", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pollId, optionIndex }),
            });

            if (!res.ok) throw new Error("Voting failed");
        } catch {
            setError("Error submitting vote");
        }
    };

    if (error) return <p className="text-red-400 text-center">{error}</p>;
    if (!poll)
        return <p className="text-gray-400 text-center">Loading poll...</p>;

    return (
        <div className="p-6 bg-gray-900 text-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{poll.question}</h3>
            <ul>
                {poll.options.map((option, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center p-3 border-b border-gray-700"
                    >
                        <span>
                            {option.text}: {option.votes}
                        </span>
                        <button
                            onClick={() => vote(index)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Vote
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
