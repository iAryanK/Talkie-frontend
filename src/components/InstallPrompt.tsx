import { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [prompt, setPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setPrompt(event);

      if (!window.matchMedia("(display-mode:standalone)").matches) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallApp = () => {
    if (prompt) {
      prompt.prompt();
      setPrompt(null);
    }
  };

  return (
    <div
      className={`${showPrompt} ? "block" : "hidden"
      }`}
    >
      <button
        className="p-2 rounded bg-zinc-400 hover:bg-zinc-400/80 flex items-center gap-2"
        onClick={handleInstallApp}
      >
        <span className="text-black pt-1">Install Talkie</span>
        <img src="./install.svg" alt="Install" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default InstallPrompt;
