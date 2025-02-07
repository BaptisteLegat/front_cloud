type ChatMenuProps = {
    chatId: number;
    setEditingChat: (chatId: number | null) => void;
    setEditName: (name: string) => void;
    handleDeleteChat: (chatId: number) => void;
    closeMenu: () => void;
};

export default function ChatMenu({ chatId, setEditingChat, setEditName, handleDeleteChat, closeMenu }: ChatMenuProps) {
    return (
        <div className="absolute top-10 right-0 mt-2 w-48 bg-gray-700 rounded shadow-md z-50">
            <ul className="space-y-2 text-white">
                <li>
                    <button
                        onClick={() => {
                        setEditingChat(chatId);
                        setEditName("");
                        closeMenu();
                        }}
                        className="block w-full text-left p-2 hover:bg-gray-600"
                    >
                        Modifier le nom
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleDeleteChat(chatId)}
                        className="block w-full text-left p-2 hover:bg-gray-600"
                    >
                        Supprimer
                    </button>
                </li>
            </ul>
        </div>
    );
}
