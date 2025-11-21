import { GoogleGenerativeAI } from '@google/generative-ai';
import { portfolioData } from '@/data/portfolioData';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ 
        reply: "I'm currently in demo mode because the API key hasn't been set up yet. Please add your Gemini API key to the .env file to enable real responses." 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const systemPrompt = `
      You are a helpful and professional AI assistant for Anuj Arora's portfolio website.
      Your goal is to answer questions about Anuj based strictly on the following information.
      
      CONTEXT:
      ${JSON.stringify(portfolioData, null, 2)}

      GUIDELINES:
      - Be polite, professional, and concise.
      - Only answer questions related to Anuj's professional life, skills, experience, and projects.
      - If the answer is not in the context, say "I don't have that information about Anuj."
      - Do not make up facts.
      - Keep responses under 3-4 sentences unless asked for details.
    `;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am ready to answer questions about Anuj Arora based on the provided context." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return Response.json({ reply: text });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
