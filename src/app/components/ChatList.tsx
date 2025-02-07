import { useState } from "react";
import { useEditChatName } from "@/app/hooks/use-edit-name-chat";
import { useDeleteChat } from "@/app/hooks/use-delete-chat";
import ChatMenu from "./ChatMenu";

type Chat = {
    ID: number;
    name: string;
    UpdatedAt: string;
};

type ChatListProps = {
    chats: Chat[];
    loading: boolean;
    error: Error | null;
    onSelectChat: (chatId: number) => void;
    refreshChats: () => void;
};

export default function ChatList({ chats, loading, error, onSelectChat, refreshChats }: ChatListProps) {
    const { editChatName } = useEditChatName();
    const { deleteChat } = useDeleteChat();

    const [editName, setEditName] = useState("");
    const [editingChat, setEditingChat] = useState<number | null>(null);
    const [openMenu, setOpenMenu] = useState<number | null>(null);

    const handleEditChat = async (chatId: number) => {
        await editChatName(chatId, editName);
        setEditingChat(null);
        refreshChats();
    };

    const handleDeleteChat = async (chatId: number) => {
        await deleteChat(chatId);
        setOpenMenu(null);
        refreshChats();
    };

    if (loading) return <p className="text-gray-400">Chargement...</p>;
    if (error) return <p className="text-red-500">Erreur : {error.message}</p>;
    if (chats.length === 0) return <p className="text-gray-400">Aucun chat</p>;

    const sortedChats = [...chats].sort((a, b) => new Date(b.UpdatedAt).getTime() - new Date(a.UpdatedAt).getTime());

    return (
        <ul className="space-y-2 relative">
            {sortedChats.map((chat) => (
                <li
                    key={chat.ID}
                    className="relative p-2 bg-gray-800 hover:bg-gray-700 cursor-pointer rounded flex justify-between"
                    onClick={() => onSelectChat(chat.ID)}
                >
                {editingChat === chat.ID ? (
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-gray-700 text-white p-1 rounded w-full"
                        autoFocus
                        onBlur={() => setEditingChat(null)}
                        onKeyDown={(e) => e.key === "Enter" && handleEditChat(chat.ID)}
                    />
                ) : (
                    <span>{chat.name}</span>
                )}

                <button
                    className="text-gray-400 hover:text-white"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === chat.ID ? null : chat.ID);
                    }}
                >
                    ⋮
                </button>

                {openMenu === chat.ID && (
                    <ChatMenu
                        chatId={chat.ID}
                        setEditingChat={setEditingChat}
                        setEditName={setEditName}
                        handleDeleteChat={handleDeleteChat}
                        closeMenu={() => setOpenMenu(null)}
                    />
                )}
                </li>
            ))}
        </ul>
    );
}
