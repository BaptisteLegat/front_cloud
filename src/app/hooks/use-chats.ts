'use client'

import { useState, useCallback, useEffect } from 'react'
import { chatService, type Chat } from '@/app/service/chat-service'
import { useSession } from "next-auth/react";

export function useChats() {
  const { data: session, status } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchChats = useCallback(async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const chats = await chatService.getChats(session.user.id);
      setChats(chats);
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchChats();
    }
  }, [fetchChats, status]);

  return { chats, loading, error, fetchChats };
}
