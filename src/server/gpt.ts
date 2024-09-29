import OpenAI from "openai";
import { env } from "~/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default async function talkToOpenAI(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo", // Usando o modelo gpt-3.5-turbo
    messages: [
      {
        role: "user",
        content: `Responda de forma envolvente e concisa sobre o vinho: "${prompt}", e sempre inclua "saúde" na frase. Exemplo: 'Saúde! A melhor forma de apreciar um vinho é servir a uma temperatura ideal.'. Caso a pergunta não faça sentido, responda: Não entendi. Saúde.`,
      },
    ],
    max_tokens: 100,
  });

  return completion.choices[0]!.message.content;
}
