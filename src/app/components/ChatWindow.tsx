"use client";
import { useState } from "react";
import ChatMessage from "@/app/components/ChatMessage";
import ChatInput from "@/app/components/ChatInput";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { role: "bot", message: "Bonjour ! Comment puis-je vous aider ?" },
  ]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { role: "user", message }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", message: "Réponse du bot..." }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} role={msg.role as "user" | "bot"} message={msg.message} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
