"use client";

import { useState, useCallback } from "react";
import { chatService } from "@/app/service/chat-service";

export function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(async (chatId: number, message: string) => {
    setLoading(true);
    try {
      await chatService.sendMessage(chatId, message);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendMessage, loading, error };
}
