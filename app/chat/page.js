'use client'
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Olá! Tudo bem?", sender: "other" },
    { id: 2, text: "Oi! Tudo ótimo e você?", sender: "me" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, text: input, sender: "me" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 my-1 rounded max-w-xs ${msg.sender === "me" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
          Enviar
        </button>
      </div>
    </div>
  );
}
