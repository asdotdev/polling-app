"use client";

import { useState } from "react";

export default function PollForm() {
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState<string[]>(["", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const addOption = () => setOptions([...options, ""]);
    const updateOption = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const createPoll = async () => {
        if (
            question.trim() === "" ||
            options.some((opt) => opt.trim() === "")
        ) {
            setError("All fields are required.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/polls", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, options }),
            });

            if (!res.ok) throw new Error("Failed to create poll");

            window.location.reload();
        } catch (err) {
            console.error("Error creating poll:", err);
            setError("Error creating poll.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 border border-gray-700 rounded bg-gray-900 shadow-md text-white">
            <h2 className="text-xl font-semibold mb-3">Create a Poll</h2>

            <input
                type="text"
                placeholder="Poll Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded mb-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded mb-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ))}

            <button
                onClick={addOption}
                className="text-blue-400 hover:text-blue-300 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                + Add Option
            </button>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
                onClick={createPoll}
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {loading ? "Creating..." : "Create Poll"}
            </button>
        </div>
    );
}
