export default function TypingLoader() {
    return (
      <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-lg w-fit">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
      </div>
    );
  }
  