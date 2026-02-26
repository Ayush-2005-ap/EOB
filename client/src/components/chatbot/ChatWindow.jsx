import { useState, useEffect, useRef } from "react";
import TypingLoader from "./TypingLoader";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I’m the Ease of Doing Business Assistant. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Ref for input focus
  const inputRef = useRef(null);

  // 🔹 Auto-focus when chat opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 🔹 Re-focus after bot finishes replying
  useEffect(() => {
    if (!loading) {
      inputRef.current?.focus();
    }
  }, [loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5050/api";
      const res = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col">

      {/* Header */}
      <div className="bg-[#9A4020] text-white p-3 rounded-t-xl flex justify-between items-center">
        <span className="font-semibold">EoDB Assistant</span>
        <button
          onClick={onClose}
          className="text-white hover:cursor-pointer"
        >
          ✖
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[80%] p-2 rounded-lg ${msg.sender === "user"
                ? "bg-blue-100 ml-auto"
                : "bg-gray-100"
              }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && <TypingLoader />}
      </div>

      {/* Input */}
      <div className="border-t p-2 flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A4020]"
          placeholder="Ask your question..."
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className={`p-2 rounded-full flex items-center justify-center ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#9A4020] hover:bg-[#C9783E] text-white"
            }`}
        >
          <span className="material-icons">
            {loading ? "hourglass_top" : "send"}
          </span>
        </button>
      </div>
    </div>
  );
}
