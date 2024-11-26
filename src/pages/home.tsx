import { useEffect, useRef, useState } from "react";
import Chat from "../components/chat";
import Topbar from "../components/Topbar";
import UserList from "../components/UserList";
import { BACKEND_WS_URL } from "../config";

function Home() {
  const [font, setFont] = useState("special-elite-regular");
  const socket = useRef<WebSocket | null>(null);
  const self = useRef<any>(null);
  // const [messages, setMessages] = useState<string[]>([]);
  const [room, setRoom] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const self_data = localStorage.getItem("user");
    if (self_data) {
      const parsed_self_data = JSON.parse(self_data);
      self.current = parsed_self_data;
    }

    if (socket.current) {
      socket.current.onmessage = (message) => {
        setMessages((m) => [...m, message.data]);
      };
    }

    return () => {
      socket.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!room) return;

    if (!socket.current) {
      const ws = new WebSocket(`${BACKEND_WS_URL}`);
      socket.current = ws;
    }

    socket.current.onmessage = (message) => {
      setMessages((m) => [...m, message.data]);
    };

    socket.current.onopen = () => {
      socket.current?.send(
        JSON.stringify({ type: "join", payload: { room: room } })
      );
    };

    return () => {
      socket.current?.close();
      socket.current = null;
    };
  }, [room]);

  if (!room) {
    return (
      <main className={`h-fit w-fit text-white ${font}`}>
        <div className="max-sm:min-h-screen h-[30rem] max-sm:w-screen xs:max-w-xs sm:w-[22rem] ">
          <div className="h-full bg-zinc-900 flex flex-col gap-4 overflow-y-scroll p-2">
            <Topbar />
            <UserList setCurrentUser={setCurrentUser} setRoom={setRoom} />
          </div>
        </div>
      </main>
    );
  } else
    return (
      <main className={`h-fit w-fit text-white ${font}`}>
        <Chat
          font={font}
          setFont={setFont}
          self={self.current.username}
          currentUser={currentUser}
          room={room}
          setRoom={setRoom}
          messages={messages}
          setMessages={setMessages}
          socket={socket}
        />
      </main>
    );
}

export default Home;
