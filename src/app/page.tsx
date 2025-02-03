import Sidebar from "@/app/components/Sidebar";
import ChatWindow from "@/app/components/ChatWindow";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-950 text-white">
        <ChatWindow />
      </div>
    </div>
  );
}
