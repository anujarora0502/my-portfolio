import { portfolioData } from '@/data/portfolioData';

const systemPrompt = `
You are the AI assistant on Anuj Arora's portfolio website (anujarora.net).
Answer questions about Anuj using ONLY the information in CONTEXT below.

CONTEXT (JSON):
${JSON.stringify(portfolioData, null, 2)}

HOW THE CONTEXT IS ORGANISED:
- "work.roles" is Anuj's experience at Samsung Ads by role (Lead Engineer since Jan 2025, Software Engineer Aug 2022 - Dec 2024). Each item has a public "summary" and extra "details" you can use for deeper questions.
- "work.beyond" covers code reviews, design docs, incidents and architecture reviews.
- "projects" are personal projects Anuj builds for the love of it (for example Milo at https://milo.strails.net).
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
const SARVAM_URL = 'https://api.sarvam.ai/v1/chat/completions';
const MODEL = 'sarvam-105b-conversations';

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();

    if (typeof message !== 'string' || !message.trim()) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      return Response.json({
        reply: "The assistant isn't configured yet: SARVAM_API_KEY is missing on the server."
      });
    }

    // Previous turns from the widget, oldest first: must start with a user turn and alternate.
    const turns = (Array.isArray(history) ? history : [])
      .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
      .slice(-MAX_HISTORY)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
    while (turns.length && turns[0].role !== 'user') turns.shift();
    const priorTurns = turns.filter((m, i, arr) => i === 0 || m.role !== arr[i - 1].role);
    if (priorTurns.length && priorTurns[priorTurns.length - 1].role === 'user') priorTurns.pop();

    const res = await fetch(SARVAM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': apiKey,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          ...priorTurns,
          { role: 'user', content: message.slice(0, 2000) },
        ],
        temperature: 0.3,
        max_tokens: 2048,
      }),
    });

    if (!res.ok) {
      console.error('Sarvam API error:', res.status, await res.text());
      return Response.json({ error: 'Upstream error' }, { status: 502 });
    }

    const data = await res.json();
    const choice = data?.choices?.[0];
    // Strip any <think>...</think> block a reasoning model may include in the content.
    const text = (choice?.message?.content || '').replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    return Response.json({
      reply: text || "Sorry, I couldn't put an answer together just now. Please try asking again.",
    });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
