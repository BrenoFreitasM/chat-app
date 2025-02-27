'use client'
import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  const { user, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

      ws.current = new WebSocket("ws://localhost:8080");

      ws.current.onopen = () => {
        console.log("🟢 Conectado ao WebSocket!");
      };

      ws.current.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, receivedMessage]);
      };

      ws.current.onclose = () => {
        console.log("🔴 WebSocket desconectado.");
      };

      return () => {
        ws.current.close();
      };
    }
  }, [user]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const data = { text: message, sender: user };
      ws.current.send(JSON.stringify(data));
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-900 text-white"> 
      <div className="flex-1 overflow-y-auto bg-gray-800 p-4 rounded shadow"> 
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`p-2 rounded mb-2 ${msg.sender === user ? 'bg-blue-500 text-white text-right' : 'bg-gray-700 text-left'}`}>
            <strong>{msg.sender || 'Anônimo'}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-700 bg-gray-800 rounded-l text-white"
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r">
          Enviar
        </button>
      </div>
    </div>
  );
}