"use client";

import { useState, useCallback } from "react";
import { chatService } from "@/app/service/chat-service";
import { useSession } from "next-auth/react";

export function useCreateChat() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createChat = useCallback(async (name?: string) => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const newChat = await chatService.createChat(session.user.id, name);
      return newChat;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  return { createChat, loading, error };
}
