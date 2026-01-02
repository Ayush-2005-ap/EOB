import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

export default function ChatbotContainer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && <ChatButton onClick={() => setOpen(true)} />}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
}
