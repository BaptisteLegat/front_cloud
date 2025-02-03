"use client";
import { useState } from "react";
import Auth from "./Auth";

const conversations = [
  { id: 1, title: "Discussion 1" },
  { id: 2, title: "Discussion 2" },
  { id: 3, title: "Discussion 3" },
];

export default function Sidebar() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-gray-800 text-white"
        >
            {isOpen ? "◀" : "▶"}
        </button>

        {isOpen && (
            <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4">Historique</h2>

            <ul className="flex-1 space-y-2">
                {conversations.map((chat) => (
                <li
                    key={chat.id}
                    className={`p-2 rounded cursor-pointer ${
                    activeChat === chat.id ? "bg-gray-700" : "hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveChat(chat.id)}
                >
                    {chat.title}
                </li>
                ))}
            </ul>

            <button className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded">
                + Nouveau Chat
            </button>

            <Auth />
            </div>
        )}
    </div>
  );
}
