"use client";

import { useState, useEffect, useRef } from "react";
import { FaRobot, FaPaperPlane, FaTrash, FaTimes, FaCommentDots } from "react-icons/fa";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  { text: "What are your core cybersecurity skills? 🔒", query: "What are your core cybersecurity skills?" },
  { text: "Tell me about your RHB Bank internship. 💻", query: "Tell me about your internship at RHB Bank." },
  { text: "What studies did you do at KSHRD? 🎓", query: "What IT specialization studies did you do at Korea Software HRD Center (KSHRD)?" },
  { text: "How can I contact you? ✉️", query: "How can I contact you? What are your social links?" }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAlertedKeyMissing, setHasAlertedKeyMissing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialize and load chat history from sessionStorage
  useEffect(() => {
    const savedChat = sessionStorage.getItem("portfolio_chat_history");
    if (savedChat) {
      try {
        setMessages(JSON.parse(savedChat));
      } catch (e) {
        initializeDefaultMessage();
      }
    } else {
      initializeDefaultMessage();
    }
  }, []);

  const initializeDefaultMessage = () => {
    const initial: Message[] = [
      {
        role: "assistant",
        content: "Hi there! 👋 I am Vanhong's AI Assistant. Ask me anything about Vanhong's cybersecurity background, his digital banking projects, or his professional technical skills!"
      }
    ];
    setMessages(initial);
    sessionStorage.setItem("portfolio_chat_history", JSON.stringify(initial));
  };

  // Scroll to bottom on message change or window toggle
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const saveHistory = (updated: Message[]) => {
    setMessages(updated);
    sessionStorage.setItem("portfolio_chat_history", JSON.stringify(updated));
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    if (!textToSend) {
      setInputValue("");
    }

    const updatedMessages: Message[] = [...messages, { role: "user", content: text }];
    saveHistory(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages })
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();

      if (data.fallback) {
        setHasAlertedKeyMissing(true);
      }

      const reply: Message = { role: "assistant", content: data.text };
      saveHistory([...updatedMessages, reply]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        role: "assistant",
        content: "Oops! ⚠️ I encountered a network error. Please try again or reach out to Vanhong directly via Telegram at [@vanhongVH](https://t.me/vanhongVH)."
      };
      saveHistory([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm("Are you sure you want to clear the conversation?")) {
      initializeDefaultMessage();
      setHasAlertedKeyMissing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Safe inline and block markdown-to-react element helper
  const parseMarkdown = (text: string): React.ReactNode[] => {
    const lines = text.split("\n");
    let inList = false;
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];

    const parseInlineElements = (rawText: string): React.ReactNode[] => {
      const tokenRegex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
      const tokens = rawText.split(tokenRegex);

      return tokens.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={`b-${i}`}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={`c-${i}`} className="chat-inline-code">{part.slice(1, -1)}</code>;
        }
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          return (
            <a
              key={`a-${i}`}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="chat-content-link"
            >
              {linkMatch[1]}
            </a>
          );
        }
        return part;
      });
    };

    lines.forEach((line, lineIndex) => {
      // Check for bullet point
      const bulletMatch = line.match(/^(\s*)[-*+]\s+(.*)/);
      if (bulletMatch) {
        if (!inList) {
          inList = true;
        }
        const content = bulletMatch[2];
        listItems.push(
          <li key={`li-${lineIndex}`} className="chat-li">
            {parseInlineElements(content)}
          </li>
        );
      } else {
        if (inList) {
          elements.push(
            <ul key={`ul-${lineIndex}`} className="chat-ul">
              {listItems}
            </ul>
          );
          listItems = [];
          inList = false;
        }

        // Check for headers
        const headerMatch = line.match(/^(#{1,6})\s+(.*)/);
        if (headerMatch) {
          const level = headerMatch[1].length;
          const content = headerMatch[2];
          const Tag = `h${Math.min(level + 2, 6)}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
          elements.push(
            <Tag key={`h-${lineIndex}`} className={`chat-header-h${level}`}>
              {parseInlineElements(content)}
            </Tag>
          );
        } else if (line.trim() === "") {
          elements.push(<div key={`space-${lineIndex}`} className="chat-space" />);
        } else {
          elements.push(
            <p key={`p-${lineIndex}`} className="chat-p">
              {parseInlineElements(line)}
            </p>
          );
        }
      }
    });

    if (inList && listItems.length > 0) {
      elements.push(
        <ul key="ul-final" className="chat-ul">
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className="chatbot-widget" aria-label="AI Portfolio Assistant">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chatbot-toggle-btn ${isOpen ? "open" : ""}`}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        type="button"
      >
        <span className="btn-glow" />
        {isOpen ? <FaTimes size={20} /> : <FaCommentDots size={24} />}
      </button>

      {/* Chat Window Panel */}
      <div className={`chatbot-window glass ${isOpen ? "show" : ""}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="header-identity">
            <div className="avatar-wrap">
              <FaRobot className="avatar-icon" />
              <span className="status-dot" />
            </div>
            <div className="identity-text">
              <h3>Vanhong's Assistant</h3>
              <span>Online • Powered by Gemini</span>
            </div>
          </div>
          <div className="header-actions">
            <button
              onClick={handleClearChat}
              className="chatbot-action-btn"
              title="Clear Chat"
              aria-label="Clear chat history"
              type="button"
            >
              <FaTrash size={14} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-action-btn close-btn"
              title="Close Panel"
              aria-label="Close chat window"
              type="button"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        {/* Info Notification if API key is not configured */}
        {hasAlertedKeyMissing && (
          <div className="api-key-warning">
            <span>⚠️ API key not found. Running in offline fallback mode.</span>
          </div>
        )}

        {/* Message History */}
        <div className="chatbot-body">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message-bubble-wrapper ${msg.role}`}>
                <div className={`message-bubble ${msg.role}`}>
                  {parseMarkdown(msg.content)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message-bubble-wrapper assistant">
                <div className="message-bubble assistant typing">
                  <div className="typing-dots">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Footer Area: Suggestion Chips and Text Input */}
        <div className="chatbot-footer">
          {/* Quick Suggestions (only show if loading is idle and chat history is short) */}
          {messages.length < 5 && !isLoading && (
            <div className="suggestions-list" aria-label="Quick questions">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug.query)}
                  className="suggestion-chip"
                  type="button"
                >
                  {sug.text}
                </button>
              ))}
            </div>
          )}

          <div className="input-group">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me about Vanhong..."
              aria-label="Chat input message"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              className="send-btn"
              aria-label="Send message"
              disabled={!inputValue.trim() || isLoading}
              type="button"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
