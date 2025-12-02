import { useState } from "react";
import Conversations from "./Conversations";
import ChatWindow from "./ChatWindow";

export default function Messenger() {
  const [selectedId, setSelectedId] = useState("");

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Conversations onSelect={setSelectedId} />
      {selectedId ? <ChatWindow conversationId={selectedId} /> : <div style={{ flex: 1, padding: 16 }}>Select a conversation</div>}
    </div>
  );
}
