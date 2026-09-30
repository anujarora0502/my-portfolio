'use client';

import { Sparkles } from 'lucide-react';

// Opens the AI assistant (Chatbot listens for the `open-chat` event).
export default function AskButton({ className = '', question, children }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('open-chat', { detail: { question } }))}
    >
      {children ?? (
        <>
          <Sparkles size={18} /> Ask my AI
        </>
      )}
    </button>
  );
}
