"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import MarkdownRenderer from "./markdown-renderer";

interface AiSummaryProps {
  confessions: string[];
}

async function fetchAISummary(confessions: string[]) {
  const res = await fetch("/confessions/summary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(confessions.join(".")),
  });

  const data = await res.json();
  let content = await data.reply.text?.value;
  console.log(content);
  return content;
}

export default function AiSummary({ confessions }: AiSummaryProps) {
  const canGenerateAISummary = confessions.length < 5;

  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      console.log("request sent");
      const content = await fetchAISummary(confessions);
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
          disabled={loading || canGenerateAISummary}
        >
          {loading ? "Loading..." : "Get AI Generated Summary"}
        </Button>
      )}
      {response && (
        <MarkdownRenderer
          markdown={response}
          className="mt-4 p-2 border rounded bg-gray-100"
        />
      )}
      {canGenerateAISummary && (
        <div className="text-red-500">
          You need atleast 5 confessions to get AI summary
        </div>
      )}
    </div>
  );
}
