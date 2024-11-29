import { useEffect, useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import Chat from "../components/Chat";

export interface MessageType {
  username: string;
  message: string;
  timestamp: string;
}

function Home() {
  const [font, setFont] = useState("special-elite-regular");
  const socket = useRef<WebSocket | null>(null);
  const self = useRef<{ username: string; frequency: string } | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const self_data = localStorage.getItem("self");
    if (self_data) {
      const parsed_self_data = JSON.parse(self_data);
      self.current = parsed_self_data;
    }

    if (!socket.current) {
      const ws = new WebSocket(`${BACKEND_URL}`);
      socket.current = ws;
    }

    socket.current.onopen = () => {
      socket.current?.send(
        JSON.stringify({
          type: "join",
          payload: {
            username: self.current?.username,
            room: self.current?.frequency,
          },
        })
      );
    };

    return () => {
      socket.current?.close();
      socket.current = null;
      console.log("Socket closed");
    };
  }, []);

  useEffect(() => {
    if (socket.current) {
      socket.current.onmessage = (message) => {
        console.log(typeof message.data);
        const parsedMessage = JSON.parse(message.data);
        setMessages((m) => [...m, parsedMessage]);
      };
      console.log("messages", messages);
    }
  }, [messages]);

  return (
    <main className={`h-fit w-fit text-white ${font}`}>
      <Chat
        font={font}
        setFont={setFont}
        messages={messages}
        setMessages={setMessages}
        socket={socket}
      />
    </main>
  );
}

export default Home;
