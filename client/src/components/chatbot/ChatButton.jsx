export default function ChatButton({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="
          fixed bottom-6 right-6
          bg-[#C9783E] hover:bg-[#a07b69] hover:cursor-pointer
          text-white px-4 py-3 rounded-full
          shadow-lg flex items-center gap-2
          animate-chat-bounce
          hover:animate-none
        "
      >
        💬
      </button>
    );
  }
  