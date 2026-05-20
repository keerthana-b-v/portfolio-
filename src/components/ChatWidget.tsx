"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

interface Message {
  text: string;
  sender: "user" | "assistant";
  isStreaming?: boolean;
}

const SUGGESTIONS = [
  "What stack does she work with?",
  "Has she deployed to production?",
  "Tell me about her AI experience",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [exchangeCount, setExchangeCount] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tooltip effect: appears after 1.2s, disappears after 4s
  useEffect(() => {
    const showTimeout = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 1200);

    const hideTimeout = setTimeout(() => {
      setShowTooltip(false);
    }, 5200);

    return () => {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
    };
  }, [isOpen]);

  // Scroll to bottom whenever messages list updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || exchangeCount >= 6 || isSending) return;

    // 1. Setup states
    const userMsg: Message = { text: trimmed, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setExchangeCount((prev) => prev + 1);
    setIsSending(true);

    // Add placeholder streaming message from assistant
    const assistantMsgPlaceholder: Message = { text: "", sender: "assistant", isStreaming: true };
    setMessages((prev) => [...prev, assistantMsgPlaceholder]);

    // 2. Fetch from RAG API
    const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    // Connect securely to the hosted Vercel API when developing locally to avoid storing DB/Groq credentials on localhost
    const API_URL = isLocal 
      ? (process.env.NEXT_PUBLIC_API_URL || "https://keerthanabv.in/api/chat") 
      : "/api/chat";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat service is currently offline.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          if (!event.startsWith("data:")) continue;
          const raw = event.slice(5).trim();
          if (!raw || raw === "[DONE]") continue;

          let payload;
          try {
            payload = JSON.parse(raw);
          } catch {
            continue;
          }

          answer += payload.content || "";
          
          if (answer.includes("[CTA_CONTACT]")) {
            answer = answer.replace("[CTA_CONTACT]", "You can contact Keerthana at keerthana.b.v.codes@gmail.com");
          }

          // Update the streaming message
          setMessages((prev) => {
            const updated = [...prev];
            const lastMsgIndex = updated.length - 1;
            if (lastMsgIndex >= 0 && updated[lastMsgIndex].sender === "assistant") {
              updated[lastMsgIndex] = {
                text: answer,
                sender: "assistant",
                isStreaming: true,
              };
            }
            return updated;
          });
        }
      }

      // Finalize the message stream
      setMessages((prev) => {
        const updated = [...prev];
        const lastMsgIndex = updated.length - 1;
        if (lastMsgIndex >= 0 && updated[lastMsgIndex].sender === "assistant") {
          updated[lastMsgIndex] = {
            text: answer,
            sender: "assistant",
            isStreaming: false,
          };
        }
        return updated;
      });

    } catch (error) {
      console.error("RAG assistant error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        const lastMsgIndex = updated.length - 1;
        if (lastMsgIndex >= 0 && updated[lastMsgIndex].sender === "assistant") {
          updated[lastMsgIndex] = {
            text: "Something went wrong. You can reach out to Keerthana directly at keerthana.b.v.codes@gmail.com",
            sender: "assistant",
            isStreaming: false,
          };
        }
        return updated;
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <div className="chat-widget-container">
      {/* Floating Trigger Row */}
      <div 
        style={{ 
          position: "fixed", 
          bottom: "24px", 
          right: "24px", 
          zIndex: 70, 
          display: "flex", 
          alignItems: "end", 
          gap: "12px", 
          pointerEvents: "none" 
        }}
      >
        <div 
          className={`chat-tooltip md:flex ${showTooltip && !isOpen ? "visible opacity-100" : "opacity-0"}`} 
          style={{ display: showTooltip && !isOpen ? "flex" : "none" }}
        >
          Ask about my work &rarr;
        </div>
        
        <button 
          onClick={handleToggle}
          className="chat-trigger" 
          aria-label={isOpen ? "Close Chat" : "Open Chat"}
          style={{ pointerEvents: "auto" }}
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: "24px", height: "24px" }}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: "24px", height: "24px" }}>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="8" y1="10" x2="16" y2="10" />
            </svg>
          )}
        </button>
      </div>

      {/* Floating Chat Drawer Panel */}
      <div 
        className={`chat-drawer ${isOpen ? "open" : ""}`}
        style={{ display: isOpen ? "flex" : "none" }}
      >
        <div className="chat-header">
          <div className="chat-header-title">Ask about Keerthana's work</div>
          <button onClick={handleToggle} aria-label="Close Chat" className="chat-close-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: "18px", height: "18px" }}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        
        <div className="chat-messages">
          {/* Welcome Message */}
          <div className="chat-message assistant">
            Hi! I am Keerthana's AI assistant. Ask me anything about her projects, stack, or experience.
          </div>

          {/* Chat Transcript */}
          {messages.map((msg, index) => (
            <div 
              className={`chat-message ${msg.sender}`} 
              key={index}
            >
              {msg.text === "" && msg.sender === "assistant" && msg.isStreaming ? (
                <span className="loading-dots">Thinking</span>
              ) : (
                msg.text
              )}
            </div>
          ))}

          {/* Show Suggestion Chips if conversation hasn't started */}
          {messages.length === 0 && (
            <div className="chat-suggestions">
              {SUGGESTIONS.map((chipText) => (
                <button 
                  key={chipText}
                  onClick={() => handleSend(chipText)}
                  className="chat-chip"
                >
                  {chipText}
                </button>
              ))}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Messaging Input Footer */}
        <form onSubmit={handleSubmit} className="chat-form">
          <input 
            type="text" 
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={exchangeCount >= 6 || isSending}
            placeholder={exchangeCount >= 6 ? "Limit reached. Email Keerthana!" : "Ask anything about my work..."} 
            className="chat-input"
            autoComplete="off"
          />
          <button 
            type="submit" 
            aria-label="Send message" 
            className="chat-send-btn" 
            disabled={!inputValue.trim() || exchangeCount >= 6 || isSending}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: "18px", height: "18px" }}>
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
