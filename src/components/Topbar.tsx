const Topbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("self");
    window.location.reload();
  };

  return (
    <div className="p-2 rounded bg-zinc-800 tracking-wider h-12 flex items-center justify-between">
      <img
        src="./logo.svg"
        alt="Talkie"
        className="select-none w-8 h-8 opacity-80 hover:animate-pulse p-[2px] cursor-pointer"
      />{" "}
      <h1 className="font-bold tracking-widest select-none">Talkie</h1>
      <button onClick={handleLogout}>
        <img
          src="./logout.svg"
          className="select-none w-6 h-6 float-end  opacity-50 cursor-pointer hover:scale-105 translate-all ease-in-out duration-200"
        />
      </button>
    </div>
  );
};

export default Topbar;
