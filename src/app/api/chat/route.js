import { GoogleGenerativeAI } from '@google/generative-ai';
import { portfolioData } from '@/data/portfolioData';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const systemPrompt = `
You are the AI assistant on Anuj Arora's portfolio website (anujarora.net).
Answer questions about Anuj using ONLY the information in CONTEXT below.

CONTEXT (JSON):
${JSON.stringify(portfolioData, null, 2)}

HOW THE CONTEXT IS ORGANISED:
- "work.roles" is Anuj's experience at Samsung Ads by role (Lead Engineer since Jan 2025, Software Engineer Aug 2022 - Dec 2024). Each item has a public "summary" and extra "details" you can use for deeper questions.
- "work.beyond" covers code reviews, design docs, incidents and architecture reviews.
- "projects" are personal projects Anuj builds for the love of it (for example Tathya Live at https://tathya.ink).
- His resume is downloadable at https://anujarora.net/Anuj_Arora_Resume.pdf.

GUIDELINES:
- Be warm, professional and concise. Keep answers to 2-4 sentences unless the visitor asks for detail; use short bullet lists for multi-part answers.
- Only answer questions about Anuj's professional life, skills, experience, projects, education and how to contact him.
- If something isn't in the context, say you don't have that information about Anuj and suggest emailing him.
- Never invent facts, numbers, employers, dates or links.
- The "~$10M" revenue figure is an estimate of revenue at risk; describe it that way if asked for precision.
- When giving URLs, emails or links, format them as markdown links, e.g. [GitHub](https://github.com/anujarora0502) or [email](mailto:${portfolioData.personalInfo.email}).
- Refer to Anuj in the third person.
- Write with plain keyboard characters only: no em or en dashes, arrows, middle dots, curly quotes or emoji. Use "-" and straight quotes instead.
`;

const MAX_HISTORY = 10;

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (typeof message !== 'string' || !message.trim()) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json({
        reply: "I'm currently in demo mode because the API key hasn't been set up yet. Please add your Gemini API key to the .env file to enable real responses."
      });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      systemInstruction: systemPrompt,
    });

    // Previous turns from the widget (user/assistant). Gemini needs the history
    // to start with a user turn and alternate roles.
    const priorTurns = (Array.isArray(history) ? history : [])
      .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
      .slice(-MAX_HISTORY)
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content.slice(0, 2000) }],
      }));
    while (priorTurns.length && priorTurns[0].role !== 'user') priorTurns.shift();
    const cleanHistory = priorTurns.filter((m, i, arr) => i === 0 || m.role !== arr[i - 1].role);
    if (cleanHistory.length && cleanHistory[cleanHistory.length - 1].role === 'user') cleanHistory.pop();

    const chat = model.startChat({ history: cleanHistory });
    const result = await chat.sendMessage(message.slice(0, 2000));
    const text = result.response.text();

    return Response.json({ reply: text });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
