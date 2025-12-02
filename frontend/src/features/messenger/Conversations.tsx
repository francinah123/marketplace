import { useEffect, useState } from "react";

type Conversation = {
  id: string;
  participants: string[];
  lastMessage?: string;
};

export default function Conversations({ onSelect }: { onSelect: (id: string) => void }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    fetch("/api/messenger/conversations")
      .then((res) => res.json())
      .then((data) => setConversations(data.conversations || []))
      .catch(() => setConversations([]));
  }, []);

  return (
    <div style={{ borderRight: "1px solid #ddd", padding: 16, width: 250 }}>
      <h3>Conversations</h3>
      {conversations.map((c) => (
        <div
          key={c.id}
          style={{ cursor: "pointer", marginBottom: 8 }}
          onClick={() => onSelect(c.id)}
        >
          {c.participants.join(", ")}
          <div style={{ fontSize: 12, color: "#666" }}>{c.lastMessage}</div>
        </div>
      ))}
    </div>
  );
}
