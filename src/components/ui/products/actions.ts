"use server";

import talkToOpenAI from "~/server/gpt";

export const sendPrompt = async (prompt: string) => {
  const response = await talkToOpenAI(prompt);
  return response;
};
