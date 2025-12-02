import { useEffect, useState } from "react";

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
};

export default function ChatWindow({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!conversationId) return;
    fetch(`/api/messenger/messages?conversationId=${conversationId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => setMessages([]));
  }, [conversationId]);

  const sendMessage = async () => {
    await fetch("/api/messenger/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, sender: "Francinah", text })
    });
    setText("");
    const res = await fetch(`/api/messenger/messages?conversationId=${conversationId}`);
    const data = await res.json();
    setMessages(data.messages || []);
  };

  return (
    <div style={{ flex: 1, padding: 16 }}>
      <h3>Chat</h3>
      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ddd", marginBottom: 12 }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 8 }}>
            <strong>{m.sender}</strong>: {m.text}
            <div style={{ fontSize: 10, color: "#666" }}>{new Date(m.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "80%", marginRight: 8 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
