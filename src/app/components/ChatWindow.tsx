"use client";

import { useState } from "react";
import { useChatMessages } from "@/app/hooks/use-chat-message";

type ChatWindowProps = {
  chatId: number;
};

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const { messages, sendMessage, loading, error } = useChatMessages(chatId);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full w-7/12">
      <div className="flex-1 overflow-auto p-4">
        {loading && <div className="text-center">Chargement...</div>}
        {error && <div className="text-red-500 text-center">{error.message}</div>}
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} my-2`}>
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-900 flex items-center">
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
          placeholder="Écrivez un message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="px-4 py-2 ml-2 bg-blue-600 rounded-lg text-white"
          onClick={handleSendMessage}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
