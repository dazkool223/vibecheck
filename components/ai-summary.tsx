"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface AiSummaryProps {
  confessions: string[];
}

export default function AiSummary({ confessions }: AiSummaryProps) {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      console.log("request sent");
      const res = await fetch("/confessions/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(confessions.join(".")),
      });

      const data = await res.json();
      let content = await data.reply.text?.value;
      setResponse(content || "No response received.");
    } catch (error) {
      setResponse("Error: Failed to fetch response.");
    }
    setLoading(false);
  };

  return (
    <div>
      {!response && (
        <Button
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:bg-gray-800 text-white"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get AI Generated Summary"}
        </Button>
      )}
      {response && (
        <div className="mt-4 p-2 border rounded bg-gray-100">{response}</div>
      )}
    </div>
  );
}
