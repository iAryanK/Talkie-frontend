import { useEffect, useRef } from "react";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import Topbar from "./Topbar";
import { formattedTime } from "../utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Chat = ({
  font,
  setFont,
  self,
  room,
  setRoom,
  currentUser,
  messages,
  setMessages,
  socket,
}: {
  font: string;
  setFont: (font: string) => void;
  self: string;
  room: string;
  setRoom: (room: string) => void;
  currentUser: any;
  messages: string[];
  setMessages: (messages: any) => void;
  socket: any;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputRef.current) {
      if (inputRef.current.value === "") return;
      const message = inputRef.current.value;

      setMessages((m: any) => [...m, message]);

      console.log("User sent message: ", message);

      // Send the message to the server
      if (!socket.current) {
        console.log("Socket not connected");
        return;
      }

      console.log("Sending message to server");

      socket.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            message: message,
          },
        })
      );
      console.log("Message sent to server");

      inputRef.current.value = "";
      inputRef.current.focus();
      console.log("end");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-sm:min-h-screen h-[30rem] max-sm:w-fit xs:max-w-xs sm:w-[22rem] w-[22rem]">
      <div className="h-full bg-zinc-900  flex flex-col justify-between relative">
        <div className="px-2 pt-2">
          <Topbar currentUser={currentUser} room={room} setRoom={setRoom} />
        </div>

        <button
          className="rounded-full bg-zinc-800 p-4 h-4 w-4 absolute top-16 right-2 flex items-center justify-center select-none"
          onClick={() => {
            setFont(
              font === "special-elite-regular"
                ? "doto-regular"
                : "special-elite-regular"
            );
          }}
        >
          🖌️
        </button>

        <div>
          {messages.length === 0 && (
            <div
              ref={divRef}
              className="h-[22rem] overflow-y-scroll px-2 scroll-mb-0 mx-3 flex flex-col gap-2 py-2 items-center justify-center text-zinc-500 text-sm text-center tracking-wide"
            >
              Your chat is not stored on the server. Once you leave the room,
              all messages will be lost.
            </div>
          )}
          <div
            ref={divRef}
            className="h-fit max-h-[24rem] overflow-y-scroll px-2 scroll-mb-0 mx-3 flex flex-col gap-2 py-2"
          >
            {messages.map((message, index) => (
              <div key={index} className={` text-white`}>
                {message && (
                  <>
                    <p className="leading-tight text-sm tracking-wide pl-1">
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {message.trim()}
                      </Markdown>
                    </p>
                    <p className="text-zinc-500 text-xs tracking-wide text-right">
                      {self} • {formattedTime(new Date())}
                    </p>
                    {index !== messages.length - 1 && (
                      <div className="rounded-full border-zinc-800 border  my-2 w-1/6 " />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded overflow-hidden h-8 mx-2 mb-2">
            <Input
              reference={inputRef}
              placeholder="Type a message..."
              type="text"
              onKeyPress={(event: { key: string }) => {
                if (event.key === "Enter") handleSendMessage();
              }}
            />
            <Button
              variant="primary"
              className="text-2xl h-full"
              onClick={handleSendMessage}
            >
              <img src="./send.svg" className="w-5 h-5 invert" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
