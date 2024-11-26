// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import Input from "./ui/Input";
import axios from "axios";
import { BACKEND_HTTP_URL } from "../config";

const UserList = ({
  setRoom,
  setCurrentUser,
}: {
  setRoom: (room: string) => void;
  setCurrentUser: (currentUser: any) => void;
}) => {
  const emojis = [
    "❤️",
    "🚀",
    "😀",
    "🥰",
    "😎",
    "🙂",
    "🫡",
    "🙃",
    "🥸",
    "👻",
    "🤭",
  ];

  const [search, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState<any>(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const allConnections = localStorage.getItem("allConnections");
    console.log(allConnections);

    if (allConnections) setUsers(JSON.parse(allConnections));
  }, []);

  useEffect(() => {
    if (search === "") {
      setSearchedUser(null);
      return;
    }

    if (/^[a-zA-Z]/.test(search)) {
      setSearch(search.charAt(0).toUpperCase() + search.slice(1));
    }

    const clock = setTimeout(async () => {
      try {
        const res = await axios.post(`${BACKEND_HTTP_URL}/api/v1/find_user`, {
          value: search,
        });
        setSearchedUser(res.data);
      } catch {
        setSearchedUser(null);
      }
    }, 1000);

    return () => {
      clearTimeout(clock);
    };
  }, [search]);

  const handleCreateRoom = (user: { username: string; phone: string }) => {
    const self_data = localStorage.getItem("user");
    if (!self_data) {
      return;
    }
    const parsed_data = JSON.parse(self_data);
    const self_phone = parsed_data.phone;
    const roomId =
      Number(self_phone) < Number(user.phone)
        ? self_phone + user.phone
        : user.phone + self_phone;
    setCurrentUser(user);

    // add new connection in list of user connections
    const raw_allConnections = localStorage.getItem("allConnections");
    const all_connections = raw_allConnections
      ? JSON.parse(raw_allConnections)
      : [];

    for (let i = 0; i < all_connections.length; i++) {
      if (all_connections[i].phone === user.phone) {
        setRoom(roomId);
        return;
      }
    }

    all_connections.push(user);
    localStorage.setItem("allConnections", JSON.stringify(all_connections));
    setRoom(roomId);
  };

  return (
    <>
      <div className="mx-2 bg-zinc-800 flex gap-2 items-center rounded ps-2">
        <img src="/search.svg" className="w-4 h-4 opacity-50 select-none" />
        <Input
          onKeyPress={(e) => setSearch(e.currentTarget.value)}
          type="text"
          placeholder="Search by name or number"
          className="rounded"
        />
      </div>
      {searchedUser && (
        <>
          <div className="p-2 grid grid-cols-4 gap-5 select-none">
            <button
              key={searchedUser._id}
              className="flex flex-col items-center cursor-pointer  space-y-2"
              onClick={() =>
                handleCreateRoom({
                  username: searchedUser.username,
                  phone: searchedUser.phone,
                })
              }
            >
              <div
                className={`w-14 h-14 rounded-full bg-zinc-800/80 bg-a flex items-center justify-center text-xl`}
              >
                🤠
              </div>
              <p className="text-xs">{searchedUser.username}</p>
            </button>
          </div>
          <hr className="border-zinc-800 mx-3" />
        </>
      )}

      {users.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center gap-2">
          <div className="relative mx-auto ">
            <div className="absolute border-2 w-2 h-2 animate-ping rounded-full left-[17px]"></div>
            <img
              src="./logo.svg"
              alt="Talkie"
              className="w-16 h-16 opacity-50 mx-auto"
            />
          </div>
          <p className="text-center tracking-wider mx-5 text-zinc-600 vt323-regular">
            Search your friend by their name or phone number.
          </p>
        </div>
      )}

      <div className="p-2 grid grid-cols-4 gap-5 select-none">
        {users.map(
          (
            user: {
              username: string;
              phone: string;
            },
            index
          ) => (
            <button
              key={index}
              className="flex flex-col items-center cursor-pointer  space-y-2"
              onClick={() => handleCreateRoom(user)}
            >
              <div
                className={`w-14 h-14 rounded-full bg-zinc-800/80 bg-a flex items-center justify-center text-xl`}
              >
                {emojis[index % (emojis.length - 1)]}
              </div>
              <p className="text-xs">{user.username}</p>
            </button>
          )
        )}
      </div>
    </>
  );
};

export default UserList;
