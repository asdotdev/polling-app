"use client";

import PollResults from "@/components/PollResults";
import { useParams } from "next/navigation";
import React from "react";

export default function PollPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="max-w-lg mx-auto p-4">
            <PollResults pollId={id} />
        </div>
    );
}
