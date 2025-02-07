"use client";

import { useState, useEffect } from "react";

type ChatWindowProps = {
  chatId: number;
};

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const [messages, setMessages] = useState([
    { role: "bot", message: "Bonjour ! Comment puis-je vous aider ?" },
  ]);

  useEffect(() => {
    // Logique pour charger les messages du chat avec chatId
    // Exemple : fetchMessages(chatId);
  }, [chatId]);

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
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} my-2`}>
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-900 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
          placeholder="Écrivez un message..."
        />
        <button
          className="px-4 py-2 ml-2 bg-blue-600 rounded-lg text-white"
          onClick={() => handleSendMessage("Message envoyé")}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
