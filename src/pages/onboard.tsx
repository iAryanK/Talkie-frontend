import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";

const Onboard = ({ setSelf }: { setSelf: (self: string) => void }) => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputFreqRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    const frequency = inputFreqRef.current?.value;
    const username = inputNameRef.current?.value;

    if (!username || !frequency) {
      alert("Please enter name & set frequency.");
      return;
    }

    if (
      Number(frequency) < 100.0 ||
      Number(frequency) >= 901 ||
      isNaN(Number(frequency))
    ) {
      alert("Please set a frequency in the range of 100.0-900.0 MHz");
      return;
    }

    if (localStorage.getItem("self")) {
      setSelf(localStorage.getItem("self") as string);
      return;
    }

    setLoading(true);

    localStorage.setItem("self", JSON.stringify({ username, frequency }));

    setLoading(false);
    setSelf(JSON.stringify({ username, frequency }));
  };
  return (
    <div className="h-[30rem] w-[22rem] special-elite-regular">
      <div className="h-full bg-zinc-900 rounded flex flex-col justify-between gap-2 py-5">
        <div className="relative mx-auto">
          <div className="absolute border-2 w-2 h-2 animate-ping rounded-full  left-[17px]"></div>
          <img src="./logo.svg" alt="Talkie" className="w-16 h-16  mx-auto" />
        </div>
        <div className="">
          <h1 className="tracking-wider text-center mb-5">
            Set up your <strong className="tracking-widest">Talkie</strong>{" "}
            account
          </h1>
          <div className="max-w-sm mx-5 space-y-3">
            <Input
              type="text"
              reference={inputNameRef}
              placeholder="Enter your name"
              className="rounded tracking-wider text-center"
            />
            <Input
              type="number"
              reference={inputFreqRef}
              placeholder="Set your frequency"
              className="rounded tracking-wider text-center"
            />

            <Button
              loading={loading}
              className="rounded tracking-wide w-full"
              onClick={handleCreateAccount}
            >
              I'm On !
            </Button>
          </div>
        </div>

        <div className=" text-sm mx-5 text-center text-zinc-500 vt323-regular tracking-wider leading-4">
          People in same frequency can talk to each other. Set a frequency in
          the range of 100.0-900.0 MHz.
        </div>
      </div>
    </div>
  );
};

export default Onboard;
