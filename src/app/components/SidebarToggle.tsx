type SidebarToggleProps = {
isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

export default function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
    return (
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-800 text-white">
            {isOpen ? "◀" : "▶"}
        </button>
    );
}
