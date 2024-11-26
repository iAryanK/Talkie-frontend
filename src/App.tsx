import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home";
import Onboard from "./pages/onboard";
import Loader from "./components/Loader";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setUserLoggedIn(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [userLoggedIn]);

  if (loading) {
    return <Loader />;
  }

  if (!userLoggedIn) {
    return (
      <main className="bg-black w-fit h-fit text-white">
        <Onboard setUserLoggedIn={setUserLoggedIn} />
      </main>
    );
  }

  return <Home />;
}

export default App;
