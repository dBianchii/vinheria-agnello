"use server";

import { getServerAuthSession } from "~/server/auth";
import talkToOpenAI from "~/server/gpt";

export const sendPrompt = async (prompt: string) => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const response = await talkToOpenAI(prompt);
  return response;
};
