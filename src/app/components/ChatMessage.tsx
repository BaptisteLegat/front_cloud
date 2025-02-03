type ChatMessageProps = {
    role: "user" | "bot";
    message: string;
};

export default function ChatMessage({ role, message }: ChatMessageProps) {
    return (
        <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} my-2`}>
            <div
                className={`p-3 rounded-lg max-w-xs ${
                role === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-200"
            }`}
            >
                {message}
            </div>
        </div>
    );
}
