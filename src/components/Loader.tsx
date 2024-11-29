const Loader = () => {
  return (
    <main className="bg-black h-fit w-fit text-white">
      <div className="h-[30rem] w-[22rem]">
        <div className="h-full bg-zinc-900 flex flex-col justify-center items-center">
          <div className="relative mx-auto">
            <div className="absolute border-2 w-2 h-2 animate-ping rounded-full  left-[17px]"></div>
            <img src="./logo.svg" alt="Talkie" className="w-16 h-16  mx-auto" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loader;
