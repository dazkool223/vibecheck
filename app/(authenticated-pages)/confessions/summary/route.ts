import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { setTimeout } from "timers/promises";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_OPENAI_API_KEY,
  });
  try {
    const confessionString = await req.json();
    if (!confessionString || typeof confessionString !== "string") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }
    let threadId = process.env.NEXT_OPENAI_THREAD_ID as string;
    let assistantId = process.env.NEXT_OPENAI_ASSISTANT_ID as string;
    console.log(req.body);
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: confessionString,
    });
    console.log("message", message);
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });
    console.log("run", run);
    let retrieve = await openai.beta.threads.runs.retrieve(threadId, run.id);
    while (retrieve.status !== "completed") {
      retrieve = await openai.beta.threads.runs.retrieve(threadId, run.id);
      await setTimeout(1000);
      console.log("retrieve", retrieve);
    }
    const content = await openai.beta.threads.messages.list(threadId);
    console.log("content", content);
    return NextResponse.json(
      { reply: content.data[0].content[0] || "No response" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 }
    );
  }
}
