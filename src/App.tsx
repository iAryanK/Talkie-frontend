import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Onboard from "./pages/onboard";
import Home from "./pages/home";

function App() {
  const [loading, setLoading] = useState(true);
  const [self, setSelf] = useState<string | null>(null);

  useEffect(() => {
    const self_data = localStorage.getItem("self");
    if (self_data) setSelf(self_data);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [self]);

  if (loading) {
    return <Loader />;
  }

  if (!self) {
    return (
      <main className="bg-black w-fit h-fit text-white">
        <Onboard setSelf={setSelf} />
      </main>
    );
  }

  return <Home />;
}

export default App;
