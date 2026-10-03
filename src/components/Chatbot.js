'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import styles from './Chatbot.module.css';

const questions = [
  "What is Plan Assist and what did Anuj build?",
  "Tell me about the geo migration",
  "What is Milo?",
  "What's Anuj's tech stack?"
];

const greeting = {
  role: 'assistant',
  content: "Hi! I'm Anuj's AI assistant. I know his four-year work story at Samsung Ads, his projects like **Milo**, and his stack. What would you like to know?"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Let other parts of the page open the assistant (e.g. the hero button)
  useEffect(() => {
    const open = (e) => {
      setIsOpen(true);
      const q = e?.detail?.question;
      if (q) setInput(q);
    };
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('open-chat', open);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('open-chat', open);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 250);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputFocus = () => {
    setTimeout(scrollToBottom, 300); // allow the mobile keyboard to appear
  };

  const sendMessage = async (text) => {
    const userMessage = (text ?? input).trim();
    if (!userMessage || isLoading) return;

    const history = messages.filter((m) => m !== greeting);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history }),
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const showSuggestions = messages.length === 1 && !isLoading;

  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}

      <div
        className={`${styles.widget} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Anuj's AI assistant"
      >
        <div className={styles.header}>
          <Image src="/images/profile.png" alt="" width={40} height={40} className={styles.headerPhoto} />
          <div>
            <p className={styles.headerTitle}>Ask about Anuj</p>
            <p className={styles.headerSub}>AI assistant, answers questions about his work</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Close chat">
          <X size={20} />
        </button>

        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.botMessage}`}
            >
              <div className={styles.bubble}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          {showSuggestions && (
            <div className={styles.suggestions}>
              {questions.slice(0, 4).map((q) => (
                <button key={q} className={styles.suggestion} onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}
          {isLoading && (
            <div className={`${styles.message} ${styles.botMessage}`}>
              <div className={styles.bubble}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputWrapper}>
          <MessageCircle size={20} className={styles.inputIcon} />
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask about Anuj's work or Milo..."
            className={styles.inputField}
            rows={1}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className={styles.sendBtn}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
