"use client";

import { useState, useEffect } from "react";
import { useChats } from "@/app/hooks/use-chats";
import { useCreateChat } from "@/app/hooks/use-create-chat";
import { useSession } from "next-auth/react";
import Auth from "./Auth";

type SidebarProps = {
  onSelectChat: (chatId: number) => void;
};

export default function Sidebar({ onSelectChat }: SidebarProps) {
  const { data: session } = useSession();
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
      onSelectChat(newChat.ID);
    }
  };

  return (
    <div className="flex h-full">
      <div className={`flex flex-col w-64 bg-gray-900 text-white ${isOpen ? "flex" : "hidden"}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-800 text-white">
          {isOpen ? "◀" : "▶"}
        </button>
        {isOpen && (
          <div className="flex-1 m-2">
            <h2 className="p-4 border-b border-gray-800">Historique</h2>

            {loading ? (
              <p className="text-gray-400">Chargement...</p>
            ) : error ? (
              <p className="text-red-500">Erreur : {error.message}</p>
            ) : chats.length === 0 ? (
              <p className="text-gray-400">Aucun chat</p>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {chats.map((chat) => (
                    <li
                      key={`${chat.ID}`}
                      className="p-1 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded"
                      onClick={() => onSelectChat(chat.ID)}
                    >
                      {chat.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {session ? (
              <button
                onClick={handleCreateChat}
                className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded mt-4"
                disabled={creatingChat}
              >
                {creatingChat ? "Création..." : "+ Nouveau Chat"}
              </button>
            ) : null}
          </div>
        )}

        {isOpen && (
          <div className="mt-auto">
            <Auth />
          </div>
        )}
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 p-2 bg-gray-800 text-white rounded-full"
        >
          ▶
        </button>
      )}
    </div>
  );
}
