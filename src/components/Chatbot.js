'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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

  // Typewriter animation state
  const [displayText, setDisplayText] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const questions = [
    "What are anuj's technical skills?",
    "Tell me about anuj's experience at Samsung",
    "What projects has anuj worked on?",
    "What is anuj's expertise in backend development?",
    "How can I contact anuj?"
  ];

  // Typewriter effect
  useEffect(() => {
    if (isOpen) return; // Don't animate when chat is open

    const currentQuestion = questions[currentQuestionIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentQuestion.length) {
          setDisplayText(currentQuestion.slice(0, displayText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentQuestion.slice(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next question
          setIsDeleting(false);
          setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentQuestionIndex, isOpen]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Scroll when input is focused (mobile keyboard appears)
  const handleInputFocus = () => {
    setTimeout(() => {
      scrollToBottom();
    }, 300); // Delay to allow keyboard to appear
  };

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

  const handleSend = async () => {
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

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <>
      {/* Centered Toggle Bar */}
      <div className={`${styles.toggleWrapper} ${isOpen ? styles.hidden : ''}`}>
        <button 
          className={styles.toggleBar}
          onClick={handleOpen}
          aria-label="Open chat"
        >
          <span className={styles.typingText}>
            {displayText}
            <span className={styles.cursor}>|</span>
          </span>
          <Send size={20} className={styles.toggleSendIcon} />
        </button>
      </div>

      {/* Backdrop Blur */}
      {isOpen && <div className={styles.backdrop} onClick={() => setIsOpen(false)} />}

      {/* Chat Widget */}
      <div className={`${styles.widget} ${isOpen ? styles.open : ''}`}>
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className={styles.closeBtn}
          aria-label="Close chat"
        >
          <X size={20} />
        </button>

        {/* Messages Area */}
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
                    a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
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

        {/* Input at Bottom */}
        <div className={styles.inputWrapper}>
          <MessageCircle size={20} className={styles.inputIcon} />
          <textarea
            value={input}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type here..."
            className={styles.inputField}
            rows={1}
          />
          <button
            onClick={handleSend}
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
