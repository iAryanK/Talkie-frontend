const Loader = () => {
  return (
    <main className="bg-black h-fit w-fit text-white">
      <div className="max-sm:min-h-screen h-[30rem] max-sm:w-screen xs:max-w-xs sm:w-[22rem]">
        <div className="h-full bg-zinc-900 flex flex-col justify-center items-center">
          <div className="relative mx-auto">
            <div className="absolute border-2 w-2 h-2 animate-ping rounded-full max-sm:hidden left-[17px]"></div>
            <img
              src="./logo.svg"
              alt="Talkie"
              className="w-16 h-16 max-sm:animate-bounce mx-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loader;
