'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BotLogoIcon } from './BrandIcons';
import styles from './Chatbot.module.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am Anuj\'s AI assistant. Ask me anything about his experience, skills, or projects.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
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

  // Pulse animation state - resets on every page load
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpened(true);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className={`${styles.toggleWrapper} ${isOpen ? styles.hidden : ''}`}>
        <button 
          className={`${styles.toggleBtn} ${!hasOpened ? styles.pulse : ''}`}
          onClick={handleOpen}
          aria-label="Open chat"
        >
          <div className={styles.avatarWrapper}>
            <BotLogoIcon size={40} />
          </div>
        </button>
      </div>

      {/* Chat Widget */}
      <div className={`${styles.widget} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <div className={styles.headerAvatar}>
              <BotLogoIcon size={20} />
            </div>
            <span>Ask AI Assistant</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className={styles.closeBtn}
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.botMessage}`}
            >
              <div className={styles.avatar}>
                {msg.role === 'user' ? <User size={16} /> : (
                  <BotLogoIcon size={20} />
                )}
              </div>
              <div className={styles.bubble}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.botMessage}`}>
              <div className={styles.avatar}>
                <BotLogoIcon size={20} />
              </div>
              <div className={styles.bubble}>
                <Loader2 size={16} className={styles.spinner} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className={styles.input}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className={styles.sendBtn}
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
}
