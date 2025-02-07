"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/app/components/Sidebar";
import ChatWindow from "@/app/components/ChatWindow";

export default function Home() {
  const { data: session } = useSession();
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  return (
    <div className="flex h-screen">
      <Sidebar onSelectChat={setSelectedChatId} />
      <div className="flex-1 flex flex-col bg-gray-950 text-white items-center justify-center">
        {selectedChatId ? (
          <ChatWindow chatId={selectedChatId} />
        ) : session ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Bienvenue ! 👋</h2>
            <p className="text-gray-400 mb-6">
              Créez un nouveau chat pour commencer la conversation.
            </p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg">
              + Nouveau Chat
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Bienvenue sur notre chat ! 💬</h2>
            <p className="text-gray-400 mb-6">
              Connectez-vous pour discuter et retrouver votre historique.
            </p>
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-lg">
              Se connecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
