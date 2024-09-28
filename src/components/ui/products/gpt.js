import OpenAI from 'openai';
import dotenv from 'dotenv';


dotenv.config();

const key = "sk-PYHexFc_4cSw6EOgNzrae3GbJBtLEb2OoWLGN5mzZsT3BlbkFJijUdmlVScgCsP3pmJ3brBdpXw-lL0DqFG3N4cWbO0A"

const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true
});

export default async function sendPrompt(prompt) {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Usando o modelo gpt-3.5-turbo
        messages: [
            {
                role: "user",
                content: `Responda de forma envolvente e concisa sobre o vinho: "${prompt}", e sempre inclua "saúde" na frase. Exemplo: 'Saúde! A melhor forma de apreciar um vinho é servir a uma temperatura ideal.'. Caso a pergunta não faça sentido, responda: Não entendi. Saúde.`
            }
        ],
        max_tokens: 100,
    });

    return completion.choices[0].message.content; // Acesse o conteúdo da resposta
}
