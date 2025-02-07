"use client";

import { useState, useCallback } from "react";
import { chatService } from "@/app/service/chat-service";

export function useDeleteChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteChat = useCallback(
    async (chatId: number) => {
      setLoading(true);
      try {
        await chatService.deleteChat(chatId);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { deleteChat, loading, error };
}
