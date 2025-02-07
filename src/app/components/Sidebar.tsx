"use client";

import { useState, useEffect } from "react";
import { useChats } from "@/app/hooks/use-chats";
import { useCreateChat } from "@/app/hooks/use-create-chat";
import { useSession } from "next-auth/react";
import Auth from "./Auth";
import ChatList from "./ChatList";
import SidebarToggle from "./SidebarToggle";

type SidebarProps = {
	onSelectChat: (chatId: number) => void;
};

export default function Sidebar({ onSelectChat }: SidebarProps) {
	const { data: session } = useSession();
	const { chats, loading, error, fetchChats } = useChats();
	const { createChat, loading: creatingChat } = useCreateChat();

	const [isOpen, setIsOpen] = useState(true);

	useEffect(() => {
		fetchChats();
	}, [fetchChats]);

	const handleCreateChat = async () => {
		const newChat = await createChat();
		if (newChat) {
			fetchChats();
			onSelectChat(newChat.ID);
		}
	};

  return (
		<div className="relative flex h-full">
			<div className={`flex flex-col w-64 bg-gray-900 text-white ${isOpen ? "flex" : "hidden"}`}>
				<SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />

				{isOpen && (
					<div className="flex-1 m-2">
						<h2 className="p-4 border-b border-gray-800">Historique</h2>
						{session && (
							<button
								className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded my-3"
								disabled={creatingChat}
								onClick={handleCreateChat}
							>
								{creatingChat ? "Création..." : "+ Nouveau Chat"}
							</button>
						)}

						<ChatList
							chats={chats}
							loading={loading}
							error={error}
							onSelectChat={onSelectChat}
							refreshChats={fetchChats}
						/>
					</div>
				)}

				{isOpen && <Auth />}
			</div>
		</div>
	);
}
