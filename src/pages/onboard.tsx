import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import axios from "axios";
import { BACKEND_HTTP_URL } from "../config";

const Onboard = ({
  setUserLoggedIn,
}: {
  setUserLoggedIn: (userLoggedIn: boolean) => void;
}) => {
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputPhoneRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    const phone = inputPhoneRef.current?.value;
    const raw_username = inputNameRef.current?.value;

    if (!raw_username || !phone) {
      alert("Please enter your name and phone number");
      return;
    }

    if (phone.length < 10 || isNaN(Number(phone))) {
      alert("Please enter a valid phone number");
      return;
    }

    if (localStorage.getItem("user")) {
      setUserLoggedIn(true);
      return;
    }

    //create a db entry where username and phone number is stored
    setLoading(true);
    const username =
      raw_username.charAt(0).toUpperCase() +
      raw_username.slice(1).toLowerCase();
    await axios.post(`${BACKEND_HTTP_URL}/api/v1/create_user`, {
      username,
      phone,
    });

    localStorage.setItem("user", JSON.stringify({ username, phone }));
    setLoading(false);
    setUserLoggedIn(true);
  };
  return (
    <div className="max-sm:min-h-screen h-[30rem] w-fit xs:max-w-xs sm:w-[22rem] special-elite-regular">
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
              type="tel"
              reference={inputPhoneRef}
              placeholder="Enter phone number"
              className="rounded tracking-wider text-center"
            />

            <Button
              loading={loading}
              className="rounded tracking-wide w-full"
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
          </div>
        </div>

        <div className=" text-sm mx-5 text-center text-zinc-500 vt323-regular tracking-wider leading-4">
          You can enter a fake phone number. But, People will be able to search
          you by using your phone number. So, keep it original.
        </div>
      </div>
    </div>
  );
};

export default Onboard;
