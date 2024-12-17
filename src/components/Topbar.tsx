import { useRef } from "react";

const Topbar = () => {
  const frequency = useRef();

  const myFrequency = () => {
    const self_data = localStorage.getItem("self");
    if (self_data) {
      const parsed_self_data = JSON.parse(self_data);
      frequency.current = parsed_self_data.frequency;

      return parsed_self_data.frequency;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("self");
    window.location.reload();
    if (frequency.current) localStorage.removeItem(frequency.current);
  };

  return (
    <div className="p-2 rounded bg-zinc-800 tracking-wider h-14 flex items-center justify-between">
      <img
        src="./logo.svg"
        alt="Talkie"
        className="select-none w-10 h-10 opacity-80 hover:animate-pulse p-[2px] cursor-pointer"
      />{" "}
      <h1 className="font-bold tracking-widest select-none">{myFrequency()}</h1>
      <button onClick={handleLogout}>
        <img
          src="./logout.svg"
          className="select-none w-8 h-8 float-end  opacity-50 cursor-pointer hover:scale-105 translate-all ease-in-out duration-200"
        />
      </button>
    </div>
  );
};

export default Topbar;
