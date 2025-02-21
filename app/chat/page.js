'use client'
import { useState, useEffect } from "react";

export default function Chat() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ws = new WebSocket("ws://localhost:8080"); // Conectando ao servidor WebSocket

  useEffect(() => {
    ws.onopen = () => {
      console.log("🟢 Conectado ao WebSocket!");
    };

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessage((prev) => [...prev, receivedMessage.text]);
    };

    ws.onclose = () => {
      console.log("🔴 WebSocket desconectado.");
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const data = { text: message };
      ws.send(JSON.stringify(data));
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 bg-gray-200 rounded mb-2">
            {msg}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
