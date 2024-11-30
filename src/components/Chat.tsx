import { useEffect, useRef } from "react";
import { Button } from "./ui/Button";
import Input from "./ui/Input";
import Topbar from "./Topbar";
import { formattedName } from "../utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MessageType } from "../pages/home";

const Chat = ({
  font,
  setFont,
  messages,
  socket,
}: {
  font: string;
  setFont: (font: string) => void;
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  socket: React.MutableRefObject<WebSocket | null>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const selfname = useRef<string | null>(null);

  useEffect(() => {
    const self_data = localStorage.getItem("self");
    if (self_data) {
      const parsed_self_data = JSON.parse(self_data);
      selfname.current = parsed_self_data.username;
    }

    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputRef.current) {
      if (inputRef.current.value === "") return;
      const message = inputRef.current.value;

      // Send the message to the server
      if (!socket.current) {
        return;
      }

      socket.current.send(
        JSON.stringify({
          type: "chat",
          payload: {
            username: selfname.current,
            message: message,
          },
        })
      );

      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <div className="max-sm:h-screen h-[30rem] max-sm:w-screen xs:max-w-xs sm:w-[22rem] w-[22rem]">
      <div className="bg-zinc-900  flex flex-col justify-between relative h-full">
        <div className="px-2 pt-2 h-[10%] z-50">
          <Topbar />
        </div>

        <button
          className="rounded-full bg-zinc-800 p-4 h-4 w-4 absolute top-20 right-2 flex items-center justify-center select-none"
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

        <div className="max-h-[90%]">
          {messages.length === 0 && (
            <div
              ref={divRef}
              className="overflow-y-scroll px-2 scroll-mb-0 mx-3 flex flex-col gap-2 py-2 items-center justify-center text-zinc-500 text-sm text-center tracking-wide max-h-[90%]"
            >
              Your chat is not stored on the server. Once you leave the room,
              all messages will be lost.
            </div>
          )}

          {messages.length > 0 && (
            <div
              ref={divRef}
              className="overflow-y-scroll px-2 scroll-mb-0 mx-3 flex flex-col gap-2 py-2 max-h-[88%]"
            >
              {messages.map((eachMessage, index) => (
                <div key={index} className={` text-white`}>
                  {eachMessage && (
                    <>
                      <div className="leading-tight text-sm tracking-wide pl-1">
                        <Markdown remarkPlugins={[remarkGfm]}>
                          {eachMessage.message}
                        </Markdown>
                      </div>
                      <p className="text-zinc-500 text-xs tracking-wide text-right">
                        {formattedName(eachMessage.username)} •{" "}
                        {eachMessage.timestamp}
                      </p>
                      {index !== messages.length - 1 && (
                        <div className="rounded-full border-zinc-800 border  my-2 w-1/6 " />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between rounded overflow-hidden mx-2 mb-2 space-x-1 max-sm:h-16 h-10 max-sm:py-2">
            <Input
              reference={inputRef}
              placeholder="Type a message..."
              type="text"
              onKeyPress={(event: { key: string }) => {
                if (event.key === "Enter") handleSendMessage();
              }}
              className="h-full"
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
