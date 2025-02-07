"use client";

import { useState, useCallback, useEffect } from "react";
import { chatService } from "@/app/service/chat-service";
import { useSession } from "next-auth/react";

export function useChatMessages(chatId: number) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!chatId) return;

    setLoading(true);
    try {
      const chat = await chatService.getChat(chatId.toString());
      setMessages(chat.messages as { role: "user" | "assistant"; content: string }[]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!chatId || !session?.user?.id) return;

      setMessages((prev) => [...prev, { role: "user", content: message }]);

      try {
        const assistantMessage = await chatService.sendMessage(chatId, message);

        // Une fois la réponse complète de l'IA obtenue, on ajoute le message complet
        setMessages((prev) => [...prev, { role: "assistant", content: assistantMessage }]);

      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    },
    [chatId, session?.user?.id]
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, sendMessage, loading, error };
}
