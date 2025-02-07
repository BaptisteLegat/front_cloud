"use client";
import { useState } from "react";

type ChatInputProps = {
    onSendMessage: (message: string) => void;
};

export default function ChatInput({ onSendMessage }: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage("");
    };

    return (
        <div className="p-4 bg-gray-900 flex items-center">
            <input
                type="text"
                className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
                placeholder="Écrivez un message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
                className="px-4 py-2 ml-2 bg-blue-600 rounded-lg text-white"
                onClick={handleSendMessage}
            >
                Envoyer
            </button>
        </div>
    );
}
