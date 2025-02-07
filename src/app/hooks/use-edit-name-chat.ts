"use client";

import { useState, useCallback } from "react";
import { chatService } from "@/app/service/chat-service";

export function useEditChatName() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const editChatName = useCallback(
    async (chatId: number, name: string) => {
      setLoading(true);
      try {
        await chatService.editChatName(chatId, name);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { editChatName, loading, error };
}
