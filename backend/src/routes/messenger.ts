import { Router } from "express";
const router = Router();

let conversations = [
  { id: "c1", participants: ["Francinah", "Alice"], lastMessage: "See you soon!" },
  { id: "c2", participants: ["Francinah", "Bob"], lastMessage: "Thanks for your order." }
];

let messages = [
  { id: "m1", conversationId: "c1", sender: "Alice", text: "Hi Francinah!", timestamp: new Date().toISOString() },
  { id: "m2", conversationId: "c1", sender: "Francinah", text: "Hello Alice!", timestamp: new Date().toISOString() }
];

router.get("/conversations", (_req, res) => {
  res.json({ conversations });
});

router.get("/messages", (req, res) => {
  const { conversationId } = req.query;
  const filtered = messages.filter((m) => m.conversationId === conversationId);
  res.json({ messages: filtered });
});

router.post("/messages", (req, res) => {
  const { conversationId, sender, text } = req.body;
  const newMessage = {
    id: `m${messages.length + 1}`,
    conversationId,
    sender,
    text,
    timestamp: new Date().toISOString()
  };
  messages.push(newMessage);

  const convo = conversations.find((c) => c.id === conversationId);
  if (convo) convo.lastMessage = text;

  res.status(201).json({ message: newMessage });
});

export default router;
