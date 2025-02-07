"use client";

import { useState, useEffect } from "react";
import { useChats } from "@/app/hooks/use-chats";
import { useCreateChat } from "@/app/hooks/use-create-chat";
import Auth from "./Auth";

type SidebarProps = {
  onSelectChat: (chatId: number) => void;
};

export default function Sidebar({ onSelectChat }: SidebarProps) {
  const { chats, loading, error, fetchChats } = useChats();
  const { createChat, loading: creatingChat } = useCreateChat();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const handleCreateChat = async () => {
    const newChat = await createChat();
    if (newChat) {
      fetchChats();
      onSelectChat(newChat.id);
    }
  };

  console.log(chats);

  return (
    <div className="flex">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-800 text-white">
        {isOpen ? "◀" : "▶"}
      </button>

      {isOpen && (
        <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col transition-all duration-300">
          <h2 className="text-lg font-semibold mb-4">Historique</h2>

          {loading ? (
            <p className="text-gray-400">Chargement...</p>
          ) : error ? (
            <p className="text-red-500">Erreur : {error.message}</p>
          ) : chats.length === 0 ? (
            <p className="text-gray-400">Aucun chat</p>
          ) : (
            <ul className="flex-1 space-y-2">
              {chats.map((chat) => (
                <li
                  key={chat.id}
                  className="p-2 rounded cursor-pointer hover:bg-gray-800"
                  onClick={() => onSelectChat(chat.id)}
                >
                  {chat.name}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={handleCreateChat}
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded"
            disabled={creatingChat}
          >
            {creatingChat ? "Création..." : "+ Nouveau Chat"}
          </button>

          <Auth />
        </div>
      )}
    </div>
  );
}
